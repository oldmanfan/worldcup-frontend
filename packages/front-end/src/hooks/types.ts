import { BigNumberLike } from '@/utils/bn';
import { BigNumber } from 'ethers';

// 比赛类型
export enum MatchStatus {
  GUESS_NOT_START, // 竞猜未开始
  GUESS_ON_GOING, // 竞猜进行中
  MATCH_ON_GOING, // 比赛进行中
  MATCH_FINISHED, // 比赛己完成
}
export interface GuessPool {
  deposited: BigNumber; // 总参与的奖池金额
  withdrawed: BigNumber; // 总已提取奖金
  playersAmount: BigNumber; // 总参与人数
  odds: Array<BigNumber>; // 赔率列表
  eachDeposited: Array<BigNumber>; // 每一个guessType池的总下注额
}

export interface BetRecord {
  betId: BigNumber; // 下注ID
  guessType: BigNumber; // 竞猜类型
  betAmount: BigNumber; // 下注数额
  betTime: BigNumber; // 下注时间
  claimedAmount: BigNumber; // 已经领取的奖励
  odds: BigNumber; // 胜率 除以1e18
  win: boolean; // 是否赢得比赛
}

export interface MatchStatistics {
  matchId: BigNumber; // 比赛id
  status: MatchStatus; // 比赛状态
  countryA: BigNumber; // 参赛国A
  countryB: BigNumber; // 参赛国B
  matchStartTime: BigNumber; // 比赛开发时间
  matchEndTime: BigNumber; // 比赛结束时间  开奖时间
  guessStartTime: BigNumber; // 竞猜开始时间 下注时间
  guessEndTime: BigNumber; // 竞猜结束时间
  scoresA: BigNumber; // 比赛结果 countryA进球数, 如果是 0xff表示没有出比分
  scoresB: BigNumber; // 比赛结果 countryB进球数
  payToken: string; // 支付Token
  winlosePool: GuessPool; // 猜输赢奖池金额
  scoreGuessPool: GuessPool; // 猜比分奖池金额
  winloseRecords: Array<BetRecord>; // 猜输赢的下单
  scoreGuessRecords: Array<BetRecord>; // 猜比分的下单
  payTokenName: string; // 支付token的名字
  payTokenSymbol: string; // 支付token的symbol
  payTokenDecimals: BigNumber; // 支付token的dicimals
}

export interface TopNRecords {
  betId: BigNumber; // 下注ID
  player: string; // 下注人
  guessType: number; // 竞猜类型 参考GuessType.sol中的类型
  betAmount: BigNumber; // 下注额
  betTime: BigNumber; // 下注时间
  token: Token;
}

export interface ListItemProps extends MatchStatistics {
  totalPool: BigNumberLike; // 当前奖金池金额: 猜输赢+猜比分奖金池
  totalPlayers: BigNumberLike; // 总的参与人数 winlosePool.playersAmount + scoreGuessPool.playersAmount
  totalWinloseReward: BigNumberLike; // Player总赢得 winloseRecords.odds * betAmount || scoreGuessRecords.odds * betAmount
  totalScoreGuessReward: BigNumberLike;
  token: Token;
}

export interface PlayerRecords extends BetRecord {
  matchId: BigNumber; // 比赛id
  countryA: BigNumber; // 参赛国A
  countryB: BigNumber; // 参赛国B
  scoresA: BigNumber;
  scoresB: BigNumber;
  winAmount: BigNumberLike;
  matchEndTime: BigNumber; // 开奖时间
  status: MatchStatus;
  token: Token;
}

export interface Token {
  name: string;
  decimals: number;
  address: string;
  symbol: string;
}

export interface MatchMapProps {
  [matchId: number]: ListItemProps;
}
