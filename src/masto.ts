//import { writeFile } from 'node:fs/promises';
import generator, { Entity, Mastodon } from 'megalodon';

import { getBaseUrl, getAccessToken } from './config';
import { Persistence, save as savePersistence } from './persistence';
import { isInCache, memorize, save as saveCache } from './cache';

// @ts-ignore
const client: Mastodon = generator.default(
    'mastodon',
    getBaseUrl(),
    getAccessToken()
);

//const log = (...args:any) => console.log(...args);
const log = (...args:any) =>{};

export async function getHomeTimeline(per:Persistence): Promise<Entity.Status[]> {
    let tootsBatch:Entity.Status[] = [];

    let stepNo = 0;
    do {
        const _toots = (await client.getHomeTimeline({
            limit: per.limit,
            min_id: per.min_id,
            max_id: per.max_id, // going to the past
            since_id: per.since_id // going to the future
        })).data;
        _toots.reverse(); // get them sorted from older to newer

        const toots = _toots.filter((status:Entity.Status) => {
            // filter out statuses we've already visited (to avoid seeing multiple or any boost repetitions)
            const core = status.reblog || status;
            const wasInCache = isInCache(core.url);
            if (!wasInCache) memorize(core.url);
            else log(`filtering out previously read toot: ${core.url}`);
            return !wasInCache;
        });

        log(`step #${stepNo} -> got ${_toots.length} (filtered ${_toots.length - toots.length})`);
        
        if (_toots.length === 0) {
            log('we are up to date?');
            break;
        }
        
        tootsBatch = tootsBatch.concat(toots);

        log(`batch size: ${tootsBatch.length}, limit: ${per.limit}`);

        if (tootsBatch.length >= per.limit) {
            if (tootsBatch.length > per.limit) {
                // drop additional ones
                tootsBatch.splice(per.limit, 100);
            }
            log('filled it');
            break;
        }

        const lastId = _toots[_toots.length-1]?.id;
        if (lastId) { per.min_id = lastId; per.max_id = undefined; } // READING NEWEST SINCE LAST READ

        ++stepNo;
    } while (true);

    log(`returned ${tootsBatch.length}`);

    //const firstId = tootsBatch[0]?.id;
    const lastId = tootsBatch[tootsBatch.length-1]?.id;
    //if (firstId) { per.max_id = firstId; per.min_id = undefined; } // READING NOW TO PAST WORKS!
    if (lastId) { per.min_id = lastId; per.max_id = undefined; } // READING NEWEST SINCE LAST READ

    await saveCache();
    await savePersistence(per);

    //writeFile('last_statuses.json', JSON.stringify(tootsBatch, null, 2));

    return tootsBatch;
}
