const lookup:{ [key:string] : {[key:string]: string } } = {
    'pt': {
        ago: 'antes',
        boost: 'boost',
        by: 'por',
        content: 'conteúdo',
        'content warning': 'aviso',
        day: 'dia',
        from: 'de',
        hour: 'hora',
        media: 'media',
        mentions: 'menções',
        min: 'min',
        'no results': 'sem resultados',
        now: 'agora',
        said: 'disse',
    },
};

export function i18n(key:string, lang:string):string {
    const bag = lookup[lang] || {};
    const val = bag[key] || key;
    return val;
}
