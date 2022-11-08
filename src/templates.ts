import { deltaT, withoutHtml } from "./tools";

export function account(_acc: Entity.Account | Entity.Mention) {
    if (_acc.acct) {
        const acc = _acc as Entity.Mention;
        return `${acc.acct} (${acc.url})`;
    }
    const acc = _acc as Entity.Account;
    return `${acc.display_name} (${acc.acct}) ${acc.avatar_static}`;
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

    return `-------
  
  FROM: ${account(acc)} AT ${core.created_at} (${deltaT(core.created_at)})
  ${status.reblog ? `REBLOGGED BY ${account(status.account)} AT ${status.created_at} (${deltaT(status.created_at)})` : ''}
  URL: ${core.url}
  CONTENT:\n${withoutHtml(content).trim()}${mentions2 ? `\nMENTIONS:\n* ${mentions2}` : ''}${media2 ? `\nMEDIA:\n* ${media2}\n` : ''}
  `;
}
