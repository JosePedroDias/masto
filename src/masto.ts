import * as dotenv from 'dotenv';
dotenv.config();

import generator, { Entity, Mastodon } from 'megalodon';
import { Persistence, save } from './persistence';

// @ts-ignore
const client: Mastodon = generator.default(
    'mastodon',
    process.env.BASE_URL,
    process.env.ACCESS_TOKEN
);

export async function getHomeTimeline(per:Persistence): Promise<Array<Entity.Status>> {
    const toots = (await client.getHomeTimeline({
        limit: per.limit,
        min_id: per.min_id,
        max_id: per.max_id, // going to the past
        since_id: per.since_id // going to the future
    })).data; // max_id min_id since_id

    const _toots = [...toots];

    console.log('#', _toots.length, per);

    const _first = _toots.shift()?.id;
    const _last = _toots.pop()?.id || _first;

    //if (_first) { per.max_id = _first; per.min_id = undefined; } // READING NOW TO PAST WORKS!
    if (_first) { per.min_id = _first; per.max_id = undefined; } // READING NEWEST SINCE LAST READ
    // min_id max_id=109308584187095749
    await save(per);

    return toots;
}
