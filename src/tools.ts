import { i18n } from './i18n';

const MIN = 60;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

export function plural(word:string, quantity:number) {
  return `${word}${quantity !== 1 ? 's' : ''}`;
}

export function humanDate(dateS:string) {
  const d = new Date(dateS);
  return d.toISOString().substring(0, 16);
}

export function deltaT(dateS:string, lang:string) {
  const d = new Date(dateS);
  let dSecs = (Date.now() - d.valueOf()) / 1000;
  const days = Math.floor(dSecs / DAY); dSecs -= days * DAY;
  const hours = Math.floor(dSecs / HOUR); dSecs -= hours * HOUR;
  const mins = Math.floor(dSecs / MIN); dSecs -= mins * MIN;
  //return { days, hours, mins };

  const parts = [];
  if (days) { parts.push(days); parts.push(plural( i18n('day', lang), days)); }
  if (hours) { parts.push(hours); parts.push(plural( i18n('hour', lang), hours)); }
  if (mins) { parts.push(mins); parts.push(plural( i18n('min', lang), mins)); }

  return parts.join(' ') || 'now';
}

export function removeURLs(s:string) {
  return s.replace(/(?:https?):\/\/[\n\S]+/g, '');
}

export function removeHashes(s:string) {
  return s.replace(/#([\n\S]+)/g, '$2');
}

export function removeUsers(s:string) {
  return s.replace(/@[\n\S]+/g, '');
}

export function withoutHtml(s:string, noURLs=false) {
  let s2 = s
  .replace(/<\/p><p>/ig, '\n')
  .replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, '\'')
  .replace( /(<([^>]+)>)/ig, '');

  if (noURLs) {
    s2 = removeURLs(s2);
    s2 = removeHashes(s2);
    s2 = removeUsers(s2);
  }

  return s2;
}

export function isTextInPt(s:string) {
  s = s.replace(/,!\?\.:-;/g, '');
  const words = s.toLowerCase().split(/\s+/);
  console.log(words);
  const found: { [key:string] : boolean } = {};
  for (let w of words) {
    found[w] = true;
  }
  let count = 0;

  found['à'] && ++count;
  found['aqui'] && ++count;
  found['boa'] && ++count;
  found['bom'] && ++count;
  found['com'] && ++count;
  found['como'] && ++count;
  found['da'] && ++count;
  found['das'] && ++count;
  found['de'] && ++count;
  found['do'] && ++count;
  found['dos'] && ++count;
  found['e'] && ++count;
  found['é'] && ++count;
  found['és'] && ++count;
  found['eu'] && ++count;
  found['há'] && ++count;
  found['houve'] && ++count;
  found['hoje'] && ++count;
  found['lá'] && ++count;
  found['muito'] && ++count;
  found['não'] && ++count;
  found['na'] && ++count;
  found['no'] && ++count;
  found['o'] && ++count;
  found['os'] && ++count;
  found['ou'] && ++count;
  found['pela'] && ++count;
  found['pelas'] && ++count;
  found['por'] && ++count;
  found['porquê'] && ++count;
  found['que'] && ++count;
  found['quê'] && ++count;
  found['são'] && ++count;
  found['se'] && ++count;
  found['sei'] && ++count;
  found['sem'] && ++count;
  found['sim'] && ++count;
  found['só'] && ++count;
  found['também'] && ++count;
  found['tem'] && ++count;
  found['tenho'] && ++count;
  found['tens'] && ++count;
  found['tu'] && ++count;
  found['um'] && ++count;
  found['uma'] && ++count;
  found['vi'] && ++count;
  found['vou'] && ++count;

  console.log(count);

  return count >= 2;
}