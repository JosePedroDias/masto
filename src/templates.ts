import { deltaT, humanDate, withoutHtml } from "./tools";

export function account(_acc: Entity.Account | Entity.Mention) {
    if (_acc.acct) {
        const acc = _acc as Entity.Mention;
        return `${acc.acct} (${acc.url})`;
    }
    const acc = _acc as Entity.Account;
    return `${acc.display_name} (${acc.acct}) ${acc.avatar_static}`;
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

export function toot(status: Entity.Status) {
    const core = status.reblog || status;
    const acc = core.account;

    const content = core.content;
    const mentions = core.mentions;
    const media = core.media_attachments;
    //console.log('mentions', mentions);
    //console.log('media', media);

    const mentions2 = mentions.map(ment => account(ment)).join('\n* ');
    const media2 = media.map(m => m.url).join('\n* ');

    return `-------${status.reblog ? `\nBOOST BY ${account(status.account)} AT ${status.created_at} (${deltaT(status.created_at)})` : ''}
  FROM: ${account(acc)} AT ${core.created_at} (${deltaT(core.created_at)})
  URL: ${core.url}
  CONTENT:\n${withoutHtml(content).trim()}${mentions2 ? `\nMENTIONS:\n* ${mentions2}` : ''}${media2 ? `\nMEDIA:\n* ${media2}\n` : ''}
  `;
}

const VIDEO_EXT = ['mp4'];
const AUDIO_EXT = ['mp3'];
const IMAGE_EXT = ['png', 'jpg', 'jpeg'];

function mediaHTML(url: string) {
    const ext = url.split('.').pop() as string;
    if (VIDEO_EXT.includes(ext)) {
        return `<video controls src="${url}"></video>`;
    }
    if (AUDIO_EXT.includes(ext)) {
        return `<audio controls src="${url}"></audio>`;
    }
    if (IMAGE_EXT.includes(ext)) {
        return `<a href="${url}" target="_blank"><img class="media-image" src="${url}"></a>`;
    }
    return `UNSUPPORTED? ${url}`;
}

export function tootHTML(status: Entity.Status) {
    const core = status.reblog || status;
    const acc = core.account;

    const content = core.content;
    const mentions = core.mentions;
    const media = core.media_attachments;
    //console.log('mentions', mentions);
    //console.log('media', media);

    const mentions2 = mentions.map(ment => accountHTML(ment)).join(', ');
    const media2 = media.map(m => mediaHTML(m.url)).join('\n');

    return `<div class="toot">
    ${status.reblog ? `\n boost by ${accountHTML(status.account)} at ${humanDate(status.created_at)} (${deltaT(status.created_at)})` : ''}
    <br/>
    from: ${accountHTML(acc)} at ${humanDate(core.created_at)} (${deltaT(core.created_at)})
    <br/>
    toot URL: <a href="${core.url}" target="_blank">${core.url}</a>
    <br/>
    <br/>
    <div class="content">${withoutHtml(content).trim()}</div>
    <br/>
    ${mentions.length ? `\n mentions:\n <div class"mentions">${mentions2}</div>` : ''}
    <br/>
    ${media.length ? `\n media:\n <div class="medias">${media2}</div>\n` : ''}
</div>`;
}
