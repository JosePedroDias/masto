import test from 'node:test';
import assert from 'node:assert/strict';

import { accountReader, tootReader, mediaHTML } from './templates';

const account:Entity.Account = {
    id: 'id',
    username: 'username',
    display_name: 'display_name',
    acct: 'acct',
    locked: false,
    created_at: new Date().toISOString(),
    followers_count: 1,
    following_count: 2,
    statuses_count: 3,
    note: 'note',
    url: 'https://url.com',
    avatar: 'https://avatar.com',
    avatar_static: 'https://avatar.static.com',
    header: 'https://header.com',
    header_static: 'https://header.static.com',
    emojis: [],
    moved: null,
    fields: null,
    bot: null
};

const mention:Entity.Mention = {
    id: 'id',
    username: 'username',
    url: 'https://url.com',
    acct: 'acct'
};

const attachmentImage:Entity.Attachment = {
    id: 'id',
    type: 'unknown',
    url: 'https://attachment.com/image.jpg',
    remote_url: null,
    preview_url: '',
    text_url: null,
    meta: null,
    description: 'description'
};

const attachmentVideo:Entity.Attachment = {
    id: 'id',
    type: 'unknown',
    url: 'https://attachment.com/video.mp4',
    remote_url: null,
    preview_url: '',
    text_url: null,
    meta: null,
    description: 'description'
};

const attachmentAudio:Entity.Attachment = {
    id: 'id',
    type: 'unknown',
    url: 'https://attachment.com/audio.mp3',
    remote_url: null,
    preview_url: '',
    text_url: null,
    meta: null,
    description: 'description'
};

const toot1:Entity.Status = {
    id: 'id',
    uri: 'https://uri.com',
    url: 'https://url.com',
    account: account,
    in_reply_to_id: null,
    in_reply_to_account_id: null,
    reblog: null,
    content: `<b>hello world</b> @guy #hash yay.`,
    plain_content: null,
    created_at: new Date().toISOString(),
    emojis: [],
    replies_count: 1,
    reblogs_count: 2,
    favourites_count: 3,
    reblogged: null,
    favourited: null,
    muted: null,
    sensitive: false,
    spoiler_text: '',
    visibility: 'public',
    media_attachments: [
        attachmentImage,
        attachmentVideo,
        attachmentAudio
    ],
    mentions: [
        mention
    ],
    tags: [],
    card: null,
    poll: null,
    application: null,
    language: null,
    pinned: null,
    emoji_reactions: [],
    quote: false,
    bookmarked: false
};

const toot2:Entity.Status = {
    id: 'id',
    uri: 'https://uri.com',
    url: 'https://url.com',
    account: account,
    in_reply_to_id: null,
    in_reply_to_account_id: null,
    reblog: toot1,
    content: '',
    plain_content: null,
    created_at: new Date().toISOString(),
    emojis: [],
    replies_count: 1,
    reblogs_count: 2,
    favourites_count: 3,
    reblogged: null,
    favourited: null,
    muted: null,
    sensitive: false,
    spoiler_text: '',
    visibility: 'public',
    media_attachments: [
    ],
    mentions: [
    ],
    tags: [],
    card: null,
    poll: null,
    application: null,
    language: null,
    pinned: null,
    emoji_reactions: [],
    quote: false,
    bookmarked: false
};

test('accountReader', (_t) => {
    assert.equal(accountReader(account), `display_name`);
    assert.equal(accountReader(mention), `username`);
});

test('tootReader', (_t) => {
    assert.equal(tootReader(toot1), `display_name said now ago:\nhello world  hash yay.\n  `);
    assert.equal(tootReader(toot2), `display_name said now ago:\nhello world  hash yay.\n  `);
});

test('mediaHTML', (_t) => {
    assert.equal(mediaHTML(attachmentImage.url), `<a href="https://attachment.com/image.jpg" target="_blank"><img class="media-image" src="https://attachment.com/image.jpg"></a>`);
    assert.equal(mediaHTML(attachmentVideo.url), `<video controls src="https://attachment.com/video.mp4"></video>`);
    assert.equal(mediaHTML(attachmentAudio.url), `<audio controls src="https://attachment.com/audio.mp3"></audio>`);
    assert.equal(mediaHTML('unknown.tiff'), `UNSUPPORTED? unknown.tiff`);
});
