import { metamask, hooks } from '@/connectors/metamask';
import { useMemo, useEffect } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { SupportNetworks } from '@/constant';
const { useChainId, useAccount, useIsActive, useProvider } = hooks;

export default function useWallet() {
  const chainId = useChainId();
  const account = useAccount();
  const isActive = useIsActive();
  const provider = useProvider();

  // attempt to connect eagerly on mount
  useEffect(() => {
    void metamask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask');
    });
  }, []);
  const isSupportNetwork = SupportNetworks.includes(Number(chainId));

  const connect = () => {
    return metamask.activate();
  };

  const shortAddress = useMemo(() => {
    if (account) {
      return `${account.slice(0, 5)}...${account.slice(-4)}`;
    }
    return '';
  }, [account]);

  return {
    connect,

    account: account || '',
    shortAddress,
    chainId,
    isActive,
    isSupportNetwork,
    provider: provider as Web3Provider,
  };
}
