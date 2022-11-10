import test from 'node:test';
import assert from 'node:assert/strict';

import {
    accountReader, accountTerm, accountHTML,
    tootReader, tootTerm, tootHTML,
    mediaHTML } from './templates';

// 2022-11-09T10:57:14.492Z
const tsRgx = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/g;

// 2022-11-09 10:57
const humanTsRgx = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}/g;

const account:Entity.Account = {
    id: 'id',
    username: 'username',
    display_name: 'display_name',
    acct: 'username@instance.com',
    locked: false,
    created_at: new Date().toISOString(),
    followers_count: 1,
    following_count: 2,
    statuses_count: 3,
    note: 'note',
    url: 'https://instance.com/@username',
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
    url: 'https://instance.com/@username',
    acct: 'username@instance.com'
};

const attachmentImage:Entity.Attachment = {
    id: 'id',
    type: 'image',
    url: 'https://attachment.com/image.jpg',
    remote_url: null,
    preview_url: 'https://attachment.com/preview.jpg',
    text_url: null,
    meta: {
        "original": {
          "width": 579,
          "height": 579,
          "size": "579x579",
          "aspect": 1
        },
        "small": {
          "width": 480,
          "height": 480,
          "size": "480x480",
          "aspect": 1
        }
    },
    description: 'description'
};

