import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { setRefCode } from '@/api';
import queryString from 'query-string';


export default function useInvite() {
  const location = useLocation();

  const setInviteCode = (invite: string) => {
    sessionStorage.setItem('invite', invite);
  }

  const getInvite = (): string => {
    return sessionStorage.getItem('invite') || '';
  }

  useEffect(() => {
    const { invite } = queryString.parse(location.search);
    if (invite) {
      setInviteCode(invite as string);
    }
  }, []);

  const setRelationship = async (address: string) => {
    const code = getInvite();
    if (!code || !address) {
      return;
    }
    try {
      const result = await setRefCode(code, address);
      if (result === true) {
        setInviteCode('');
      }
    } catch (e) {
      console.error('setRelationship error:', e);
    }
  }

  return {
    setRelationship,
  };
}
