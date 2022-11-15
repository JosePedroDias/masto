// https://github.com/jshemas/openGraphScraper

import ogs from 'open-graph-scraper';

const USER_AGENT = "Googlebot/2.1 (+http://www.google.com/bot.html)"; 

export function urlMetadata(url:string) {
    return new Promise((resolve, reject) => {
        ogs(
            {
                url,
                headers: { 'user-agent': USER_AGENT }
            },
            (error, results, _response) => {
                if (error) {
                    console.log(`error getting metadata for ${url}`);
                    return resolve(url);
                }
                resolve(results);
            }
        );
    });
}

/*
urlMetadata('https://twitter.com/KittyGiraudel/status/1588181435189690368')
.then(o => console.log('ok', o))
.catch(err => console.error('error', err));
*/
