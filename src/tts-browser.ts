//import { sleep } from './tools'; // so we don't get nodejs stuff such as process.env
function sleep(ms:number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  

let allVoices = [];

const sSynth = window.speechSynthesis;

export function setup() {
    return Promise.race([
        () => {
            return new Promise((resolve, reject) => {
                sSynth.addEventListener('voiceschanged', (ev) => {
                    allVoices = sSynth.getVoices();
                    resolve(allVoices);
                });
                sSynth.getVoices();
            });
        },
        sleep(1000)
    ]);
}

export function readText(text:string, lang:string='en', options:{ signal?:AbortSignal, onProgress?: (r:number)=>void } = {}):Promise<void> {
    return new Promise((resolve, reject) => {
        const utter = new SpeechSynthesisUtterance(text);

        const allVoices = sSynth.getVoices();
        let voices = allVoices.filter((v) => v.lang.indexOf(lang) === 0);

        if (voices.length === 0) {
            console.log(`could not find a voice for ${lang}. using es...`);
            voices = allVoices.filter((v) => v.lang.indexOf('es') === 0);
        }

        const voice = voices[0];
        utter.lang = voice.lang;

        if (options.onProgress && typeof options.onProgress == 'function') {
            // @ts-ignore
            utter.addEventListener('boundary', (ev) => options.onProgress( ev.charIndex / text.length) );
        }

        if (options.signal) {
            options.signal.addEventListener('abort', () => {
                if (window.speechSynthesis.pending || window.speechSynthesis.speaking) {
                    console.warn('cancelled');
                    window.speechSynthesis.cancel();
                }

                resolve();
            }, { once: true });
        }

        const onDone = () => {
            resolve();
        }
        
        utter.addEventListener('start', () => {
            //neverRead = false;
        });
        utter.addEventListener('end', onDone);
        utter.addEventListener('error', (err) => {
            console.error(err); // for debugging
            reject(err); // ?
        });
        
        sSynth.speak(utter);
        console.warn(`(using ${utter.lang} in TTS to read ${lang})\n`, text);
    });
}


/*

            function readText(text, lang) {
                return new Promise((resolve) => {
                    stopSpeaking();

                    progressEl.classList.remove('hidden');

                    function onDone() {
                        progressEl.classList.add('hidden');
                        utter.removeEventListener('end', onDone);
                        document.removeEventListener('keyup', onKeyUp);
                        stopSpeaking();
                        resolve();
                    }

                    function onKeyUp(ev) {
                        if (ev.code !== 'KeyN') return;
                        ev.preventDefault();
                        ev.stopPropagation();
                        onDone();
                    };

                    document.addEventListener('keyup', onKeyUp);

                    const utter = new SpeechSynthesisUtterance(text);

                    const allVoices = sSynth.getVoices();
                    //console.warn('allVoices', allVoices);
                    let voices = allVoices.filter((v) => v.lang.indexOf(lang) === 0);
                    //console.warn('# voices', voices.length);

                    if (voices.length === 0) {
                        console.log(`could not find a voice for ${lang}. using es...`);
                        voices = allVoices.filter((v) => v.lang.indexOf('es') === 0);
                    }

                    const voice = voices[0];
                    utter.lang = voice.lang;
                    
                    utter.addEventListener('boundary', (ev) => {
                        const r = (100 * ev.charIndex / text.length).toFixed(1);
                        progressBarEl.style.height = `${r}%`;
                    });
                    utter.addEventListener('start', () => {
                        neverRead = false;
                    });
                    utter.addEventListener('end', onDone);
                    utter.addEventListener('error', (err) => console.error(err)); // for debugging
                    
                    sSynth.speak(utter);
                    console.warn(`(using ${utter.lang} in TTS to read ${lang})\n`, text);
                });
            }

*/


/*
sSynth.addEventListener('voiceschanged', (ev) => {
                console.log('voiceschanged');
                function onHumanEvent() {
                    if (neverRead) readAll();
                }
                document.body.addEventListener('mousedown', onHumanEvent, { once: true });
                document.body.addEventListener('touchstart', onHumanEvent, { once: true });
            });

            {
                const tmpVoices = sSynth.getVoices();
                if (tmpVoices.length > 0) readAll();
            }
*/