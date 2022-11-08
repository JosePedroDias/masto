import { getHomeTimeline } from './masto';

import { load, save } from './persistence';
import { toot } from './templates';

(async () => {
  const _tmp = await load();
  console.log(_tmp);

  const toots = await getHomeTimeline();

  for (const st of toots) {
    console.log(toot(st));
  }

  console.log(`len: ${toots.length}`);

  const first = toots.shift()?.id;
  const last = toots.pop()?.id || first;

  console.log(`first: ${first} last: ${last}`);

  await save({ first, last });
})();
