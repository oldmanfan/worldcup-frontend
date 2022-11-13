import moment from 'moment';

export function getUtcTime(day: moment.Moment) {
  const str = day.format('YYYY-MM-DD HH:mm:ss').replace(' ', 'T') + 'Z';
  return parseInt ((new Date(str).getTime() / 1000).toString(), 10);
}

export function toUtcTime(time: number) {
  if (!time) {
    return '--';
  }
  return new Date(time * 1000).toISOString().replace('T', ' ').replace('.000Z', '');
}

export function getErrorMsg(err: any) {
  const msg = err?.error?.data?.message || err?.error?.message || err?.reason || err?.message || 'request error';
  return msg;
}
