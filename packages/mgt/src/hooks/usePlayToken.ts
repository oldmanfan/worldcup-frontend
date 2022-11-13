import { useEffect, useState } from 'react';
import { makeERC20Contract } from './useContract';
import useWallet from './useWallet';
import { PayTokenList } from '@/constant'


export interface PayToken {
  name: string;
  symbol: string;
  // decimals: number;
  address: string;
  chainId: number;
}

export default function usePlayToken() {
  const [payTokens, setPayTokens] = useState<PayToken[]>([]);
  const { chainId, account, provider } = useWallet();

  const loadData = async () => {
    if (chainId && provider) {
      setPayTokens([]);
      const currChainList = PayTokenList[chainId];
      console.log('loadData payTokens=', currChainList);
      const list: PayToken[] = []
      for await (const address of currChainList) {
        const contract = makeERC20Contract(address, provider, account);
        const name = await contract.name();
        const symbol = await contract.symbol();
        // const decimals = await contract.decimals();
        list.push({
          name,
          symbol,
          // decimals
          address,
          chainId
        });
      }
      console.log('loadData payTokens list=', list);
      setPayTokens(list);
    }
  };

  return {
    loadData,
    payTokens,
  };
}
