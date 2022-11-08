const MIN = 60;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

export function plural(word:string, quantity:number) {
  return `${word}${quantity !== 1 ? 's' : ''}`;
}

export function deltaT(dateS:string) {
  const d = new Date(dateS);
  let dSecs = Date.now() - d.valueOf();
  const days = Math.floor(dSecs / DAY); dSecs -= days * DAY;
  const hours = Math.floor(dSecs / HOUR); dSecs -= hours * HOUR;
  const mins = Math.floor(dSecs / MIN); dSecs -= mins * MIN;
  //return { days, hours, mins };

  const parts = [];
  if (days) { parts.push(days); parts.push(plural('day', days)); }
  if (hours) { parts.push(hours); parts.push(plural('hour', hours)); }
  if (mins) { parts.push(mins); parts.push(plural('min', mins)); }

  return parts.join(' ');
}

export function withoutHtml(s:string) {
  return s.replace(/<\/p><p>/ig, '\n')
  .replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, '\'')
  .replace( /(<([^>]+)>)/ig, '');
}
