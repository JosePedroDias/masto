import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

import { getHomeTimeline } from './masto';
//import { getHomeTimeline } from './mocked-masto';

import { tootTerm } from './templates';
import { Persistence } from './persistence';
import { i18n } from './i18n';

export async function main(per:Persistence) {
  const rl = createInterface({ input: stdin, output: stdout });

  let keepGoing = true;
  while (keepGoing) {
    const answer = await rl.question('> ');
    if (!answer) {
      const toots = await getHomeTimeline(per);

      if (toots.length) {
        for (const st of toots) {
          console.log(tootTerm(st));
        }
      } else {
        console.log( i18n('no results', 'pt') );
      }
      
    } else {
      console.log('leaving');
      keepGoing = false;
    }
  }
  rl.close();
}
