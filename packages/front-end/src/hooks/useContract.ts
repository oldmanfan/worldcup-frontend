import {
  Contract,
  ContractInterface,
  ContractTransaction,
  BigNumber,
} from 'ethers';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { GuessPool, BetRecord, MatchStatistics, TopNRecords } from './types';
import LENS_ABI from '@/abi/lens.abi.json';
import QATAR_ABI from '@/abi/qatar.abi.json';
import ERC20_ABI from '@/abi/erc20.abi.json';

export function getProviderOrSigner(
  library: Web3Provider,
  account?: string,
): Web3Provider | JsonRpcSigner {
  return account ? library.getSigner(account) : library;
}

export function makeContract<T extends Contract>(
  contractAddress: string,
  ABI: ContractInterface,
  library: Web3Provider,
  account?: string,
): T {
  const provider = getProviderOrSigner(library, account) as Web3Provider;
  return new Contract(contractAddress, ABI, provider) as T;
}

// ERC20合约类型
export interface ERC20Contract extends Contract {
  approve: (spender: string, amount: string) => Promise<ContractTransaction>;
  allowance: (owner: string, spender: string) => Promise<BigNumber>;
  balanceOf: (account: string) => Promise<BigNumber>;
}

export function makeERC20Contract(
  contractAddress: string,
  library: Web3Provider,
  account?: string,
): ERC20Contract {
  return makeContract<ERC20Contract>(
    contractAddress,
    ERC20_ABI,
    library,
    account,
  );
}
// WorldCupLens
export interface LensContract extends Contract {
  // 查询奖池参与信息
  getGuessPoolInfo: (poolAddress: string) => Promise<GuessPool>;
  getGuessRecord: (
    match: string,
    poolAddress: string,
    player: string,
  ) => Promise<BetRecord[]>;
  // 查询比赛统计信息
  getMatchStatistics: (
    match: string,
    player: string,
  ) => Promise<MatchStatistics>;
  // 查询所有比赛信息
  getAllMatches: (qatar: string, player: string) => Promise<MatchStatistics[]>;
  getTopNRecords: (
    qatar: string, // 世界杯合约地址
    matchId: number, // 比赛Id
    poolType: number, // 0: 猜胜负  1: 猜比分
    n: number, // 取n条数据
  ) => Promise<TopNRecords[]>;
}

export function makeLensContract(
  contractAddress: string,
  library: Web3Provider,
  account?: string,
) {
  return makeContract<LensContract>(
    contractAddress,
    LENS_ABI,
    library,
    account,
  );
}

export interface QatarContract extends Contract {
  guess: (
    matId: number,
    guessType: number,
    payAmount: string,
  ) => Promise<ContractTransaction>;
  claimReward: (matId: number, betId: number) => Promise<ContractTransaction>;
  claimAllRewards: () => Promise<ContractTransaction>;
}

export function makeQatarContract(
  contractAddress: string,
  library: Web3Provider,
  account?: string,
): QatarContract {
  return makeContract(contractAddress, QATAR_ABI, library, account);
}
