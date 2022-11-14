import { toBN } from '@/utils/bn';
export * from './Scores';
export * from './Countries';

export const ChainIds = {
  BSC_MAINNET: 56,
  BSC_TESTNET: 97,
  HECO_MAINNET: 128,
  HECO_TESTNET: 256,
};
export const SupportNetworks = [56, 97, 128, 256];
// 默认chainId
export const defaultChainId = 97;

export interface IContractAddress {
  lens: string;
  tt: string;
  qatar: string;
}
export const ContractAddress: { [chainId: number]: IContractAddress } = {
  [ChainIds.BSC_TESTNET]: {
    tt: '0x254d2Be5Cd077245E6005Ff54C7f874425d71091',
    qatar: '0xeE2D69e6BDcB446ea9BD61FB8ebE1f7F7b9094e5',
    lens: '0x0f8b73c5d9618042C2D0B931E4dE1d1F325E1c42',
  },
  [ChainIds.HECO_TESTNET]: {
    tt: '0x6c633473FBFc289Af5B0a67FF8fb8551608967F8',
    qatar: '0xEF83D8bCb40F89B6dbfA9429439D2851f7e0c5B4',
    lens: '0xb46E6b32E1F7087cB78e974A59daAfd3dC8c2afC',
  },

  [ChainIds.BSC_MAINNET]: {
    lens: '',
    tt: '',
    qatar: '',
  },
  [ChainIds.HECO_MAINNET]: {
    lens: '',
    tt: '',
    qatar: '',
  },
};

export const APPROVE_MAX =
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
