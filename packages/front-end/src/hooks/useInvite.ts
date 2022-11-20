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
  const setRelationship = async (code: string): Promise<void> => {
    if (!code || !account) {
      return;
    }
    try {
      const result = await setBindCode(account, code);
      if (result === 1) {
        setReferralCode(code);
      }
    } catch (e) {
      console.error('setRelationship error:', e);
    }
  }

  // useEffect(() => {
  const init = async () => {
    const { invite } = queryString.parse(location.search);
    console.log('invite init...account=', account);
    if (!account) {
      // 账户不存在，存在邀请码，则暂时保存，连接钱包后再绑定
      if (invite) {
        setReferralCode(invite as string);
      } else {
        setReferralCode('');
      }
    } else {
      const code = await getBoundCode(account);
      if (code) {
        setReferralCode(code);
      } else {
        // 优先url地址的invite参数，不存在从locale读取
        const inviteCode = invite || getReferralCode();
        if (inviteCode) {
          await setRelationship(invite as string);
          setReferralCode(invite as string);
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
