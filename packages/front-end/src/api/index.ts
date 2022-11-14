import { toBase64 } from '@/utils';
import queryString from 'query-string';
import md5 from 'crypto-js/md5';

export interface AuthParams {
  time: number;
  token: string;
}
async function getAuthParams(): Promise<AuthParams> {
  const time = parseInt((Date.now() / 1000).toFixed(0));
  const code = `time=${time}&key=[WorldCupApi_2022.11.08]`;
  // const base64 = btoa(code)
  const base64 = await toBase64(code);
  const token = md5(base64).toString().toUpperCase();
  console.log('base64', code, base64, token);
  return {
    time,
    token,
  };
}

export async function getInviteCode(address: string): Promise<string> {
  const authParams = await getAuthParams();
  const query = queryString.stringify({
    ...authParams, address,
  })
  const url = `/api/get_mycode?${query}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  });
  if (res && res.status === 200) {
    const data = await res.json() || {};
    if (data.error === 0) {
      return data.myCode;
    }
  }
  return '';
}

export async function getPrice(): Promise<number> {
  const authParams = await getAuthParams();
  const query = queryString.stringify({
    ...authParams
  })
  const url = `/api/get_price?${query}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  });
  if (res && res.status === 200) {
    const data = await res.json() || {};
    if (data.error === 0) {
      return data.price;
    }
  }
  return 0;
}

export async function setRefCode(inviteCode: string, address: string): Promise<boolean> {
  const body = {
    referralCode: inviteCode,
    wallet: address,
  }
  const url = `/api/bk/refcode`;
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  });
  if (res && res.status === 200) {
    const data = await res.json() || {};
    return data.code === 200;
  }
  return false;
}


