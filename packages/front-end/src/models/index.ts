import { useState } from 'react';
import { createStore } from 'hox';
import {
  ListItemProps,
  TopNRecords,
  PlayerRecords,
  Token,
  MatchMapProps,
} from '@/hooks/types';

export const [useMatchStore, MatchStoreProvider] = createStore(() => {
  const [currentMatch, setCurrentMatch] = useState<ListItemProps | undefined>();
  const [records, setRecords] = useState<TopNRecords[]>([]);
  const [token, setToken] = useState<Token | undefined>();
  const [playerWinLoseRecords, setPlayerWinLoseRecords] = useState<
    PlayerRecords[]
  >([]);
  const [playerScoreGuessRecords, setPlayerScoreGuessRecords] = useState<
    PlayerRecords[]
  >([]);
  const [matchMap, setMatchMap] = useState<MatchMapProps | undefined>();

  function setMatch(match: ListItemProps) {
    setCurrentMatch(match);
  }
  function setRecordStore(records: TopNRecords[]) {
    setRecords(records);
  }

  function setTokenStore(token: Token) {
    setToken(token);
  }

  function setMatchMapStore(matchMap: MatchMapProps) {
    setMatchMap(matchMap);
  }

  function setPlayerWinLoseRecordsStore(records: PlayerRecords[]) {
    // 下注betTime倒序排列
    setPlayerWinLoseRecords(records.sort((a, b) => {
      return b.betTime.toNumber() - a.betTime.toNumber();
    }));
    // setPlayerWinLoseRecords(records);
  }

  function setPlayerScoreGuessRecordsStore(records: PlayerRecords[]) {
    // 下注betTime倒序排列
    setPlayerScoreGuessRecords(records.sort((a, b) => {
      return b.betTime.toNumber() - a.betTime.toNumber();
    }));
    // setPlayerScoreGuessRecords(records);
  }

  return {
    currentMatch,
    records,
    playerWinLoseRecords,
    playerScoreGuessRecords,
    token,
    matchMap,

    setMatch,
    setRecordStore,
    setTokenStore,
    setPlayerWinLoseRecordsStore,
    setPlayerScoreGuessRecordsStore,
    setMatchMapStore,
  };
});
