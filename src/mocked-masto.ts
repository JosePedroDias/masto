import { Entity } from 'megalodon';

import { Persistence } from './persistence';

export function getHomeTimeline(per: Persistence): Promise<Array<Entity.Status>> {
    return Promise.resolve([
        // #0 REGULAR
        {
            "id": "109319524204782441",
            "uri": "https://masto.pt/users/smsantos/statuses/109319524117908219",
            "url": "https://masto.pt/@smsantos/109319524117908219",
            "account": {
              "id": "109269215760736262",
              "username": "smsantos",
              "acct": "smsantos@masto.pt",
              "display_name": "Sandra",
              "locked": false,
              "bot": false,
              "discoverable": false,
              "group": false,
              "created_at": "2022-11-01T00:00:00.000Z",
              "note": "<p>Pró caralho agora também no masto (bio com aprovação da Isa_ssdd@masto.pt)</p>",
              "url": "https://masto.pt/@smsantos",
              "avatar": "https://files.mastodon.social/cache/accounts/avatars/109/269/215/760/736/262/original/68130cc0023cbd1e.jpeg",
              "avatar_static": "https://files.mastodon.social/cache/accounts/avatars/109/269/215/760/736/262/original/68130cc0023cbd1e.jpeg",
              "header": "https://files.mastodon.social/cache/accounts/headers/109/269/215/760/736/262/original/7f8104f0ce72b379.jpeg",
              "header_static": "https://files.mastodon.social/cache/accounts/headers/109/269/215/760/736/262/original/7f8104f0ce72b379.jpeg",
              "followers_count": 183,
              "following_count": 112,
              "statuses_count": 896,
              "last_status_at": "2022-11-10",
              "emojis": [],
              "fields": []
            },
            "in_reply_to_id": "109319522332109236",
            "in_reply_to_account_id": "109251486243128243",
            "reblog": null,
            "content": "<p><span class=\"h-card\"><a href=\"https://masto.pt/@OnceUponAGoblin\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>OnceUponAGoblin</span></a></span> <span class=\"h-card\"><a href=\"https://mas.to/@cheiraesturro\" class=\"u-url mention\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">@<span>cheiraesturro</span></a></span> estava com saudades nossas</p>",
            "plain_content": null,
            "created_at": "2022-11-10T12:32:38.000Z",
            "emojis": [],
            "replies_count": 0,
            "reblogs_count": 0,
            "favourites_count": 0,
            "reblogged": false,
            "favourited": false,
            "muted": false,
            "sensitive": false,
            "spoiler_text": "",
            "visibility": "public",
            "media_attachments": [],
            "mentions": [
              {
                "id": "109251486243128243",
                "username": "OnceUponAGoblin",
                "url": "https://masto.pt/@OnceUponAGoblin",
                "acct": "OnceUponAGoblin@masto.pt"
              },
              {
                "id": "109315774379548034",
                "username": "cheiraesturro",
                "url": "https://mas.to/@cheiraesturro",
                "acct": "cheiraesturro@mas.to"
              }
            ],
            "tags": [],
            "card": null,
            "poll": null,
            "application": null,
            "language": "pt",
            "emoji_reactions": [],
            "bookmarked": false,
            "quote": false
          },
        // POLL
        {
            "id": "109315556310564600",
            "uri": "https://masto.pt/users/tarantelma/statuses/109315524710965554",
            "url": "https://masto.pt/@tarantelma/109315524710965554",
            "account": {
                "id": "109274668188666170",
                "username": "tarantelma",
                "acct": "tarantelma@masto.pt",
                "display_name": "Telma Tavares",
                "locked": false,
                "bot": false,
                "discoverable": true,
                "group": false,
                "created_at": "2022-11-02T00:00:00.000Z",
                "note": "<p>Designer 24/7.<br>\"Génia das t-shirts\" <a href=\"https://masto.pt/tags/pordosol\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>pordosol</span></a><br>Avatar do Ben Wiseman, banner do Six Feet Under. <br>She/Her.</p>",
                "url": "https://masto.pt/@tarantelma",
                "avatar": "https://files.mastodon.social/cache/accounts/avatars/109/274/668/188/666/170/original/8948b8580b8ba695.gif",
                "avatar_static": "https://files.mastodon.social/cache/accounts/avatars/109/274/668/188/666/170/static/8948b8580b8ba695.png",
                "header": "https://files.mastodon.social/cache/accounts/headers/109/274/668/188/666/170/original/ac1f43f6a4526a77.jpeg",
                "header_static": "https://files.mastodon.social/cache/accounts/headers/109/274/668/188/666/170/original/ac1f43f6a4526a77.jpeg",
                "followers_count": 417,
                "following_count": 387,
                "statuses_count": 222,
                "last_status_at": "2022-11-09",
                "emojis": [],
                "fields": [
                    {
                        "name": "Site",
                        "value": "eatyourcake.pt",
                        "verified_at": null
                    },
                    {
                        "name": "Loja",
                        "value": "foreversandevers.pt",
                        "verified_at": null
                    }
                ]
            },
            "in_reply_to_id": null,
            "in_reply_to_account_id": null,
            "reblog": null,
            "content": "<p>Qual o hashtag para o gang dos filmes? Tivemos várias sugestões, votem na que preferem:</p>",
            "plain_content": null,
            "created_at": "2022-11-09T19:35:32.000Z",
            "emojis": [],
            "replies_count": 1,
            "reblogs_count": 3,
            "favourites_count": 0,
            "reblogged": false,
            "favourited": false,
            "muted": false,
            "sensitive": false,
            "spoiler_text": "",
            "visibility": "public",
            "media_attachments": [],
            "mentions": [],
            "tags": [],
            "card": null,
            "poll": {
                "id": "287977",
                "expires_at": "2022-11-10T19:35:32.000Z",
                "expired": false,
                "multiple": false,
                "votes_count": 34,
                "voters_count": 34,
                "voted": false,
                "own_votes": [],
                "options": [
                    {
                        "title": "#ParaisoFilmes",
                        "votes_count": 14
                    },
                    {
                        "title": "#mastolumiere",
                        "votes_count": 10
                    },
                    {
                        "title": "#TheMastoPictureShow",
                        "votes_count": 6
                    },
                    {
                        "title": "#lumiere",
                        "votes_count": 4
                    }
                ],
                "emojis": []
            },
            "application": null,
            "language": "pt",
            "emoji_reactions": [],
            "bookmarked": false,
            "quote": false
        }
    ] as any as Array<Entity.Status>);
}