const attachmentVideo:Entity.Attachment = {
    id: 'id',
    type: 'unknown',
    url: 'https://attachment.com/video.mp4',
    remote_url: null,
    preview_url: 'https://attachment.com/poster.png',
    text_url: null,
    meta: {
        "original": {
          "width": 1080,
          "height": 1080,
          "frame_rate": "30/1",
          "duration": 14.634,
          "bitrate": 937010
        },
        "small": {
          "width": 400,
          "height": 400,
          "size": "400x400",
          "aspect": 1
        }
      },
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

const attachmentUnknown:Entity.Attachment = {
    id: 'id',
    type: 'image',
    url: 'https://attachment.com/image.tiff',
    remote_url: null,
    preview_url: 'https://attachment.com/preview.tiff',
    text_url: null,
    meta: null,
    description: 'description'
};

const toot1:Entity.Status = {
    id: 'localId',
    uri: 'https://instance.com/users/username/statuses/id',
    url: 'https://instance.com/@username/id',
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
    id: 'localId2',
    uri: 'https://instance.com/users/username/statuses/id2',
    url: 'https://instance.com/@username/id',
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

test('accountTerm', (_t) => {
    assert.equal(accountTerm(account), `display_name (https://mastodon.social/@username@instance.com)`);
    assert.equal(accountTerm(mention), `username@instance.com (https://mastodon.social/@username@instance.com)`);
});

test('accountHTML', (_t) => {
    assert.equal(accountHTML(account), `<a href="https://mastodon.social/@username@instance.com" target="_blank">
<img class="avatar" src="https://avatar.static.com">
display_name (username@instance.com)
</a>`);
    assert.equal(accountHTML(mention), `<a href="https://mastodon.social/@username@instance.com" target="_blank">username@instance.com</a>`);
});

test('tootReader', (_t) => {
    assert.equal(tootReader(toot1), `display_name said now ago:
hello world  hash yay.
description
description
description`);
    assert.equal(tootReader(toot2), `display_name said now ago:
hello world  hash yay.
description
description
description`);
});

test('tootTerm', (_t) => {
    assert.equal(tootTerm(toot1).replace(tsRgx, 'TIMESTAMP'), `-------
https://mastodon.social/@username@instance.com/localId
from: display_name (https://mastodon.social/@username@instance.com) at TIMESTAMP (now)

hello world @guy #hash yay.
mentions:
* username@instance.com (https://mastodon.social/@username@instance.com)
media:
* https://attachment.com/image.jpg
* https://attachment.com/video.mp4
* https://attachment.com/audio.mp3
`);
  assert.equal(tootTerm(toot2).replace(tsRgx, 'TIMESTAMP'), `-------
https://mastodon.social/@username@instance.com/localId
boost by display_name (https://mastodon.social/@username@instance.com) at TIMESTAMP (now)
from: display_name (https://mastodon.social/@username@instance.com) at TIMESTAMP (now)

hello world @guy #hash yay.
mentions:
* username@instance.com (https://mastodon.social/@username@instance.com)
media:
* https://attachment.com/image.jpg
* https://attachment.com/video.mp4
* https://attachment.com/audio.mp3
`);
});

test('tootHTML', (_t) => {
    assert.equal(tootHTML(toot1).replace(humanTsRgx, 'HUMAN_TIMESTAMP'), `<div class="toot visibility-public reply-no poll-no cw-no">
<div class="header">
<a href="https://mastodon.social/@username@instance.com/localId" target="_blank">https://instance.com/@username/id</a><br/>
from: <a href="https://mastodon.social/@username@instance.com" target="_blank">
<img class="avatar" src="https://avatar.static.com">
display_name (username@instance.com)
</a> at HUMAN_TIMESTAMP (now)
</div>

<div class="content">hello world @guy #hash yay.</div>

mentions:
<div class"mentions"><a href="https://mastodon.social/@username@instance.com" target="_blank">username@instance.com</a></div>

media:
<div class="medias"><a href="https://attachment.com/image.jpg" target="_blank"><img class="media-image" alt="description" src="https://attachment.com/preview.jpg"></a>
<video controls poster="https://attachment.com/poster.png" src="https://attachment.com/video.mp4"></video>
<audio controls src="https://attachment.com/audio.mp3"></audio></div>

<div class="read-text" lang="en">display_name said now ago:
hello world  hash yay.
description
description
description</div>
</div>`);
assert.equal(tootHTML(toot2).replace(humanTsRgx, 'HUMAN_TIMESTAMP'), `<div class="toot visibility-public reply-no poll-no cw-no">
<div class="header">
<a href="https://mastodon.social/@username@instance.com/localId" target="_blank">https://instance.com/@username/id</a><br/>
boost by <a href="https://mastodon.social/@username@instance.com" target="_blank">
<img class="avatar" src="https://avatar.static.com">
display_name (username@instance.com)
</a> at HUMAN_TIMESTAMP (now)<br/>
from: <a href="https://mastodon.social/@username@instance.com" target="_blank">
<img class="avatar" src="https://avatar.static.com">
display_name (username@instance.com)
</a> at HUMAN_TIMESTAMP (now)
</div>

<div class="content">hello world @guy #hash yay.</div>

mentions:
<div class"mentions"><a href="https://mastodon.social/@username@instance.com" target="_blank">username@instance.com</a></div>

media:
<div class="medias"><a href="https://attachment.com/image.jpg" target="_blank"><img class="media-image" alt="description" src="https://attachment.com/preview.jpg"></a>
<video controls poster="https://attachment.com/poster.png" src="https://attachment.com/video.mp4"></video>
<audio controls src="https://attachment.com/audio.mp3"></audio></div>

<div class="read-text" lang="en">display_name said now ago:
hello world  hash yay.
description
description
description</div>
</div>`);
});

test('mediaHTML', (_t) => {
    assert.equal(mediaHTML(attachmentImage), `<a href="https://attachment.com/image.jpg" target="_blank"><img class="media-image" alt="description" src="https://attachment.com/preview.jpg"></a>`);
    assert.equal(mediaHTML(attachmentVideo), `<video controls poster="https://attachment.com/poster.png" src="https://attachment.com/video.mp4"></video>`);
    assert.equal(mediaHTML(attachmentAudio), `<audio controls src="https://attachment.com/audio.mp3"></audio>`);
    assert.equal(mediaHTML(attachmentUnknown), `UNSUPPORTED? https://attachment.com/image.tiff`);
});
