import useWallet from './useWallet';
import { makeQatarContract } from './useContract';
import useContractAddress from './useContractAddress';
import { useEffect, useState } from 'react';
import { toBN } from '@/utils/bn';
export default function useQatarContract() {
  const { account, provider } = useWallet();
  const { contractAddress } = useContractAddress();
  const [feeRatio, setFeeRatio] = useState(toBN(0));

  useEffect(() => {
    if (account && provider && contractAddress?.qatar) {
      const contract = makeQatarContract(
        contractAddress.qatar,
        provider,
        account,
      );

      contract.feeRatio().then((feeRatio) => {
        setFeeRatio(toBN(feeRatio).div(1e18));
      });
    }
  }, [account, provider, contractAddress]);

  return {
    feeRatio,
  };
}
