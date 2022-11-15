## worldcup-frontend

  worldcup frontend

## 配置说明

### 修改合约地址

  修改`packages/front-end/src/constant/index.ts`文件的, 找到对应的链，修改其中的地址，详细见地址描述

  ```ts
  export const ContractAddress: { [chainId: number]: IContractAddress } = {
    [ChainIds.BSC_TESTNET]: {
      // PlayToken地址
      tt: "0x254d2Be5Cd077245E6005Ff54C7f874425d71091",
      // qatar合约地址
      qatar: "0xeE2D69e6BDcB446ea9BD61FB8ebE1f7F7b9094e5",
      // lens合约地址
      lens: "0x82c0D26e7cc49FF92990C40798737a41aBc2Ad3a"
    },
    [ChainIds.HECO_TESTNET]: {
      tt: "0x6c633473FBFc289Af5B0a67FF8fb8551608967F8",
      qatar: "0xEF83D8bCb40F89B6dbfA9429439D2851f7e0c5B4",
      lens: "0xb46E6b32E1F7087cB78e974A59daAfd3dC8c2afC"
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
  ```

### 修改验证码和价格服务地址，上报bet记录服务

  修改`packages/front-end/src/constant/index.ts`文件的, 找到MyCodeApi，GetPriceApi改为实际值，详细将下面代码备注

  ```ts
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

  /**
   * 获取TT价格的服务地址，
   * 开发机模式下是同域下的/api/get_price，然后做代理转发
   * 生产环境下，可以设置为服务的绝对路径，
   *   如：https://xxx.com/api/get_price
   *   则配置为：export const GetPriceApi = "https://xxx.com/api/get_price";
   *
   * 请按实际地址填写，否则将获取不到价格（切记如果非同域下：接口需要为https,且允许跨域访问）
   */
  export const GetPriceApi = `${location.origin}/api/get_mycode`;

  /**
   * 上报bet记录
   * 开发机模式下是同域下的，然后做代理转发backend的/bet接口
   * 生产环境下，可以设置为服务的绝对路径，
   *   如：https://xxx.com/api/bet
   *   则配置为：export const GetPriceApi = "https://xxx.com/api/bet";
   *
   * 请按实际地址填写，否则将获取不到价格（切记如果非同域下：接口需要为https,且允许跨域访问）
   */
  export const ReportBetApi = `${location.origin}/api/bk/bet`;

  ```

## 本地开发

```bash
# install dependencies
yarn
# dev
npm run dev
```

## 编译

```bash
# 编译
npm run build

# 本地预览编译出来的代码
npm run preview
```

## 部署

```bash
将编译好的dist目录复制到web服务目录，假设为nginx,则将复制到nginx配置的web目录中即可
```
