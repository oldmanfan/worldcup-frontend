import { useEffect, useState } from 'react';
import { makeLensContract } from './useContract';
import useContractAddress from './useContractAddress';
import { MatchStatus, MatchStatistics, ListItemProps } from './types';
import useWallet from './useWallet';
import { toBN, BigNumberLike } from '@/utils/bn';

export default function useLens() {
  const { provider, account, chainId } = useWallet();
  const { contractAddress } = useContractAddress();
  const [allMatches, setAllMatches] = useState<ListItemProps[]>([]);
  const [notStartMatches, setNotStartMatches] = useState<ListItemProps[]>([]);
  const [onGoingMatches, setOnGoingMatches] = useState<ListItemProps[]>([]);
  const [finishedMatches, setFinishedMatches] = useState<ListItemProps[]>([]);
  // const [matchMap, setMatchMap] = useState({});

  function getAllMatches() {
    if (provider && account) {
      console.log('-====', provider, account, contractAddress);
      const lensContract = makeLensContract(
        contractAddress.lens,
        provider,
        account,
      );
      lensContract.getAllMatches(contractAddress.qatar, account).then((res) => {
        // const matchMap: any = {};
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
            if (winlose.win) {
              totalWinloseReward = totalWinloseReward.plus(
                toBN(winlose.odds).multipliedBy(toBN(winlose.betAmount)),
              );
            }
          }
          let totalScoreGuessReward = toBN(0);
          for (const scoreGuess of item.scoreGuessRecords) {
            if (scoreGuess.win) {
              totalScoreGuessReward = totalScoreGuessReward.plus(
                toBN(scoreGuess.odds).multipliedBy(toBN(scoreGuess.betAmount)),
              );
            }
          }
          const newItem = {
            totalPool,
            totalPlayers,
            totalWinloseReward,
            totalScoreGuessReward,
            ...item,
          } as ListItemProps;
          // matchMap[item.matchId.toNumber()] = newItem;
          return newItem;
        });

        // setMatchMap(matchMap);
        setAllMatches(allMatches);
        const notStartMatches = allMatches.filter(
          (item) => item.status === MatchStatus.GUESS_NOT_START,
        );
        const onGoingMatches = allMatches.filter(
          (item) => item.status === MatchStatus.GUESS_ON_GOING,
        );
        const finishedMatches = allMatches.filter(
          (item) => item.status === MatchStatus.MATCH_FINISHED,
        );

        console.log({
          notStartMatches,
          onGoingMatches,
          finishedMatches,
        });

        setNotStartMatches(notStartMatches);
        setOnGoingMatches(onGoingMatches);
        setFinishedMatches(finishedMatches);
      });
    }
  }
  useEffect(() => {
    getAllMatches();
  }, [chainId, account, provider]);

  return {
    account,
    getAllMatches,

    allMatches,
    // notStartMatches,
    // onGoingMatches,
    // finishedMatches,
    // matchMap,
  };
}
