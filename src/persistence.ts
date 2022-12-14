import { readFile, writeFile } from 'node:fs/promises';

const PERSISTENCE = 'persistence.json';

export type Persistence =  {
  limit: number;
  max_id?: string;
  min_id?: string;
  since_id?: string;
}

export async function load():Promise<Persistence> {
  try {
    return ( JSON.parse( (await readFile(PERSISTENCE)).toString()) );
  } catch(_) {
    console.log('no persistence file found. starting from scratch');
    return { limit: 4 };
  }
}

export function save(o:Persistence) {
  writeFile(PERSISTENCE, JSON.stringify(o))
}
