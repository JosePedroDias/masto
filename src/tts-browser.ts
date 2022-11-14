const sSynth = window.speechSynthesis;

let allVoices:SpeechSynthesisVoice[] = [];

export function setup():Promise<SpeechSynthesisVoice[]> {
    return new Promise((resolve) => {
        allVoices = Array.from(sSynth.getVoices());
        if (allVoices.length) return resolve(allVoices);

        sSynth.addEventListener('voiceschanged', () => {
            allVoices = Array.from(sSynth.getVoices());
            resolve(allVoices);
        });
    });
}

// Reed Rocko Shelley Sandy Samantha * Ralph Samantha
function voiceHeuristic(lang:string) {
    if (lang === 'en') return (v:SpeechSynthesisVoice) => v.name === 'Samantha' ? 1 : 100;
    if (lang === 'pt') return (v:SpeechSynthesisVoice) => v.name === 'Joana' ? 1 : 100;
    return () => 100;
}

function sortVoices(voices:SpeechSynthesisVoice[], lang:string) {
    const h = voiceHeuristic(lang);
    return voices.sort((_a, _b) => h(_a) - h(_b));
}

export function readText(text:string, lang:string='en', options:{ signal?:AbortSignal, onProgress?: (r:number)=>void } = {}):Promise<void> {
    return new Promise((resolve, reject) => {
        const utter = new SpeechSynthesisUtterance(text);

        let voices = allVoices
        .filter((v) => v.lang && v.lang.indexOf(lang) === 0);

        sortVoices(voices, lang);
        //console.log('voices', JSON.stringify(voices.map(v => [v.lang, v.name]), null, 2));

        if (voices.length === 0) {
            console.log(`could not find a voice for ${lang}. using es...`);
            voices = allVoices.filter((v) => v.lang.indexOf('es') === 0);
        }

        const voice = voices[0];
        utter.lang = voice.lang;
        utter.voice = voice;
        utter.rate = lang === 'en' ? 0.85 : 0.95;
        //utter.volume = 1;
        //utter.pitch = 1;

        if (options.onProgress && typeof options.onProgress === 'function') {
            const onProgress = options.onProgress;
            utter.addEventListener('boundary', (ev) => onProgress( ev.charIndex / text.length) );
        }

        if (options.signal) {
            options.signal.addEventListener('abort', () => {
                if (window.speechSynthesis.pending || window.speechSynthesis.speaking) {
                    window.speechSynthesis.cancel();
                }
                resolve();
            }, { once: true });
        }
        
        utter.addEventListener('end', () => resolve());
        utter.addEventListener('error', (ev) => {
            if (ev && ev.error && ev.error.toString() === 'canceled') return;
            reject(ev.error);
        });
        
        sSynth.speak(utter);
        console.warn(`(using ${utter.lang} in TTS to read ${lang})\n`, text);
    });
}
