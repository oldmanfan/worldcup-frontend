import { Web3ReactProvider, Web3ReactHooks } from '@web3-react/core';
import { metamask, hooks as metamaskHooks } from '@/connectors/metamask';
import { MetaMask } from '@web3-react/metamask';
const connectors: [MetaMask, Web3ReactHooks][] = [[metamask, metamaskHooks]];
export default function WalletProvider({ children }) {
  return (
    <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>
  );
}
