import { useEffect, useState } from 'react';
import { makeQatarContract } from './useContract';
import useContractAddress from './useContractAddress';
import { MatchStatus, MatchStatistics, ListItemProps } from './types';
import useWallet from './useWallet';
import { toBN, BigNumberLike } from '@/utils/bn';

export default function useQatar() {
  const { provider, account, chainId } = useWallet();
  const { contractAddress } = useContractAddress();

  const getQatarContract = () => {
    return makeQatarContract(
      contractAddress.qatar,
      provider,
      account,
    );
  }
  const startMatch = async (data: any) => {
    const qatarContract = getQatarContract();
    return qatarContract.startMatch(data);
  }

  const waitForTransaction = async (hash: string, confirmations?: number, timeout?: number) => {
    const waitTx = await provider.waitForTransaction(hash, confirmations || 1, timeout);
    // console.log('waitForTransaction tx=', waitTx);
    return waitTx;
  };

  return {
    getQatarContract,
    startMatch,
    waitForTransaction,
  };
}
