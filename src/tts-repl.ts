import say from 'say';

// @ts-ignore
const Say = say.Say;

const hardcoded = [
    {name: 'Alex', lang: 'en_US'},
    {name: 'Joana', lang: 'pt_PT'}
];

export function setup() {
    // TODO hardcoded for now
    // could come from say -v '?'
    return Promise.resolve(hardcoded);
}

export function readText(text:string, lang:string='en', options:{ signal?:AbortSignal, onProgress?: (r:number)=>void } = {}):Promise<void> {
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

/* {
    if (false) {
        readText('welcome back', 'en')
        .then(() => readText('seja bem vindo', 'pt'));
    }
    else {
        const controller = new AbortController();
        const longText = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
        readText(longText, 'en', controller.signal);

        setTimeout(()=> {
            console.log('abort after 1s');
            controller.abort();
        }, 1000);
    }
} */