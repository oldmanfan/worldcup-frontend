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
    lens: '0x34DEaEFF1D932d01E2962D2628c47AC2D6182017',
    tt: '0xE9505ed0712e075E24aD4Cf1cB3Af4350EA78c4C',
    qatar: '0x166760410792e2df04749EDa81d1243BA02961B9',
  },
  [ChainIds.HECO_TESTNET]: {
    lens: '0x0d0332259f3030292B4e937Be09D44DA52A2121e',
    tt: '0xc221B190B6f7Dba255D47c9279839C217d86df2a',
    qatar: '0xEd1DF85808F2d32b6cDd57fc10Cee7cf746a42d3',
  },
};
