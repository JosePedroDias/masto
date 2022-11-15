import test from 'node:test';
import assert from 'node:assert/strict';

import { urlMetadata } from './url-metadata';

const skip = true;

test('twitter', { skip }, async (_t) => {
    const res = await urlMetadata('https://twitter.com/KittyGiraudel/status/1588181435189690368');
    assert.deepEqual(res, {
        ogSiteName: 'Twitter',
        ogLocale: 'en',
        ogUrl: 'https://twitter.com/kittygiraudel/status/1588181435189690368',
        favicon: '//abs.twimg.com/favicons/twitter.2.ico',
        charset: 'utf8',
        requestUrl: 'https://twitter.com/KittyGiraudel/status/1588181435189690368',
        success: true
    });
});

test('youtube', { skip }, async (_t) => {
    const res:any = await urlMetadata('https://www.youtube.com/watch?v=jmJBrO87QUM');
    assert.deepEqual(res, {
        ogSiteName: 'YouTube',
        ogUrl: 'https://www.youtube.com/watch?v=jmJBrO87QUM',
        ogTitle: 'Games That Push the Limits of The Nintendo 64',
        ogDescription: '#pushingthelimits Keep exploring at https://brilliant.org/Sharopolis Get started for free, and hurry—the first 200 people get 20% off an annual premium subsc...',
        alIosAppStoreId: '544007664',
        alIosAppName: 'YouTube',
        alIosUrl: 'vnd.youtube://www.youtube.com/watch?v=jmJBrO87QUM&feature=applinks',
        alAndroidUrl: 'vnd.youtube://www.youtube.com/watch?v=jmJBrO87QUM&feature=applinks',
        alWebUrl: 'http://www.youtube.com/watch?v=jmJBrO87QUM&feature=applinks',
        ogType: 'video.other',
        alAndroidAppName: 'YouTube',
        alAndroidPackage: 'com.google.android.youtube',
        twitterCard: 'player',
        twitterSite: '@youtube',
        twitterUrl: 'https://www.youtube.com/watch?v=jmJBrO87QUM',
        twitterTitle: 'Games That Push the Limits of The Nintendo 64',
        twitterDescription: '#pushingthelimits Keep exploring at https://brilliant.org/Sharopolis Get started for free, and hurry—the first 200 people get 20% off an annual premium subsc...',
        twitterAppNameiPhone: 'YouTube',
        twitterAppIdiPhone: '544007664',
        twitterAppNameiPad: 'YouTube',
        twitterAppIdiPad: '544007664',
        twitterAppUrliPhone: 'vnd.youtube://www.youtube.com/watch?v=jmJBrO87QUM&feature=applinks',
        twitterAppUrliPad: 'vnd.youtube://www.youtube.com/watch?v=jmJBrO87QUM&feature=applinks',
        twitterAppNameGooglePlay: 'YouTube',
        twitterAppIdGooglePlay: 'com.google.android.youtube',
        twitterAppUrlGooglePlay: 'https://www.youtube.com/watch?v=jmJBrO87QUM',
        ogImage: {
            url: 'https://i.ytimg.com/vi/jmJBrO87QUM/maxresdefault.jpg',
            width: '1280',
            height: '720',
            type: 'jpg'
        },
        ogVideo: {
            url: 'https://www.youtube.com/embed/jmJBrO87QUM',
            width: '1280',
            height: '720',
            type: 'text/html'
        },
        twitterImage: {
            url: 'https://i.ytimg.com/vi/jmJBrO87QUM/maxresdefault.jpg',
            width: null,
            height: null,
            alt: null
        },
        twitterPlayer: {
            url: 'https://www.youtube.com/embed/jmJBrO87QUM',
            width: '1280',
            height: '720',
            stream: null
        },
        ogLocale: 'pt-PT',
        ogDate: '2022-10-15',
        favicon: 'https://www.youtube.com/s/desktop/7edc9c99/img/favicon.ico',
        charset: 'utf8',
        requestUrl: 'https://www.youtube.com/watch?v=jmJBrO87QUM',
        success: true
    });
});

