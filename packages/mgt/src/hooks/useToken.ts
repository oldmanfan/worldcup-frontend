import { useEffect, useState } from 'react';
import { makeERC20Contract } from './useContract';
import useContractAddress from './useContractAddress';
import useWallet from './useWallet';
import { toBN } from '@/utils/bn';

export default function useToken() {
  const [balance, setBalance] = useState(toBN(0));
  const { account, provider } = useWallet();
  const { contractAddress } = useContractAddress();

  const loadData = async () => {
    if (account && provider) {
      const contract = makeERC20Contract(contractAddress.tt, provider, account);
      const balance = await contract.balanceOf(account);

      setBalance(toBN(balance));
    }
  };

  useEffect(() => {}, [account, provider, contractAddress]);

  return {
    loadData,
    balance,
  };
}
