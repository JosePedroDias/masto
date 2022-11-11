import { networkInterfaces } from 'node:os';

export function findOwnIPs() {
    const nets = networkInterfaces();
    const results: { [key:string] : string } = {};

    for (const [name, items] of Object.entries(nets)) {
        if (items) {
            for (let it of items) {
                if (it.family === 'IPv4' && !it.internal) {
                    results[name] = it.address;
                }
            }
        }
    }

    return results;
}
