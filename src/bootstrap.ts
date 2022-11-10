import { load as loadPersistence, Persistence } from './persistence';
import { load as loadCache } from './cache';

export function bootstrap(main:(per:Persistence)=>void) {
    loadCache()
    .then(loadPersistence)
    .then(main);
}
