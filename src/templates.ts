import { i18n } from "./i18n";
import { deltaT, humanDate, isTextInPt, removeEmojis, withoutHtml } from "./tools";

export function accountTerm(_acc: Entity.Account | Entity.Mention) {
    if ('avatar_static' in _acc) {
        const acc = _acc as Entity.Account;
        return `${acc.display_name} (${acc.acct}) ${acc.avatar_static}`;
    }
    const acc = _acc as Entity.Mention;
    return `${acc.acct} (${acc.url})`;
}

export function accountHTML(_acc: Entity.Account | Entity.Mention) {
    if ('avatar_static' in _acc) {
        const acc = _acc as Entity.Account;
        return `<a href="${acc.url}" target="_blank">
<img class="avatar" src="${acc.avatar_static}">
${acc.display_name} (${acc.acct})
</a>`;
    }
    const acc = _acc as Entity.Mention;
    return `<a href="${acc.url}" target="_blank">${acc.acct}</a>`;
}

export function accountReader(_acc: Entity.Account | Entity.Mention) {
    if ('avatar_static' in _acc) {
        return removeEmojis(_acc.display_name);
    }
    return _acc.username;
}

const VIDEO_EXT = ['mp4'];
const AUDIO_EXT = ['mp3'];
const IMAGE_EXT = ['png', 'jpg', 'jpeg'];

export function mediaHTML(m:Entity.Attachment) {
    const url = m.url;
    const ext = url.split('.').pop() as string;
    if (VIDEO_EXT.includes(ext)) {
        return `<video controls poster="${m.preview_url}" src="${url}"></video>`;
    }
    if (AUDIO_EXT.includes(ext)) {
        return `<audio controls src="${url}"></audio>`;
    }
    if (IMAGE_EXT.includes(ext)) {
        return `<a href="${url}" target="_blank"><img class="media-image" alt="${m.description}" src="${m.preview_url || url}"></a>`;
    }
    return `UNSUPPORTED? ${url}`;
}

export function tootTerm(status: Entity.Status) {
    const core = status.reblog || status;
    const acc = core.account;
    const lang = core.language || status.language || '';
    const i = (k:string) => i18n(k, lang);

    const content = core.content;
    const mentions = core.mentions;
    const media = core.media_attachments;

    const mentions2 = mentions.map(ment => accountTerm(ment)).join('\n* ');
    const media2 = media.map(m => m.url).join('\n* ');

    return `-------${status.reblog ? `\n${i('boost')} ${i('by')} ${accountTerm(status.account)} ${i('at')} ${status.created_at} (${deltaT(status.created_at, lang)})` : ''}
${i('from')}: ${accountTerm(acc)} ${i('at')} ${core.created_at} (${deltaT(core.created_at, lang)})
${i('URL')}: ${core.url}
${i('content')}:\n${withoutHtml(content).trim()}${mentions2 ? `\n${i('mentions')}:\n* ${mentions2}` : ''}${media2 ? `\n${i('media')}:\n* ${media2}\n` : ''}`;
}

export function tootHTML(status: Entity.Status) {
    const core = status.reblog || status;
    const acc = core.account;
    const content = core.content;
    
    const lang = isTextInPt(withoutHtml(content, true)) ? 'pt' : 'en';
    //const lang = core.language || status.language || '';

    const i = (k:string) => i18n(k, lang);
    
    const mentions = core.mentions;
    const media = core.media_attachments;

    const mentions2 = mentions.map(m => accountHTML(m)).join(', ');
    const media2 = media.map(m => mediaHTML(m)).join('\n');

    return `<div class="toot">
${status.reblog ? `${i('boost')} ${i('by')} ${accountHTML(status.account)} ${i('at')} ${humanDate(status.created_at)} (${deltaT(status.created_at, lang)})` : ''}<br/>
${i('from')}: ${accountHTML(acc)} ${i('at')} ${humanDate(core.created_at)} (${deltaT(core.created_at, lang)})<br/>
${i('URL')}: <a href="${core.url}" target="_blank">${core.url}</a><br/><br/>
<div class="content">${withoutHtml(content, 'anchor').trim()}</div><br/>
${mentions.length ? `\n${i('mentions')}:\n<div class"mentions">${mentions2}</div>` : ''}<br/>
${media.length ? `\n${i('media')}:\n<div class="medias">${media2}</div>\n` : ''}
<div class="read-text" lang="${lang}">${tootReader(status)}</div>
</div>`;
}

export function tootReader(status: Entity.Status) {
    const core = status.reblog || status;
    const acc = core.account;
    const content = core.content;

    const lang = isTextInPt(withoutHtml(content, true)) ? 'pt' : 'en';
    //const lang = core.language || status.language || '';

    const i = (k:string) => i18n(k, lang);

    const media = core.media_attachments;
    const mediaS = media.map(m => withoutHtml(m.description || "", true).trim()).join('\n');

    return `${accountReader(acc)} ${i('said')} ${deltaT(core.created_at, lang)} ${i('ago')}:
${withoutHtml(content, true).trim()}${mediaS ? '\n' + mediaS :''}`;
}