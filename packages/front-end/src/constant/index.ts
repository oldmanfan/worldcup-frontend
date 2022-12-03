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
export const defaultChainId = 256;

export interface IContractAddress {
  lens: string;
  tt: string;
  qatar: string;
}
export const ContractAddress: { [chainId: number]: IContractAddress } = {
  [ChainIds.BSC_TESTNET]: {
    tt: '0xA53DBF0C7b8B3e361395b9772dCEb2eB8697A5b4',
    qatar: '0x714a51E48836f0958dA53b9a18aFeeBFaE15E946',
    lens: '0x16B00B83D1b748bD00fE7FfeD35Db4115e4a0072',
  },
  [ChainIds.HECO_TESTNET]: {
    tt: '0x0BA5BD9C265dFD6F4A76807F65881cEb0C6e0CB2',
    qatar: '0x6561fCebb299AD7414A7caC94A3C59CC77E59010',
    lens: '0x2c62E5254bDda103bc080B3795EfeaD09BFD5C1a',
  },

  [ChainIds.BSC_MAINNET]: {
    tt: '0x55d398326f99059fF775485246999027B3197955',
    qatar: '0x9127F3Ddd37DF7B082f84368C71fcbc77646235E',
    lens: '0xDBb6350a1857923aFE68177E62B423a8B1C1507E',
  },
  [ChainIds.HECO_MAINNET]: {
    tt: '0x86040C76AAE5CBB322364CAF8820b0E8902e97E5',
    qatar: '0xed997763d226edD1e745262a90C046fc81dFC505',
    lens: '0xDBb6350a1857923aFE68177E62B423a8B1C1507E',
  },
};

export const APPROVE_MAX =
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

/**
 * 获取验证码的服务地址，
 * 开发机模式下是同域下的/api/get_mycode，然后做代理转发
 * 生产环境下，可以设置为服务的绝对路径，
 *   如：https://xxx.com/api/get_mycode
 *   则配置为：export const MyCodeApi = "https://xxx.com/api/get_mycode";
 *
 * 请按实际地址填写，否则将获取不到验证码（切记如果非同域下：接口需要为https,且允许跨域访问）
 */
// export const MyCodeApi = `http://18.141.222.213/api/get_mycode`;
export const MyCodeApi = `https://config.tdex.cz/api/get_mycode`;

/**
 * 获取TT价格的服务地址，
 * 开发机模式下是同域下的/api/get_price，然后做代理转发
 * 生产环境下，可以设置为服务的绝对路径，
 *   如：https://xxx.com/api/get_price
 *   则配置为：export const GetPriceApi = "https://xxx.com/api/get_price";
 *
 * 请按实际地址填写，否则将获取不到价格（切记如果非同域下：接口需要为https,且允许跨域访问）
 */
// export const GetPriceApi = `http://18.141.222.213/api/get_price`;
export const GetPriceApi = `https://config.tdex.cz/api/get_price`;

export const GetBindInfoApi = `https://config.tdex.cz/api/get_bind_info`;

export const SetBindInfoApi = `https://config.tdex.cz/api/do_bind`;

/**
 * 上报bet记录
 * 开发机模式下是同域下的，然后做代理转发backend的/bet接口
 * 生产环境下，可以设置为服务的绝对路径，
 *   如：https://xxx.com/api/bet
 *   则配置为：export const GetPriceApi = "https://xxx.com/api/bet";
 *
 * 请按实际地址填写，否则将获取不到价格（切记如果非同域下：接口需要为https,且允许跨域访问）
 */
// export const ReportBetApi = `http://18.141.222.213:3000/bet`;
export const ReportBetApi = `https://api.worldcup.direct/bet`;

// export const RefCode = `http://18.141.222.213:3000/refcode`;
export const RefCode = `https://api.worldcup.direct/refcode`;
