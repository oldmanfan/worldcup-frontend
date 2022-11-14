## worldcup-mgt

  worldcup mgt


## 配置说明

### 修改合约地址

  修改`packages/mgt/src/constant/index.ts`文件的, 找到对应的链，修改其中的地址，详细见地址描述

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

### 修改PlayToken下拉选择框地址

  修改`packages/mgt/src/constant/index.ts`文件的, 找到PayTokenList将对应的链的PlayToken地址填写到数组中
  ```ts
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
npm run build

# preview on local
npm run preview
```

## 部署

```bash
将编译好的dist目录复制到web服务目录，假设为nginx,则将复制到nginx配置的web目录中即可
```

