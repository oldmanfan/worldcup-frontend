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
    tt: "0xA53DBF0C7b8B3e361395b9772dCEb2eB8697A5b4",
    qatar: "0x714a51E48836f0958dA53b9a18aFeeBFaE15E946",
    lens: "0x16B00B83D1b748bD00fE7FfeD35Db4115e4a0072"
  },
  [ChainIds.HECO_TESTNET]: {
    tt: "0x0BA5BD9C265dFD6F4A76807F65881cEb0C6e0CB2",
    qatar: "0x6561fCebb299AD7414A7caC94A3C59CC77E59010",
    lens: "0x2c62E5254bDda103bc080B3795EfeaD09BFD5C1a",
  },

  [ChainIds.BSC_MAINNET]: {
    tt: '0x55d398326f99059fF775485246999027B3197955',
    qatar: '0xB63f53EEFaB0c86128669Ad2f374839f11c0D898',
    lens: '0x320d4A38A5d45946d6B6568157B844C8a19cB3f6',
  },
  [ChainIds.HECO_MAINNET]: {
    tt: '0x86040C76AAE5CBB322364CAF8820b0E8902e97E5',
    qatar: '0xE844D1889294da61055000482f70B30009569B0A',
    lens: '0x6245a750F750e79Afe183E92fc8A3a11bf873216',
  },
};

/**
 * payToken下拉框设置
 */
export const PayTokenList = {
  [ChainIds.BSC_TESTNET]: [
    '0xA53DBF0C7b8B3e361395b9772dCEb2eB8697A5b4', //u
  ],
  [ChainIds.HECO_TESTNET]: [
    '0x0BA5BD9C265dFD6F4A76807F65881cEb0C6e0CB2', //tt
  ],
  [ChainIds.BSC_MAINNET]: [
    '0x55d398326f99059fF775485246999027B3197955', //u
  ],
  [ChainIds.HECO_MAINNET]: [
    '0x86040C76AAE5CBB322364CAF8820b0E8902e97E5', //tt
  ],
}

