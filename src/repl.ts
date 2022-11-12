import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

import { getHomeTimeline } from './masto';
//import { getHomeTimeline } from './mocked-masto';

import { setup, readText } from './tts-repl';
import { tootTerm, tootReader, tootLang } from './templates';
import { Persistence } from './persistence';
import { i18n } from './i18n';

export async function main(per:Persistence) {
  const rl = createInterface({ input: stdin, output: stdout });

  await setup();

  let keepGoing = true;
  while (keepGoing) {
    const answer = await rl.question('> ');
    if (!answer) {
      const toots = await getHomeTimeline(per);

      if (toots.length) {
        for (const st of toots) {
          console.log(tootTerm(st));
          await readText(tootReader(st), tootLang(st));
        }
      } else {
        const text = i18n('no results', 'pt');
        console.log(text);
        await readText(text, 'pt');
      }
      
    } else {
      console.log('leaving');
      keepGoing = false;
    }
  }
  rl.close();
}
