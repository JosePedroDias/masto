import say from 'say';

// @ts-ignore
const Say = say.Say;

const hardcoded = [
    {name: 'Alex', lang: 'en_US'},
    {name: 'Joana', lang: 'pt_PT'}
];

export function setup() {
    // TODO hardcoded for now could come from `say -v '?'`
    return Promise.resolve(hardcoded);
}

export function readText(text:string, lang:string='en', options:{ signal?:AbortSignal, onProgress?: (r:number)=>void } = {}):Promise<void> {
    lang = lang.replace('_', '-');
    return new Promise((resolve, reject) => {
        const s = new Say();
        const voice = hardcoded.filter(v => v.lang.indexOf(lang) === 0)[0];

        function onErr(err:string) {
            if (err) return reject(err);
            resolve();
        }

        if (options.signal) {
            options.signal.addEventListener('abort', () => {
                s.stop();
                resolve();
            }, { once: true });
        }

        s.speak(text, voice.name, undefined, onErr);
    });
}
