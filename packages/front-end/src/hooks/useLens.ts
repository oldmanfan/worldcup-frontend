import { useEffect, useState } from 'react';
import { makeLensContract } from './useContract';
import useContractAddress from './useContractAddress';
import {
  MatchStatus,
  MatchStatistics,
  ListItemProps,
  TopNRecords,
  PlayerRecords,
} from './types';
import useWallet from './useWallet';
import { toBN, BigNumberLike } from '@/utils/bn';
import { useMatchStore } from '@/models';

// 玩家个人统计数据
interface PlayerTotalInfoProps {
  playerTotalBetAmount: BigNumberLike; // 累计竞猜值  winloseRecords.betAmount + scoreGuessRecords.betAmount
  playerTotalWinAmount: BigNumberLike; // 总的中奖金额  win ? betAmount * odds
  playerTotalWithdraw: BigNumberLike; // 总的已提取
  playerTotalUnWithdraw: BigNumberLike; // 所有待领取
  playerTotalPartIn: BigNumberLike; // 总参与次数
  playerTotalWinTimes: BigNumberLike; // 总的中奖次数
  playerWinRate: BigNumberLike; // 收益率
}

export function useMatches() {
  const { provider, account, chainId } = useWallet();
  const { contractAddress } = useContractAddress();
  const [allMatches, setAllMatches] = useState<ListItemProps[]>([]);
  const [notStartMatches, setNotStartMatches] = useState<ListItemProps[]>([]);
  const [onGoingMatches, setOnGoingMatches] = useState<ListItemProps[]>([]);
  const [finishedMatches, setFinishedMatches] = useState<ListItemProps[]>([]);
  // 玩家统计Bannner 统计数据
  const [playerTotalInfo, setPlayerTotalInfo] = useState<
    PlayerTotalInfoProps | undefined
  >();
  const [matchMap, setMatchMap] = useState();
  const { setPlayerScoreGuessRecordsStore, setPlayerWinLoseRecordsStore } =
    useMatchStore();

  useEffect(() => {
    getAllMatches();
  }, [chainId, account, provider]);

  function getAllMatches() {
    if (provider && account) {
      const lensContract = makeLensContract(
        contractAddress.lens,
        provider,
        account,
      );
      lensContract.getAllMatches(contractAddress.qatar, account).then((res) => {
        const matchMap: any = {};
        let playerTotalBetAmount = toBN(0); // 累计竞猜值  winloseRecords.betAmount + scoreGuessRecords.betAmount
        let playerTotalWinAmount = toBN(0); // 中奖金额
        let playerTotalWithdraw = toBN(0); // 已提取
        let playerTotalUnWithdraw = toBN(0);
        let playerTotalPartIn = toBN(0);
        let playerTotalWinTimes = toBN(0); // 中奖次数
        let playerWinRate = toBN(0);

        let playerWinLoseRecords: PlayerRecords[] = [];
        let playerScoreGuessRecords: PlayerRecords[] = [];
        const allMatches = res.map((item) => {
          const { winlosePool, scoreGuessPool, winloseRecords } = item;
          const totalPool = toBN(winlosePool.deposited).plus(
            toBN(scoreGuessPool.deposited),
          );
          const totalPlayers = toBN(winlosePool.playersAmount).plus(
            toBN(scoreGuessPool.playersAmount),
          );
          // 猜输赢的总赢得
          let totalWinloseReward = toBN(0);

          for (const winlose of item.winloseRecords) {
            // 累计竞猜值
            playerTotalBetAmount = playerTotalBetAmount.plus(
              toBN(winlose.betAmount),
            );
            // 已提取
            playerTotalWithdraw = playerTotalWithdraw.plus(
              toBN(winlose.claimedAmount),
            );
            // 我的才输赢记录
            playerWinLoseRecords.push({
              ...winlose,
              winAmount: toBN(winlose.betAmount).multipliedBy(
                toBN(winlose.odds).div(1e18),
              ),
              scoresA: item.scoresA,
              scoresB: item.scoresB,
              matchEndTime: item.matchEndTime,
              matchId: item.matchId,
              countryA: item.countryA,
              countryB: item.countryB,
            });

            if (winlose.win) {
              playerTotalWinAmount = playerTotalWinAmount.plus(
                toBN(winlose.odds).multipliedBy(toBN(winlose.betAmount)),
              );
              totalWinloseReward = totalWinloseReward.plus(
                toBN(winlose.odds).multipliedBy(toBN(winlose.betAmount)),
              );
              // 中奖次数+1
              playerTotalWinTimes = toBN(playerTotalWinTimes).plus(1);
            }
          }
          let totalScoreGuessReward = toBN(0);

          for (const scoreGuess of item.scoreGuessRecords) {
            // 累计竞猜值
            playerTotalBetAmount = playerTotalBetAmount.plus(
              toBN(scoreGuess.betAmount),
            );
            // 已提取
            playerTotalWithdraw = playerTotalWithdraw.plus(
              toBN(scoreGuess.claimedAmount),
            );
            playerScoreGuessRecords.push({
              ...scoreGuess,
              winAmount: toBN(scoreGuess.betAmount).multipliedBy(
                toBN(scoreGuess.odds).div(1e18),
              ),
              scoresA: item.scoresA,
              scoresB: item.scoresB,
              matchEndTime: item.matchEndTime,
              matchId: item.matchId,
              countryA: item.countryA,
              countryB: item.countryB,
            });

            if (scoreGuess.win) {
              playerTotalWinAmount = playerTotalWinAmount.plus(
                toBN(scoreGuess.odds).multipliedBy(toBN(scoreGuess.betAmount)),
              );
              totalScoreGuessReward = totalScoreGuessReward.plus(
                toBN(scoreGuess.odds).multipliedBy(toBN(scoreGuess.betAmount)),
              );
              // 中奖次数+1
              playerTotalWinTimes = toBN(playerTotalWinTimes).plus(1);
            }
          }

          // 参与次数
          playerTotalPartIn = playerTotalPartIn
            .plus(item.winloseRecords.length)
            .plus(item.scoreGuessRecords.length);
          const newItem = {
            totalPool,
            totalPlayers,
            totalWinloseReward,
            totalScoreGuessReward,
            ...item,
          } as ListItemProps;
          matchMap[item.matchId.toNumber()] = newItem;
          return newItem;
        });

        // 待领取
        playerTotalUnWithdraw =
          playerTotalWinAmount.minus(playerTotalWinAmount);
        // 收益率
        playerWinRate = playerTotalWinAmount.div(playerTotalBetAmount);

        setPlayerScoreGuessRecordsStore(playerScoreGuessRecords);
        setPlayerWinLoseRecordsStore(playerWinLoseRecords);
        setMatchMap(matchMap);
        setAllMatches(allMatches);
        const notStartMatches = allMatches.filter(
          (item) => item.status === MatchStatus.GUESS_NOT_START,
        );
        const onGoingMatches = allMatches.filter(
          (item) =>
            item.status === MatchStatus.GUESS_ON_GOING ||
            item.status === MatchStatus.MATCH_ON_GOING,
        );
        const finishedMatches = allMatches.filter(
          (item) => item.status === MatchStatus.MATCH_FINISHED,
        );

        setNotStartMatches(notStartMatches);
        setOnGoingMatches(onGoingMatches);
        setFinishedMatches(finishedMatches);

        // 玩家统计数据
        setPlayerTotalInfo({
          playerTotalBetAmount,
          playerTotalWinAmount,
          playerTotalWithdraw,
          playerTotalUnWithdraw,
          playerTotalPartIn,
          playerTotalWinTimes,
          playerWinRate,
        });
      });
    }
  }

  return {
    getAllMatches,

    allMatches,
    notStartMatches,
    onGoingMatches,
    finishedMatches,
    matchMap,
    playerTotalInfo,
  };
}

export function useTopNRecords() {
  const { account, provider } = useWallet();
  const { contractAddress } = useContractAddress();
  const { setRecordStore } = useMatchStore();

  async function getTopNRecords(matchId: number, poolType: number) {
    const contract = makeLensContract(contractAddress.lens, provider, account);
    const records = await contract.getTopNRecords(
      contractAddress.qatar,
      matchId,
      poolType,
      100,
    );
    setRecordStore(records);
  }

  return {
    getTopNRecords,
  };
}
