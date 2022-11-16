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
    tt: "0xb9ba5c1c99ac58bcb2cc2b8c51e814e4a4e122de",
    qatar: "0x5840EB8fa17a6990fDd061d46D581741D248a3F9",
    lens: "0x45DEEA9865E2D9A6f9608948AF795C54c7A60547"
  },
  [ChainIds.HECO_TESTNET]: {
    tt: "0x0BA5BD9C265dFD6F4A76807F65881cEb0C6e0CB2",
    qatar: "0x439C8A24aae828e15e472dc5F3636A30258d63F9",
    lens: "0x45DEEA9865E2D9A6f9608948AF795C54c7A60547"
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
export const MyCodeApi = `http://18.141.222.213/api/get_mycode`;

/**
 * 获取TT价格的服务地址，
 * 开发机模式下是同域下的/api/get_price，然后做代理转发
 * 生产环境下，可以设置为服务的绝对路径，
 *   如：https://xxx.com/api/get_price
 *   则配置为：export const GetPriceApi = "https://xxx.com/api/get_price";
 *
 * 请按实际地址填写，否则将获取不到价格（切记如果非同域下：接口需要为https,且允许跨域访问）
 */
export const GetPriceApi = `http://18.141.222.213/api/get_price`;

/**
 * 上报bet记录
 * 开发机模式下是同域下的，然后做代理转发backend的/bet接口
 * 生产环境下，可以设置为服务的绝对路径，
 *   如：https://xxx.com/api/bet
 *   则配置为：export const GetPriceApi = "https://xxx.com/api/bet";
 *
 * 请按实际地址填写，否则将获取不到价格（切记如果非同域下：接口需要为https,且允许跨域访问）
 */
export const ReportBetApi = `http://18.141.222.213:3000/bet`;

export const RefCode = `http://18.141.222.213:3000/refcode`;
