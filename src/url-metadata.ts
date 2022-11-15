// https://github.com/jshemas/openGraphScraper

import ogs from 'open-graph-scraper';

export function urlMetadata(url:string) {
    return new Promise((resolve, reject) => {
        ogs({ url }, (error, results, _response) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}

/*
urlMetadata('https://www.theguardian.com/world/2022/nov/15/g20-russia-ukraine-war-global-economic-suffering')
.then(o => console.log('ok', o))
.catch(err => console.error('error', err));
*/