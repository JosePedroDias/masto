import { main } from './server';
//import { main } from './repl';

import { load as loadPersistence } from './persistence';
import { load as loadCache } from './cache';

loadCache()
.then(loadPersistence)
.then(main);