test('vimeo', { skip }, async (_t) => {
    const res:any = await urlMetadata('https://vimeo.com/740859845');
    assert.deepEqual(res, {
        ogSiteName: 'Vimeo',
        ogUrl: 'https://vimeo.com/740859845',
        ogType: 'video.other',
        ogTitle: 'freeways2 2022-08-18 19.51',
        ogDescription: 'Lots of work to draft the level structure for level i/o and refactoring of the car class which was a hot mess. Finally I was able to wire the cars navigation to…',
        alIosAppName: 'Vimeo',
        alIosAppStoreId: '425194759',
        alIosUrl: 'vimeo://app.vimeo.com/videos/740859845',
        alAndroidAppName: 'Vimeo',
        alAndroidPackage: 'com.vimeo.android.videoapp',
        alAndroidUrl: 'vimeo://app.vimeo.com/videos/740859845',
        alWebShouldFallback: 'true',
        twitterCard: 'player',
        twitterSite: '@vimeo',
        twitterTitle: 'freeways2 2022-08-18 19.51',
        twitterDescription: 'Lots of work to draft the level structure for level i/o and refactoring of the car class which was a hot mess. Finally I was able to wire the cars navigation to…',
        twitterAppNameiPhone: 'Vimeo',
        twitterAppIdiPhone: '425194759',
        twitterAppUrliPhone: 'vimeo://app.vimeo.com/videos/740859845',
        twitterAppNameiPad: 'Vimeo',
        twitterAppIdiPad: '425194759',
        twitterAppUrliPad: 'vimeo://app.vimeo.com/videos/740859845',
        twitterAppNameGooglePlay: 'Vimeo',
        twitterAppIdGooglePlay: 'com.vimeo.android.videoapp',
        twitterAppUrlGooglePlay: 'vimeo://app.vimeo.com/videos/740859845',
        ogImage: {
            url: 'https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F1490711206-5bb728408185319fbc1261fcac3497d0f31e74ac66d3bf84408f661320812d04-d_1280x757&src1=https%3A%2F%2Ff.vimeocdn.com%2Fimages_v6%2Fshare%2Fplay_icon_overlay.png',
            width: '1280',
            height: '757',
            type: 'image/jpg'
        },
        ogVideo: {
            url: 'https://player.vimeo.com/video/740859845?autoplay=1&h=4d5fbe61e5',
            width: '1280',
            height: '757',
            type: 'text/html'
        },
        twitterImage: {
            url: 'https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F1490711206-5bb728408185319fbc1261fcac3497d0f31e74ac66d3bf84408f661320812d04-d_1280x757&src1=https%3A%2F%2Ff.vimeocdn.com%2Fimages_v6%2Fshare%2Fplay_icon_overlay.png',
            width: null,
            height: null,
            alt: null
        },
        twitterPlayer: {
            url: 'https://player.vimeo.com/video/740859845?h=4d5fbe61e5',
            width: '1280',
            height: '757',
            stream: null
        },
        ogLocale: 'en',
        favicon: 'https://f.vimeocdn.com/images_v6/favicon.ico?e0fa602f98b2dbc3dec66ad203c394f63fb44557',
        charset: 'utf8',
        requestUrl: 'https://vimeo.com/740859845',
        success: true
    });
});

test('spotify', { skip }, async (_t) => {
    const res:any = await urlMetadata('https://open.spotify.com/track/78daXDfx7T89qorS0ktsU0');
    assert.deepEqual(res, {
        ogSiteName: 'Spotify',
        ogTitle: 'Everyone’s Got Something',
        ogDescription: 'Perrin Lamb · Song · 2012',
        ogUrl: 'https://open.spotify.com/track/6fRziw5GRjH4QiSdJIWpQU',
        ogType: 'music.song',
        ogAudio: 'https://p.scdn.co/mp3-preview/00aa7e047926da13b69ea153a2b83bf3dbd05c81?cid=162b7dc01f3a4a2ca32ed3cec83d1e02&utm_medium=facebook',
        ogAudioType: 'audio/vnd.facebook.bridge',
        musicMusician: ['https://open.spotify.com/artist/7CfcrGoabPfkAToFD8oBF3'],
        musicDuration: '223',
        musicAlbum: ['https://open.spotify.com/album/6lGXUNcAoHF8eSNC17GPqy'],
        musicAlbumTrack: '4',
        musicReleaseDate: '2012-02-14',
        alAndroidAppName: 'Spotify',
        alAndroidPackage: 'com.spotify.music',
        alAndroidUrl: 'spotify://track/6fRziw5GRjH4QiSdJIWpQU',
        alIosAppName: 'Spotify',
        alIosAppStoreId: '324684580',
        alIosUrl: 'spotify://track/6fRziw5GRjH4QiSdJIWpQU',
        twitterSite: '@spotify',
        twitterTitle: 'Everyone’s Got Something',
        twitterDescription: 'Perrin Lamb · Song · 2012',
        twitterCard: 'summary',
        ogImage: {
            url: 'https://i.scdn.co/image/ab67616d0000b2739f19cdb07e588cc2c836ca29',
            width: null,
            height: null,
            type: null
        },
        twitterImage: {
            url: 'https://i.scdn.co/image/ab67616d0000b2739f19cdb07e588cc2c836ca29',
            width: null,
            height: null,
            alt: null
        },
        ogLocale: 'en',
        favicon: 'https://open.spotifycdn.com/cdn/images/favicon32.8e66b099.png',
        charset: 'utf8',
        requestUrl: 'https://open.spotify.com/track/78daXDfx7T89qorS0ktsU0',
        success: true
    });
});

