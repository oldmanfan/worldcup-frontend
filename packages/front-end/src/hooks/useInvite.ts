import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { saveBetRecord, getBindCode, setBindCode } from '@/api';
import type { BatRecord } from '@/api';
import useWallet from '@/hooks/useWallet';
import queryString from 'query-string';

const ReferralCodeKey = 'referral_code'

export default function useInvite() {
  const location = useLocation();
  const { account } = useWallet();

  const setReferralCode = (invite: string) => {
    sessionStorage.setItem(ReferralCodeKey, invite);
  }

  const getReferralCode = (): string => {
    return sessionStorage.getItem(ReferralCodeKey) || '';
  }

  /**
   * 获取已经绑定的验证码
   */
  const getBoundCode = async (address: string): Promise<string> => {
    try {
      const code = await getBindCode(address);
      return code;
    } catch (e) {
      console.error('getBoundCode, err=', e);
    }
    return '';
  }

  /**
   * 保存绑定邀请关系
   */
  const setRelationship = async (code: string): Promise<number> => {
    if (!code || !account) {
      return 0;
    }
    try {
      const result = await setBindCode(account, code);
      if (result === 1) {
        setReferralCode(code);
      }
      return result;
    } catch (e) {
      console.error('setRelationship error:', e);
    }
    return 0;
  }

  // useEffect(() => {
  const init = async () => {
    console.log('invite init...account=', account);
    if (account) {
      const code = await getBoundCode(account);
      console.log('===>code=', code);
      if (code) {
        setReferralCode(code);
      } else {
        const { invite } = queryString.parse(location.search);
        if (invite) {
          await setRelationship(invite as string);
        }
      }
    }
  }
    // init();
  // }, []);

  const reportBet = async (record: BatRecord) => {
    const code = getReferralCode();
    if (!code) {
      return;
    }
    record.referralCode = code;
    try {
      await saveBetRecord(record);
    } catch (e) {
      console.error('save bet err:', e);
    }
  }

  return {
    init,
    getReferralCode,
    setRelationship,
    reportBet,
  };
}
