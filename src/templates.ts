import { i18n } from './i18n';
import { deltaT, humanDate, isTextInPt, removeEmojis, withoutHtml, rewriteUrlFromOurInstance } from './tools';
import { Chalk } from 'chalk';

const chalk = new Chalk({
    //level: 0 // uncomment to remove terminal colors
});

function toYN(b:boolean) {
    return b ? 'yes' : 'no';
}

export function accountTerm(_acc: Entity.Account | Entity.Mention) {
    if ('avatar_static' in _acc) {
        const acc = _acc as Entity.Account;
        return chalk.yellow(`${acc.display_name} (${chalk.underline(rewriteUrlFromOurInstance(acc.url))})`);
    }
    const acc = _acc as Entity.Mention;
    return chalk.yellow(`${acc.acct} (${chalk.underline(rewriteUrlFromOurInstance(acc.url))})`);
}

export function accountHTML(_acc: Entity.Account | Entity.Mention) {
    if ('avatar_static' in _acc) {
        const acc = _acc as Entity.Account;
        return `<a href="${rewriteUrlFromOurInstance(acc.url)}" target="_blank">
<img class="avatar" src="${acc.avatar_static}">
${acc.display_name} (${acc.acct})
</a>`;
    }
    const acc = _acc as Entity.Mention;
    return `<a href="${rewriteUrlFromOurInstance(acc.url)}" target="_blank">${acc.acct}</a>`;
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

export async function tootLang(status: Entity.Status):Promise<string> {
    const core = status.reblog || status;
    const content = await withoutHtml(core.content, true);
    const taggedLanguage = core.language || 'en';
    const wasDetectedPt = isTextInPt(content);
    return wasDetectedPt ? 'pt' : taggedLanguage;
}

export async function tootTerm(status: Entity.Status):Promise<string> {
    const core = status.reblog || status;
    const acc = core.account;

    const lang = await tootLang(status);
    const i = (k:string) => i18n(k, lang);

    const content = core.content;
    const mentions = core.mentions;
    const media = core.media_attachments;

    const mentions2 = mentions.map(m => accountTerm(m)).join('\n* ');
    const media2 = media.map(m => m.url).join('\n* ');

    let poll;
    if (core.poll) {
        poll = core.poll.options.map(opt => `* ${opt.title}`).join(`\n`);
    }

    const cw = core.sensitive ? (core.spoiler_text || i('content warning')) : '';

    const content2 = (await withoutHtml(content)).trim();

    return `${chalk.rgb(0, 0, 255).bold(`\n==============\n`)}
${chalk.underline(rewriteUrlFromOurInstance(core.url, `/${core.id}`))}${status.reblog ? `\n${i('boost')} ${i('by')} ${accountTerm(status.account)} ${i('at')} ${humanDate(status.created_at)} (${deltaT(status.created_at, lang)})` : ''}
${i('from')}: ${accountTerm(acc)} ${i('at')} ${humanDate(core.created_at)} (${deltaT(core.created_at, lang)})

${cw ? chalk.rgb(255, 0, 0).bold(`** ${cw} **\n`) : ''}${chalk.white(content2)}${poll ? `\n${poll}` : ''}${mentions2 ? `\n${i('mentions')}:\n* ${mentions2}` : ''}${media2 ? `\n${i('media')}:\n* ${media2}\n` : ''}`;
}

export async function tootHTML(status: Entity.Status) {
    const core = status.reblog || status;
    const acc = core.account;
    const content = core.content;
    
    const lang = await tootLang(status);
    const i = (k:string) => i18n(k, lang);
    
    const mentions = core.mentions;
    const media = core.media_attachments;

    const mentions2 = mentions.map(m => accountHTML(m)).join(', ');
    const media2 = media.map(m => mediaHTML(m)).join('\n');

    const cw = core.spoiler_text ? (core.spoiler_text || i('content warning')) : '';

    let poll;
    if (core.poll) {
        const tmp = [`<ul class="poll">`];
        for (const opt of core.poll.options) {
            tmp.push(`<li>${opt.title}</li>`)
        }
        tmp.push(`</ul>`);
        poll = tmp.join('');
    }

    const content2 = (await withoutHtml(content, 'media')).trim();

    return `<div class="toot visibility-${core.visibility} reply-${toYN(!!core.in_reply_to_account_id)} poll-${toYN(!!core.poll)} cw-${toYN(!!cw)}">
<div class="header">
<a href="${rewriteUrlFromOurInstance(core.url, `/${core.id}`)}" target="_blank">${core.url}</a><br/>${status.reblog ? `\n${i('boost')} ${i('by')} ${accountHTML(status.account)} ${i('at')} ${humanDate(status.created_at)} (${deltaT(status.created_at, lang)})<br/>` : ''}
${i('from')}: ${accountHTML(acc)} ${i('at')} ${humanDate(core.created_at)} (${deltaT(core.created_at, lang)})
</div>

${cw ? `<div class="cw">${cw}</div>\n` : ''}<div class="content">${content2}${poll ? `\n${poll}`: ''}</div>
${mentions.length ? `\n<div class="mentions">${i('mentions')}:<br/>\n${mentions2}</div>` : ''}
${media.length ? `\n<div class="media">${i('media')}:<br/>\n${media2}</div>\n` : ''}
<div class="read-text" lang="${lang}">${await tootReader(status)}</div>
</div>`;
}

export async function tootReader(status: Entity.Status) {
    const core = status.reblog || status;
    const acc = core.account;
    const content = core.content;

    const lang = await tootLang(status);
    const i = (k:string) => i18n(k, lang);

    let poll;
    if (core.poll) {
        poll = core.poll.options.map(opt => opt.title).join(' ');
    }

    const cw = core.sensitive ? (core.spoiler_text || i('content warning')) : '';

    let medias = [];
    for (let m of core.media_attachments) {
        const m2 = (await withoutHtml(m.description || "", true)).trim();
        medias.push(m2);
    }
    const mediaS = medias.join('\n');

    const content2 = (await withoutHtml(content, true)).trim();

    return `${accountReader(acc)} ${i('said')} ${deltaT(core.created_at, lang)} ${i('ago')}:
${cw ? `${cw}\n` : ''}${content2}${poll ? `\n${poll}` : ''}${mediaS ? '\n' + mediaS :''}`;
}