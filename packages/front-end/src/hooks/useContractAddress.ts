import { ContractAddress, IContractAddress, defaultChainId } from '@/constant';
import { useEffect, useState } from 'react';
import useWallet from './useWallet';

export default function useContractAddress() {
  const { chainId } = useWallet();
  const [contractAddress, setContractAddress] = useState<
    IContractAddress | undefined
  >();
  useEffect(() => {
    const contractAddress = ContractAddress[Number(chainId)];
    setContractAddress(contractAddress);
  }, [chainId]);

  return { contractAddress };
}
