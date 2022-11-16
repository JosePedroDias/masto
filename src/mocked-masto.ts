import { Entity } from 'megalodon';

import { Persistence } from './persistence';

export async function getHomeTimeline(per: Persistence): Promise<Array<Entity.Status>> {
    const simple = (await import('./test-toots/simple.json', { assert: { type: "json" } })).default;
    //const reblog = (await import('./test-toots/reblog.json', { assert: { type: "json" } })).default;
    const cw = (await import('./test-toots/cw.json', { assert: { type: "json" } })).default;
    const poll = (await import('./test-toots/poll.json', { assert: { type: "json" } })).default;
    //const langFr = (await import('./test-toots/lang-fr.json', { assert: { type: "json" } })).default;
    const urlArticle = (await import('./test-toots/url-article.json', { assert: { type: "json" } })).default;
    const urlLetterboxd = (await import('./test-toots/url-letterboxd.json', { assert: { type: "json" } })).default;
    const urlObject = (await import('./test-toots/url-object.json', { assert: { type: "json" } })).default;
    const urlSpotify = (await import('./test-toots/url-spotify.json', { assert: { type: "json" } })).default;
    //const urlTwitter = (await import('./test-toots/url-twitter.json', { assert: { type: "json" } })).default;
    const urlYoutube = (await import('./test-toots/url-youtube.json', { assert: { type: "json" } })).default;


    return Promise.resolve([
        simple,
        cw,
        poll,
        //langFr,
        urlArticle,
        urlLetterboxd,
        urlObject,
        urlSpotify,
        urlYoutube
    ] as any as Array<Entity.Status>);
}
