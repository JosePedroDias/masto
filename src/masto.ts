import * as dotenv from 'dotenv';
dotenv.config();

import generator, { Entity, Mastodon } from 'megalodon';

// @ts-ignore
const client: Mastodon = generator.default(
    'mastodon',
    process.env.BASE_URL,
    process.env.ACCESS_TOKEN
);

export function getHomeTimeline(): Promise<Array<Entity.Status>> {
    return client.getHomeTimeline({}) // max_id min_id since_id
        .then(res => res.data);
}
