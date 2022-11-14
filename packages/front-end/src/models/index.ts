import { useState } from 'react';
import { createStore } from 'hox';
import {
  ListItemProps,
  TopNRecords,
  PlayerRecords,
  Token,
} from '@/hooks/types';

export const [useMatchStore, MatchStoreProvider] = createStore(() => {
  const [currentMatch, setCurrentMatch] = useState<ListItemProps | undefined>();
  const [records, setRecords] = useState<TopNRecords[]>([]);
  const [token, setToken] = useState<Token>();
  const [playerWinLoseRecords, setPlayerWinLoseRecords] = useState<
    PlayerRecords[]
  >([]);
  const [playerScoreGuessRecords, setPlayerScoreGuessRecords] = useState<
    PlayerRecords[]
  >([]);

  function setMatch(match: ListItemProps) {
    setCurrentMatch(match);
  }

  function setTokenStore(token: Token) {
    setToken(token);
  }

  function setRecordStore(records: TopNRecords[]) {
    setRecords(records);
  }

  function setPlayerWinLoseRecordsStore(records: PlayerRecords[]) {
    setPlayerWinLoseRecords(records);
  }

  function setPlayerScoreGuessRecordsStore(records: PlayerRecords[]) {
    setPlayerScoreGuessRecords(records);
  }

  return {
    currentMatch,
    records,
    playerWinLoseRecords,
    playerScoreGuessRecords,
    token,

    setMatch,
    setTokenStore,
    setRecordStore,
    setPlayerWinLoseRecordsStore,
    setPlayerScoreGuessRecordsStore,
  };
});
