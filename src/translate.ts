
// https://libretranslate.com/

export function translate(content:string, sourceLang:string, targetLang:string = 'en') {
    return fetch('https://libretranslate.com/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            q: content,
            source: sourceLang,
            target: targetLang,
            format: 'text',
            api_key: ''
        })
    })
    .then((res) => res.json())
    .then((body) => body.translatedText);
}
