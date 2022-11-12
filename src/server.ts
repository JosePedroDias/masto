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
import { i18n } from './i18n';

const PORT = 3000;

export async function main(per:Persistence) {
    const tpl = (await readFile('./templates/index.html')).toString();

    const server = Fastify({});

    console.log(__dirname);

    server.register(fStatic, {
        root: join(__dirname, '..', 'public'),
        prefix: '/public/',
    });

    server.register(fStatic, {
        root: join(__dirname, '..', 'dist-client'),
        prefix: '/js/',
        decorateReply: false
    });

    server.get('/', async (_req, rep) => {
        const toots = await getHomeTimeline(per);

        let htmlItems = [];
        for (const st of toots) {
            htmlItems.push(tootHTML(st));
        }

        const output = htmlItems.length === 0 ? i18n('no results', 'pt') : htmlItems.join('');

        rep.type('text/html');
        rep.send(tpl.replace('_BODY_', output));
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
