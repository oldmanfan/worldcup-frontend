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
    '0x254d2Be5Cd077245E6005Ff54C7f874425d71091',
  ],
  [ChainIds.HECO_TESTNET]: [
    '0x6c633473FBFc289Af5B0a67FF8fb8551608967F8',
  ],
  [ChainIds.BSC_MAINNET]: [

  ],
  [ChainIds.HECO_MAINNET]: [

  ],
}