test('publico', { skip }, async (_t) => {
    const res:any = await urlMetadata('https://www.publico.pt/2022/11/15/economia/noticia/pais-perder-populacao-desafio-atrair-trabalhadores-2027745?ref=hp&cx=manchete_2_destaques_0');
    assert.deepEqual(res, {
        ogType: 'article',
        ogTitle: 'Num país a perder população, o desafio é atrair trabalhadores',
        twitterTitle: 'Num país a perder população, o desafio é atrair trabalhadores',
        ogUrl: 'https://www.publico.pt/2022/11/15/economia/noticia/pais-perder-populacao-desafio-atrair-trabalhadores-2027745',
        ogSiteName: 'PÚBLICO',
        ogDescription: 'Portugal terá de conseguir atrair e reter trabalhadores para sustentar o seu mercado de trabalho e o sistema de protecção social.',
        twitterCard: 'summary_large_image',
        twitterSite: '@publico',
        twitterSiteId: '2561091',
        twitterUrl: 'https://www.publico.pt',
        twitterDescription: 'Portugal terá de conseguir atrair e reter trabalhadores para sustentar o seu mercado de trabalho e o sistema de protecção social.',
        author: 'Raquel Martins',
        ogImage: {
            url: 'https://imagens.publico.pt/imagens.aspx/1751196?tp=UH&db=IMAGENS&type=JPG&share=1&o=BarraFacebook_Publico.png',
            width: null,
            height: null,
            type: 'png'
        },
        twitterImage: {
            url: 'https://imagens.publico.pt/imagens.aspx/1751196?tp=UH&db=IMAGENS&type=JPG&share=1&o=BarraFacebook_Publico.png',
            width: null,
            height: null,
            alt: null
        },
        ogLocale: 'pt',
        ogDate: 'Tue, 15 Nov 2022 07:00:00 GMT',
        favicon: 'https://static.publico.pt/files/site/assets/img/ico/favicon.ico',
        charset: 'utf8',
        requestUrl: 'https://www.publico.pt/2022/11/15/economia/noticia/pais-perder-populacao-desafio-atrair-trabalhadores-2027745?ref=hp&cx=manchete_2_destaques_0',
        success: true
    });
});

test('guardian', { skip }, async (_t) => {
    const res:any = await urlMetadata('https://www.theguardian.com/world/2022/nov/15/g20-russia-ukraine-war-global-economic-suffering');
    delete res.ogDate;
    assert.deepEqual(res, {
        ogUrl: 'https://www.theguardian.com/world/2022/nov/15/g20-russia-ukraine-war-global-economic-suffering',
        articleAuthor: 'https://www.theguardian.com/profile/patrickwintour',
        alIosUrl: 'gnmguardian://world/2022/nov/15/g20-russia-ukraine-war-global-economic-suffering?contenttype=Article&source=applinks',
        articlePublisher: 'https://www.facebook.com/theguardian',
        ogTitle: 'Russia strives to avoid G20 isolation as China and India distance themselves',
        articleModifiedTime: '2022-11-15T09:32:51.000Z',
        ogDescription: 'Traditional allies China and India begin to distance themselves from Ukraine war',
        ogType: 'article',
        alIosAppStoreId: '409128287',
        articleSection: 'World news',
        articlePublishedTime: '2022-11-15T08:26:50.000Z',
        articleTag: 'G20,Russia,Ukraine,Europe,World news,Vladimir Putin,Volodymyr Zelenskiy,Indonesia',
        alIosAppName: 'The Guardian',
        ogSiteName: 'the Guardian',
        twitterAppIdiPhone: '409128287',
        twitterAppNameGooglePlay: 'The Guardian',
        twitterAppNameiPad: 'The Guardian',
        twitterCard: 'summary_large_image',
        twitterAppNameiPhone: 'The Guardian',
        twitterAppIdiPad: '409128287',
        twitterAppIdGooglePlay: 'com.guardian',
        twitterAppUrlGooglePlay: 'guardian://www.theguardian.com/world/2022/nov/15/g20-russia-ukraine-war-global-economic-suffering',
        twitterAppUrliPhone: 'gnmguardian://world/2022/nov/15/g20-russia-ukraine-war-global-economic-suffering?contenttype=Article&source=twitter',
        twitterSite: '@guardian',
        twitterAppUrliPad: 'gnmguardian://world/2022/nov/15/g20-russia-ukraine-war-global-economic-suffering?contenttype=Article&source=twitter',
        ogImage: {
            url: 'https://i.guim.co.uk/img/media/4ab45905689097b14969daa816ed5a0ec87c9b96/0_133_4000_2400/master/4000.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=7fe1ea3c9a009b4404099c59126aec35',
            width: '1200',
            height: '720',
            type: 'jpg'
        },
        twitterImage: {
            url: 'https://i.guim.co.uk/img/media/4ab45905689097b14969daa816ed5a0ec87c9b96/0_133_4000_2400/master/4000.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&s=f066954406a78e1582b0d4e4b3030b96',
            width: null,
            height: null,
            alt: null
        },
        ogLocale: 'en',
        //ogDate: '2022-11-15T12:36:13.000Z',
        favicon: 'https://static.guim.co.uk/images/favicon-32x32.ico',
        charset: 'utf8',
        requestUrl: 'https://www.theguardian.com/world/2022/nov/15/g20-russia-ukraine-war-global-economic-suffering',
        success: true
    });
});
