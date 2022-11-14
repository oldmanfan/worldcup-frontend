import { useEffect, useState } from 'react';
import styles from './index.module.less';
import useTranslation from '@/hooks/useTranslation';
import { useMatchStore } from '@/models';
import useWallet from '@/hooks/useWallet';
import { GuessType } from '@/constant/GuessType';
import {
  CountriesById,
  ScoreById,
  getCountryName,
  ICountriesById,
} from '@/constant';
import { formatTime, toFixed } from '@/utils';
import { BetRecord } from '@/hooks/types';
import { toBN } from '@/utils/bn';
import { BigNumber } from 'ethers';

export interface MyBetProps {
  active: number;
}

interface PlayerRecordOfMatchProps {
  scoreA: BigNumber;
  scoreB: BigNumber;
  label: string; // 普通显示文本
  hightlightLabel: string; // 要高亮显示的文本
  betAmount: BigNumber;
  odds: BigNumber;
  win: boolean;
}

export default function MyBet(props: MyBetProps) {
  const { $t, locale } = useTranslation();
  const { currentMatch } = useMatchStore();
  const [playerCurrentMatchRecords, setPlayerCurrentMatchRecords] = useState<
    PlayerRecordOfMatchProps[]
  >([]);

  useEffect(() => {
    if (!currentMatch) return;

    let records: PlayerRecordOfMatchProps[] = [];
    if (props.active === 1) {
      // 猜输赢
      currentMatch.winloseRecords.map((item) => {
        let country = '';
        if (item.guessType.toNumber() === GuessType.GUESS_WINLOSE_A_WIN) {
          country = getCountryName(currentMatch.countryA.toNumber(), locale);
        }
        if (item.guessType.toNumber() === GuessType.GUESS_WINLOSE_B_WIN) {
          country = getCountryName(currentMatch.countryB.toNumber(), locale);
        }
        if (item.guessType.toNumber() === GuessType.GUESS_WINLOSE_DRAW) {
          country = '平局';
        }
        records.push({
          scoreA: currentMatch.scoresA,
          scoreB: currentMatch.scoresB,
          label: '',
          // hightlightLabel: `${country}胜`,
          hightlightLabel: $t('{#%s勝#}').replace('%s', country),
          betAmount: item.betAmount,
          odds: item.odds,
          win: item.win,
        });
      });
    } else {
      currentMatch.scoreGuessRecords.map((item) => {
        records.push({
          scoreA: currentMatch.scoresA,
          scoreB: currentMatch.scoresB,
          label: `${getCountryName(
            currentMatch.countryA.toNumber(),
            locale,
          )} VS ${getCountryName(currentMatch.countryB.toNumber(), locale)}`,
          hightlightLabel: `${ScoreById[item.guessType.toNumber()].label}`,
          betAmount: item.betAmount,
          odds: item.odds,
          win: item.win,
        });
      });
    }
    setPlayerCurrentMatchRecords(records);
  }, [currentMatch, props.active]);

  return (
    <>
      {currentMatch && (
        <div className={styles.my}>
          {playerCurrentMatchRecords.map((item, index) => {
            return (
              <div className={styles.item} key={index}>
                <div>
                  <label>
                    {$t('{#已競猜#}')}
                    {item.label}
                  </label>
                  <strong>{item.hightlightLabel}</strong>
                  <span>
                    <i />
                    {$t('{#待開獎#}')}
                  </span>
                </div>
                <p>
                  {$t('{#參與%sTT，赔率%n倍#}')
                    .replace(
                      '%s',
                      toFixed(toBN(item.betAmount).div(1e18).toString()),
                    )
                    .replace(
                      '%n',
                      toFixed(toBN(item.odds).div(1e18).toNumber()),
                    )}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
