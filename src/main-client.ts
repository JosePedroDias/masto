const progressEl = document.querySelector('.progress');
const progressBarEl = document.querySelector('.progress-bar');

import { setup, readText } from './tts-browser';

function readAll() {
    const toots = Array.from(document.body.querySelectorAll('.toot'));

    let controller = new AbortController();

    document.addEventListener('keyup', (ev) => {
        if (ev.code !== 'KeyN') return;
        ev.preventDefault();
        ev.stopPropagation();
        controller.abort();
    });

    const chunks:[string, string, number][] = Array.from(document.body.querySelectorAll('.read-text'))
    .map((el, idx) => [el.innerHTML, el.getAttribute('lang')||'', idx]);

    function highlight(index:number) {
        toots.forEach((toot, i) => toot.classList.toggle('reading', i === index));
        toots[index].scrollIntoView();
    }

    function onProgress(r:number) {
        const el = progressBarEl as Element;
        // @ts-ignore
        el.style.height = `${(100*r).toFixed(1)}%`;
    }

    function read(text:string, lang:string="en", idx:number) {
        highlight(idx);
        progressEl?.classList.remove('hidden');
        controller = new AbortController();
        
        return readText(text, lang, { signal: controller.signal, onProgress })
        .then(() => {
            progressEl?.classList.add('hidden');
        });
    }

    chunks.reduce(
        (p, [text, lang, idx]) => p.then(() => read(text, lang, idx)),
        Promise.resolve()
    );
}

if (progressBarEl && progressEl) {
    // @ts-ignore
    if (window.chrome || window.safari) { // TODO safari still not working
        const onHumanEvent = () => {
            setup().then(readAll);
        }
        document.body.addEventListener('mousedown', onHumanEvent, { once: true });
        document.body.addEventListener('touchstart', onHumanEvent, { once: true });
    }
    else {
        readAll();
    }
}
