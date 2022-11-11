import Fastify from 'fastify';
import { readFile } from 'node:fs/promises';
import fStatic from '@fastify/static';

import { fileURLToPath } from 'url';
import { join } from 'path';
const __dirname = fileURLToPath(new URL('.', import.meta.url));

import { getHomeTimeline } from './masto';
//import { getHomeTimeline } from './mocked-masto';

import { Persistence } from './persistence';
import { tootHTML } from './templates';

const PORT = 3000;

export async function main(per:Persistence) {
    const tpl = (await readFile('./templates/index.html')).toString();

    const server = Fastify({});

    console.log(__dirname);

    server.register(fStatic, {
        root: join(__dirname, '..', 'public'),
        prefix: '/public/',
    });

    server.get('/', async (_req, rep) => {
        const toots = await getHomeTimeline(per);

        let html = [];
        for (const st of toots) {
            html.push(tootHTML(st));
        }

        rep.type('text/html');
        rep.send(tpl.replace('_BODY_', html.join('')));
    })

    const start = async () => {
        try {
            await server.listen({ port: PORT })

            const address = server.server.address()
            const port = typeof address === 'string' ? address : address?.port
            console.log(`serving in port http://127.0.0.1:${port}...`);

        } catch (err) {
            server.log.error(err)
            process.exit(1)
        }
    }
    start();
}
