import test from 'node:test';
import assert from 'node:assert/strict';

import { plural, humanDate, deltaT, removeURLs, anchorURLs, removeHashes, removeUsers, removeEmojis, withoutHtml, isTextInPt } from './tools';

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
    assert.equal(deltaT(ds(3*60*60 + 1*60), langEn, now), '3 hours 1 min');
    assert.equal(deltaT(ds(2*24*60*60 + 1*60), langEn, now), '2 days 1 min');

    assert.equal(deltaT(ds(0), langPt, now), 'agora');
    assert.equal(deltaT(ds(130), langPt, now), '2 mins');
    assert.equal(deltaT(ds(3*60*60 + 1*60), langPt, now), '3 horas 1 min');
    assert.equal(deltaT(ds(2*24*60*60 + 1*60), langPt, now), '2 dias 1 min');
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

test('removeEmojis', { skip: true }, (_t) => {
    // TODO 4312 is being incorrectly removed!
    assert.equal(removeEmojis(`before 😎 stuff aa✅str 43✅12 yeah`), `before  stuff aastr 4312  yeah`);
});

test('withoutHtml', (_t) => {
    assert.equal(withoutHtml(`before<br/>stuff &nbsp; qwe <p>stuff</p> <a href="#">link</a>`),
    `beforestuff   qwe stuff link`);
});

test('isTextInPt', (_t) => {
    assert.equal(isTextInPt(`hello world`), false);
    assert.equal(isTextInPt(`Sim, é!`), true);
});
