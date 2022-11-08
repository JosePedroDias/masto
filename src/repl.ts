import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

import { getHomeTimeline } from './masto';

import { load } from './persistence';
import { tootTerm } from './templates';

export async function main() {
  const rl = createInterface({ input: stdin, output: stdout });

  const per = await load();

  let keepGoing = true;
  while (keepGoing) {
    const answer = await rl.question('> ');
    if (!answer) {
      const toots = await getHomeTimeline(per);
      for (const st of toots) {
        console.log(tootTerm(st));
      }
    } else {
      console.log('leaving');
      keepGoing = false;
    }
  }
  rl.close();
}
