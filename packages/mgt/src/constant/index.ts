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
    tt: "0xb9ba5c1c99ac58bcb2cc2b8c51e814e4a4e122de",
    qatar: "0x00EFb988A2c3096265513210ea8003dAe59c5992",
    lens: "0xa7c2a3BDaE43fA629Be52218859bc34F0759bDFB"
  },
  [ChainIds.HECO_TESTNET]: {
    tt: "0x0BA5BD9C265dFD6F4A76807F65881cEb0C6e0CB2",
    qatar: "0x1FaBb12cddd6541f278Fa6394b7Af3Feee6f5ed0",
    lens: "0x00d9C524244A7fa414b732ac4eDd7588787f12A1"
  },

  [ChainIds.BSC_MAINNET]: {
    lens: '',
    tt: '0x445cc9518cf7bc7386a2e3aaf510650b0fb05f5f',
    qatar: '',
  },
  [ChainIds.HECO_MAINNET]: {
    lens: '',
    tt: '0x86040C76AAE5CBB322364CAF8820b0E8902e97E5',
    qatar: '',
  },
};

/**
 * payToken下拉框设置
 */
export const PayTokenList = {
  [ChainIds.BSC_TESTNET]: [
    '0xb9ba5c1c99ac58bcb2cc2b8c51e814e4a4e122de',
  ],
  [ChainIds.HECO_TESTNET]: [
    '0x0BA5BD9C265dFD6F4A76807F65881cEb0C6e0CB2',
  ],
  [ChainIds.BSC_MAINNET]: [
    '0x445cc9518cf7bc7386a2e3aaf510650b0fb05f5f'
  ],
  [ChainIds.HECO_MAINNET]: [
    '0x86040C76AAE5CBB322364CAF8820b0E8902e97E5'
  ],
}

