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
  const [token, setToken] = useState<Token | undefined>();
  const [playerWinLoseRecords, setPlayerWinLoseRecords] = useState<
    PlayerRecords[]
  >([]);
  const [playerScoreGuessRecords, setPlayerScoreGuessRecords] = useState<
    PlayerRecords[]
  >([]);

  function setMatch(match: ListItemProps) {
    setCurrentMatch(match);
  }
  function setRecordStore(records: TopNRecords[]) {
    setRecords(records);
  }

  function setTokenStore(token: Token) {
    setToken(token);
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
    setRecordStore,
    setTokenStore,
    setPlayerWinLoseRecordsStore,
    setPlayerScoreGuessRecordsStore,
  };
});
