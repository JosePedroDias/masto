import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'url';
import { join } from 'path';

import Fastify from 'fastify';
import fStatic from '@fastify/static';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

import { getHomeTimeline } from './masto';
//import { getHomeTimeline } from './mocked-masto';

import { Persistence } from './persistence';
import { tootHTML } from './templates';
import { findOwnIPs } from './ip';

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
            await server.listen({ port: PORT, host: '0.0.0.0' })

            const address = server.server.address();
            const port = typeof address === 'string' ? address : address?.port

            const ipResults = findOwnIPs();
            for (let ip of Object.values(ipResults)) {
                console.log(`serving on http://${ip}:${port}...`);
            }
        } catch (err) {
            server.log.error(err)
            process.exit(1)
        }
    }
    start();
}
