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
    // tt: "0xb9ba5c1c99ac58bcb2cc2b8c51e814e4a4e122de",
    // qatar: "0x38acf7B15E9a506aeFaA3fa80c96530488Fe3895",
    // lens: "0xc380BC66499f133DA372dAf3efE9d5CcA0f6274F",
    tt: "0x0bDBF5aB4E87C417292eA70947bE29CFD3018d7F",
    qatar: "0x4e5ECDC99Dae2F29C13482F2467a4b2557B2a32C",
    lens: "0x4C9f0825CAD89aEf3427e89af2f3B5e810a93563"
  },
  [ChainIds.HECO_TESTNET]: {
    tt: "0x0BA5BD9C265dFD6F4A76807F65881cEb0C6e0CB2",
    qatar: "0x439C8A24aae828e15e472dc5F3636A30258d63F9",
    lens: "0x45DEEA9865E2D9A6f9608948AF795C54c7A60547",
  },

  [ChainIds.BSC_MAINNET]: {
    lens: '',
    tt: '0x55d398326f99059fF775485246999027B3197955',
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
    // '0xb9ba5c1c99ac58bcb2cc2b8c51e814e4a4e122de', //tt
    // '0xA53DBF0C7b8B3e361395b9772dCEb2eB8697A5b4', //u
    '0x0bDBF5aB4E87C417292eA70947bE29CFD3018d7F', //u
  ],
  [ChainIds.HECO_TESTNET]: [
    '0x0BA5BD9C265dFD6F4A76807F65881cEb0C6e0CB2', //tt
    // '0x881151D0074F439b6529A53969F949A441797974', //u
  ],
  [ChainIds.BSC_MAINNET]: [
    // '0x445cc9518cf7bc7386a2e3aaf510650b0fb05f5f', //tt
    '0x55d398326f99059fF775485246999027B3197955', //u
  ],
  [ChainIds.HECO_MAINNET]: [
    '0x86040C76AAE5CBB322364CAF8820b0E8902e97E5', //tt
    // '0xa71edc38d189767582c38a3145b5873052c3e47a', //u
  ],
}

