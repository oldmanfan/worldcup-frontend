import { toBase64 } from '@/utils';
import queryString from 'query-string';
import md5 from 'crypto-js/md5';
import { MyCodeApi, GetPriceApi, GetBindInfoApi, SetBindInfoApi, ReportBetApi } from '@/constant';

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
  // console.log('base64', code, base64, token);
  return {
    time,
    token,
  };
}

export async function getInviteCode(address: string): Promise<string> {
  const authParams = await getAuthParams();
  const query = queryString.stringify({
    ...authParams,
    address,
  });
  const url = `${MyCodeApi}?${query}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  });
  if (res && res.status === 200) {
    const data = (await res.json()) || {};
    if (data.error === 0) {
      return data.myCode;
    }
  }
  return '';
}

export async function getPrice(): Promise<number> {
  const authParams = await getAuthParams();
  const query = queryString.stringify({
    ...authParams,
  });
  // const url = `/api/get_price?${query}`;
  const url = `${GetPriceApi}?${query}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  });
  if (res && res.status === 200) {
    const data = (await res.json()) || {};
    if (data.error === 0) {
      return data.price;
    }
  }
  return 0;
}

export async function getBindCode(address: string): Promise<string> {
  const authParams = await getAuthParams();
  const query = queryString.stringify({
    ...authParams,
    address,
  });
  const url = `${GetBindInfoApi}?${query}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  });
  if (res && res.status === 200) {
    const data = (await res.json()) || {};
    if (data.status === 1) {
      return data.code;
    }
  }
  return '';
}

export async function setBindCode(address: string, code: string): Promise<number> {
  const authParams = await getAuthParams();
  const params = {
    ...authParams,
    address,
    code,
  };
  const url = `${SetBindInfoApi}`;
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  });
  if (res && res.status === 200) {
    const data = (await res.json()) || {};
    return data?.status;
  }
  return 0;
}


export interface BatRecord {
  chainId: number,
  wallet: string;
  matchId: string;
  guessType: string;
  payToken: string;
  betAmount: string;
  betTime: string;
  referralCode: string;
  txHash: string;
}

export async function saveBetRecord(batRecord: BatRecord): Promise<boolean> {
  // const url = `/api/bk/bet`;
  const url = ReportBetApi;
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(batRecord),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  });
  if (res && res.status === 200) {
    const data = (await res.json()) || {};
    return data.code === 200;
  }
  return false;
}
