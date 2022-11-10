import test from 'node:test';
import assert from 'node:assert/strict';

import { plural, humanDate, deltaT, removeURLs, anchorURLs, removeHashes, removeUsers, removeEmojis, withoutHtml, isTextInPt, rewriteUrlFromOurInstance, MIN_SECS, HOUR_SECS, DAY_SECS } from './tools';

test('plural', (_t) => {
    assert.equal(plural('cheese', 0), 'cheeses');
    assert.equal(plural('cheese', 1), 'cheese');
    assert.equal(plural('cheese', 123), 'cheeses');
});

test('humanDate', (_t) => {
    assert.equal(humanDate('2022-01-02T03:04:05.123Z'), '2022-01-02 03:04');
});

test('deltaT', (_t) => {
    const now = Date.now();

    const langEn = 'en';
    const langPt = 'pt';

    const ds = (deltaSecs:number) => new Date( now - deltaSecs*1000 ).toISOString();

    assert.equal(deltaT(ds(0), langEn, now), 'now');
    assert.equal(deltaT(ds(130), langEn, now), '2 mins');
    assert.equal(deltaT(ds(3*HOUR_SECS + 1*MIN_SECS), langEn, now), '3 hours 1 min');
    assert.equal(deltaT(ds(2*DAY_SECS + 5*MIN_SECS), langEn, now), '2 days 5 mins');

    assert.equal(deltaT(ds(0), langPt, now), 'agora');
    assert.equal(deltaT(ds(130), langPt, now), '2 mins');
    assert.equal(deltaT(ds(3*HOUR_SECS + 1*MIN_SECS), langPt, now), '3 horas 1 min');
    assert.equal(deltaT(ds(2*DAY_SECS + 5*MIN_SECS), langPt, now), '2 dias 5 mins');
});

test('removeURLs', (_t) => {
    assert.equal(removeURLs(`before http://asd.com yeah https://things.com/asd?qwe=23&vd=true 123`), `before  yeah  123`);
});

test('anchorURLs', (_t) => {
    assert.equal(
        anchorURLs(`before http://asd.com yeah https://things.com/asd?qwe=23&vd=true 123`),
        `before <a href="http://asd.com" target="_blank">http://asd.com</a> yeah <a href="https://things.com/asd?qwe=23&vd=true" target="_blank">https://things.com/asd?qwe=23&vd=true</a> 123`
    );
});

test('removeHashes', (_t) => {
    assert.equal(removeHashes(`before 234 #asd #whatAbout #44 yeah`), `before 234 asd whatAbout 44 yeah`);
});

test('removeUsers', (_t) => {
    assert.equal(removeUsers(`before @aGuy @anotherGuy @one@two yeah`), `before    yeah`);
});

test('removeEmojis', (_t) => {
    assert.equal(removeEmojis(`before 😎 stuff aa✅str 43✅12 yeah`), `before  stuff aastr 4312 yeah`);
    //assert.equal(removeEmojis(`a🇺🇦1🇺🇦b🇺🇦2`), `a1b2`);
    assert.equal(removeEmojis(`portuguese: áàãâéèêíìóòõôúùçÁÀÃÂÉÈÊÍÌÓÒÕÔÚÙÇ`), `portuguese: áàãâéèêíìóòõôúùçÁÀÃÂÉÈÊÍÌÓÒÕÔÚÙÇ`);
    //assert.equal(removeEmojis(`japanese: 身分 korean: 테스트 chinese: 测试 hindi: परीक् hebrew: מִבְחָן`), `japanese:  korean:  chinese:  hindi:  hebrew: `);
});

test('withoutHtml', (_t) => {
    assert.equal(withoutHtml(`before<br/>stuff &nbsp; qwe <p>stuff</p> <a href="#">link</a>`),
    `beforestuff   qwe stuff link`);
});

test('isTextInPt', (_t) => {
    assert.equal(isTextInPt(`hello world`), false);
    assert.equal(isTextInPt(`Sim, é!`), true);
});


test('rewriteUrlFromOurInstance', (_t) => {
    assert.equal(rewriteUrlFromOurInstance(`https://mastodon.social/@JosePedroDias`), `https://mastodon.social/@JosePedroDias`); // because that's my own instance
    assert.equal(rewriteUrlFromOurInstance(`https://masto.pt/@lucidream`), `https://mastodon.social/@lucidream@masto.pt`);
    assert.equal(rewriteUrlFromOurInstance(`https://masto.pt/@lucidream/109319416809403925`), `https://mastodon.social/@lucidream@masto.pt/109319416809403925`);
    assert.equal(rewriteUrlFromOurInstance(`https://masto.pt/@lucidream/123`, `/456`), `https://mastodon.social/@lucidream@masto.pt/456`);
});
