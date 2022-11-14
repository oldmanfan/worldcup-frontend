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


/**
 * 获取验证码的服务地址，
 * 开发机模式下是同域下的/api/get_mycode，然后做代理转发
 * 生产环境下，可以设置为服务的绝对路径，
 *   如：https://xxx.com/api/get_mycode
 *   则配置为：export const MyCodeApi = "https://xxx.com/api/get_mycode";
 *
 * 请按实际地址填写，否则将获取不到验证码（切记如果非同域下：接口需要为https,且允许跨域访问）
 */
export const MyCodeApi = `${location.origin}/api/get_mycode`;
