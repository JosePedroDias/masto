import { i18n } from './i18n';
import { ptWords } from './ptWords';
import { getBaseUrl } from './config';

export const MIN_SECS = 60;
export const HOUR_SECS = 60 * MIN_SECS;
export const DAY_SECS = 24 * HOUR_SECS;

export function plural(word:string, quantity:number) {
  return `${word}${quantity !== 1 ? 's' : ''}`;
}

const USER_OR_STATUS_RGX = /(https?:\/\/[a-zA-Z0-9-\.]+)\/(@\w+)(.*)/;
export function rewriteUrlFromOurInstance(url:string) :string {
  const ourInstance = getBaseUrl();
  const m = USER_OR_STATUS_RGX.exec(url);
  if (!m) return url;
  const [_, instance, user, suffix] = m;
  if (instance === ourInstance) return url;
  const instanceWithoutProtocol = instance.split('/').pop();
  return `${ourInstance}/${user}@${instanceWithoutProtocol}${suffix}`;
}

export function humanDate(dateS:string) {
  const d = new Date(dateS);
  return d.toISOString().substring(0, 16).replace('T', ' ');
}

export function deltaT(dateS:string, lang:string, now:number=Date.now()) {
  const d = new Date(dateS);
  let dSecs = (now - d.valueOf()) / 1000;
  const days = Math.floor(dSecs / DAY_SECS); dSecs -= days * DAY_SECS;
  const hours = Math.floor(dSecs / HOUR_SECS); dSecs -= hours * HOUR_SECS;
  const mins = Math.floor(dSecs / MIN_SECS); dSecs -= mins * MIN_SECS;
  //return { days, hours, mins };

  const parts = [];
  if (days) { parts.push(days); parts.push(plural( i18n('day', lang), days)); }
  if (hours) { parts.push(hours); parts.push(plural( i18n('hour', lang), hours)); }
  if (mins) { parts.push(mins); parts.push(plural( i18n('min', lang), mins)); }

  return parts.join(' ') || i18n('now', lang);
}

export function removeURLs(s:string) {
  return s.replace(/https?:\/\/\S+/g, '');
}

export function anchorURLs(s:string) {
  return s.replace(/(https?:\/\/\S+)/g, '<a href="$1" target="_blank">$1</a>');
}

export function removeHashes(s:string) {
  return s.replace(/#(\w+)/g, '$1');
}

export function removeUsers(s:string) {
  return s.replace(/@[\n\S]+/g, '');
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes
export function removeEmojis(s:string) {
  return s.replace(/<a?:.+?:\d{18}>|\p{Extended_Pictographic}/gu, ''); // TOO FEW
  //return s.replace(/[\u0000-\u007F]/g, ''); // TOO MANY
  //return s.replace(/(?![áàãâéèêíìóòõôúùçÁÀÃÂÉÈÊÍÌÓÒÕÔÚÙÇ])[\u0000-\u007F]/g, ''); // DOES NOT WORK
  
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