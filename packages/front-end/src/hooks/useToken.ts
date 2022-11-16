import { useEffect, useState } from 'react';
import { makeERC20Contract, ERC20Contract } from './useContract';
import useContractAddress from './useContractAddress';
import useWallet from './useWallet';
import { toBN } from '@/utils/bn';

export default function useToken() {
  const [balance, setBalance] = useState(toBN(0));
  const [allowance, setAllowance] = useState(toBN(0));
  const [contract, setContract] = useState<ERC20Contract | undefined>();
  const { account, provider } = useWallet();
  const { contractAddress } = useContractAddress();

  const loadData = async () => {
    if (account && provider && contractAddress) {
      const contract = makeERC20Contract(contractAddress.tt, provider, account);
      const balance = await contract.balanceOf(account);

      const allowance = await contract.allowance(
        account,
        contractAddress.qatar,
      );
      setAllowance(toBN(allowance));
      setBalance(toBN(balance));
      setContract(contract);
    }
  };

  useEffect(() => {
    if (account && provider) {
      loadData();
    }
  }, [account, provider, contractAddress]);

  return {
    loadData,
    balance,
    allowance,
    contract,
  };
}
