import { readFile, writeFile } from 'node:fs/promises';

import { DAY_SECS } from './tools';

const CACHE = 'cache.json';
const CACHE_TTL_SECS = 3 * DAY_SECS;

type HashOfNumbers = { [k: string]: number };


// make toot/status url to read timestamp
const cache:Map<string,number> = new Map();

function getNowSecs() {
    return Math.floor(Date.now() / 1000);
}

export function memorize(statusUrl:string) {
    cache.set(statusUrl, getNowSecs());
}

export function isInCache(statusUrl:string):boolean {
    return cache.has(statusUrl);
}

export async function load() {
  try {
    const now = getNowSecs();
    const o:HashOfNumbers = JSON.parse( (await readFile(CACHE)).toString() );
    for (let [k, v] of Object.entries(o)) {
        if (now - v > CACHE_TTL_SECS) {
            console.log(`toot URL ${k} cache expired. removing it from cache.`);
        } else {
            cache.set(k, v);
        }
    }
    console.log(`loaded ${cache.size} toot URLs from cache.`);
  } catch(_) {
    console.log('Problem loading the cache! Starting anew');
  }
}

export function save() {
    const o:HashOfNumbers = {};
    for (let [k, v] of cache.entries()) {
        o[k] = v;
    }
    writeFile(CACHE, JSON.stringify(o));
}
