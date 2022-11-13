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
    lens: '0xa2335B6e89f12e7Ebf2fAe27e009AF72a71B5048',
    tt: '0x254d2Be5Cd077245E6005Ff54C7f874425d71091',
    qatar: '0xeE2D69e6BDcB446ea9BD61FB8ebE1f7F7b9094e5',
  },
  [ChainIds.HECO_TESTNET]: {
    lens: '0x85cF354E61081617DD8b08B87ec27CAccD1d3ac4',
    tt: '0x6c633473FBFc289Af5B0a67FF8fb8551608967F8',
    qatar: '0xEF83D8bCb40F89B6dbfA9429439D2851f7e0c5B4',
  },
};

/**
 * payToken下拉框设置
 */
export const PayTokenList = {
  [ChainIds.BSC_TESTNET]: [
    '0x254d2Be5Cd077245E6005Ff54C7f874425d71091',
  ],
  [ChainIds.HECO_TESTNET]: [
    '0x6c633473FBFc289Af5B0a67FF8fb8551608967F8',
  ],
}

