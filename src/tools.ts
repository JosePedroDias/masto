import { i18n } from './i18n';
import { ptWords } from './ptWords';

const MIN = 60;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

export function plural(word:string, quantity:number) {
  return `${word}${quantity !== 1 ? 's' : ''}`;
}

export function humanDate(dateS:string) {
  const d = new Date(dateS);
  return d.toISOString().substring(0, 16).replace('T', ' ');
}

export function deltaT(dateS:string, lang:string, now:number=Date.now()) {
  const d = new Date(dateS);
  let dSecs = (now - d.valueOf()) / 1000;
  const days = Math.floor(dSecs / DAY); dSecs -= days * DAY;
  const hours = Math.floor(dSecs / HOUR); dSecs -= hours * HOUR;
  const mins = Math.floor(dSecs / MIN); dSecs -= mins * MIN;
  //return { days, hours, mins };

  const parts = [];
  if (days) { parts.push(days); parts.push(plural( i18n('day', lang), days)); }
  if (hours) { parts.push(hours); parts.push(plural( i18n('hour', lang), hours)); }
  if (mins) { parts.push(mins); parts.push(plural( i18n('min', lang), mins)); }

  return parts.join(' ') || i18n('now', lang);
}

export function removeURLs(s:string) {
  return s.replace(/https?:\/\/[\n\S]+/g, '');
}

export function anchorURLs(s:string) {
  return s.replace(/(https?:\/\/[\n\S]+)/g, '<a href="$1" target="_blank">$1</a>');
}

export function removeHashes(s:string) {
  return s.replace(/#(\w+)/g, '$1');
}

export function removeUsers(s:string) {
  return s.replace(/@[\n\S]+/g, '');
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes
export function removeEmojis(s:string) {
  return s.replaceAll(/\p{Emoji}/ug, '');
}

export function withoutHtml(s:string, noURLs:boolean|string=false) {
  let s2 = s
  .replace(/<\/p><p>/ig, '\n')
  .replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, '\'')
  .replace( /(<([^>]+)>)/ig, '');

  if (noURLs === 'anchor') {
    s2 = anchorURLs(s2);
  }
  else if (noURLs) {
    s2 = removeURLs(s2);
    s2 = removeHashes(s2);
    s2 = removeUsers(s2);
    s2 = removeEmojis(s2);
  }

  return s2;
}

export function isTextInPt(s:string) {
  s = s.replace(/[,!\?\.:-;\(\)'"]/g, ' ');
  const words = Array.from(new Set(s.toLowerCase().split(/\s+/))).filter((w) => !!w);
  //console.log(words);
  const foundWords = words.filter((w) => ptWords.includes(w));
  let count = foundWords.length;
  //console.log(foundWords);
  //console.log(count);
  return count > 0;
}