import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { setRefCode, saveBetRecord } from '@/api';
import type { BatRecord } from '@/api';
import queryString from 'query-string';

const ReferralCodeKey = 'referral_code'

export default function useInvite() {
  const location = useLocation();

  const setReferralCode = (invite: string) => {
    sessionStorage.setItem(ReferralCodeKey, invite);
  }

  const getReferralCode = (): string => {
    return sessionStorage.getItem(ReferralCodeKey) || '';
  }

  useEffect(() => {
    const { invite } = queryString.parse(location.search);
    if (invite) {
      setReferralCode(invite as string);
    }
  }, []);

  // const setRelationship = async (address: string) => {
  //   const code = getReferralCode();
  //   if (!code || !address) {
  //     return;
  //   }
  //   try {
  //     const result = await setRefCode(code, address);
  //     if (result === true) {
  //       setReferralCode('');
  //     }
  //   } catch (e) {
  //     console.error('setRelationship error:', e);
  //   }
  // }

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
    reportBet,
    // setRelationship,
  };
}
