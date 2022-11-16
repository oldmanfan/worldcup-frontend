import moment from 'moment';
import BigNumber from 'bignumber.js';
/**
 * delay
 * @param timeout time
 * @returns Promise callback
 */
export async function delay(timeout: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}

export function getTimestamp() {
  return Date.parse(new Date().toString()) / 1000;
}

export function getToken() {
  const tokenStr = localStorage.getItem('token');
  if (!tokenStr) return '';
  const tokenInfo = JSON.parse(tokenStr);
  return tokenInfo.access_token;
}

export async function toBase64(str: string) {
  const blob = new Blob([str], { type: 'text/plain' });
  const base64: string = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = (e: any) => resolve(e.target.result);
    reader.onerror = (error) => reject(error);
  });
  return base64.replace('data:text/plain;base64,', '');
}

export function formatTime(time: number, formatr = 'MM.DD hh:mm') {
  return moment(time * 1000).format(formatr);
}

interface onlyNumberProp {
  num: number | string;
  decimals?: number;
  max?: number | string;
  isDown?: true;
}

export function onlyNumber({ num, decimals, max, isDown }: onlyNumberProp) {
  let n = String(num);
  const first = n.charAt(0);
  const second = n.charAt(1);

  // 先把非数字的都替换掉，除了数字和.
  n = n.replace(/[^\d\.]/g, '');
  // 必须保证第一个为数字而不是.
  n = n.replace(/^\./g, '');
  // 保证只有出现一个.而没有多个.
  n = n.replace(/\.{2,}/g, '.');
  // 保证.只出现一次，而不能出现两次以上
  n = n.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');

  if (decimals != undefined) {
    // 如果需要处理精度且当前精度大于支持精度则做精度处理
    const arr = n.split('.');
    if (arr[1] && arr[1].length > decimals) {
      n = toFixed(num, decimals, isDown);
    }
  }

  // 过滤数字前面的0 比如004 => 4
  if (first === '0' && second && second !== '.') {
    n = n.substr(1);
  }
  if (max && new BigNumber(max).lt(n)) {
    return String(max);
  }

  return n;
}

export function toFixed(
  n: BigNumber | string | number,
  decimalsToAppear = 2,
  isDown = true,
): string {
  let num = new BigNumber(0);
  n = new BigNumber(n);
  if (new BigNumber(decimalsToAppear).gte(0)) {
    num = new BigNumber(
      n.toFixed(
        decimalsToAppear,
        isDown ? BigNumber.ROUND_DOWN : BigNumber.ROUND_UP,
      ),
    );
  } else {
    const powNum = new BigNumber(1).div(decimalsToAppear);
    const moduleoNum = n.modulo(powNum);
    const minusNum = n.minus(moduleoNum);
    num = isDown ? minusNum : minusNum.plus(powNum);
  }
  return num.toString(10);
}

export function sleep(time = 5000) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export function getErrorMsg(err: any, fallback: string) {
  const msg =
    err?.error?.data?.message ||
    err?.error?.message ||
    err?.reason ||
    err?.message ||
    fallback;
    // ||
    // "request error";
  return msg;
}
