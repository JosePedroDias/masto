import { Entity } from 'megalodon';

import { Persistence } from './persistence';

export async function getHomeTimeline(per: Persistence): Promise<Array<Entity.Status>> {
    const simple = (await import('./test-toots/simple.json', { assert: { type: "json" } })).default;
    const cw = (await import('./test-toots/cw.json', { assert: { type: "json" } })).default;
    const poll = (await import('./test-toots/poll.json', { assert: { type: "json" } })).default;

    return Promise.resolve([
        simple,
        cw,
        poll
    ] as any as Array<Entity.Status>);
}
