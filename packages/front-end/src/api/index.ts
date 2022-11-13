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

