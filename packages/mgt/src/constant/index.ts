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
    tt: "0x0bDBF5aB4E87C417292eA70947bE29CFD3018d7F",
    qatar: "0x4e5ECDC99Dae2F29C13482F2467a4b2557B2a32C",
    lens: "0x4C9f0825CAD89aEf3427e89af2f3B5e810a93563"
},
  [ChainIds.HECO_TESTNET]: {
    tt: '0xeb8dB6B48f9F3bA0F83967E3d9b198CAB8335334',
    qatar: '0x947abaeBC95428c954f2B630c54c56a83B16C86A',
    lens: '0x34DEaEFF1D932d01E2962D2628c47AC2D6182017',
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

/**
 * payToken下拉框设置
 */
export const PayTokenList = {
  [ChainIds.BSC_TESTNET]: [
    '0x0bDBF5aB4E87C417292eA70947bE29CFD3018d7F',
  ],
  [ChainIds.HECO_TESTNET]: [
    '0x6c633473FBFc289Af5B0a67FF8fb8551608967F8',
  ],
  [ChainIds.BSC_MAINNET]: [

  ],
  [ChainIds.HECO_MAINNET]: [

  ],
}

