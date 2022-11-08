import { readFile, writeFile } from 'node:fs/promises';

const PERSISTENCE = 'persistence.json';

export type Persistence =  {
  first?: string;
  last?: string;
}

export async function load():Promise<Persistence> {
  try {
    return ( JSON.parse( (await readFile(PERSISTENCE)).toString()) );
  } catch(_) {
    return {};
  }
}

export function save(o:Persistence) {
  writeFile(PERSISTENCE, JSON.stringify(o))
}
