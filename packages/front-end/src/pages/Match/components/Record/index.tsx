import { useEffect, useState } from 'react';
import styles from './index.module.less';
import useTranslation from '@/hooks/useTranslation';
import { useMatchStore } from '@/models';
import useWallet from '@/hooks/useWallet';
import { GuessType } from '@/constant/GuessType';
import { CountriesById, ScoreById } from '@/constant';
import { formatTime } from '@/utils';
import { BetRecord } from '@/hooks/types';
import { toBN, toPow } from '@/utils/bn';

export interface RecordProps {
  active: number;
}

export default function Record(props: RecordProps) {
  const { $t, locale } = useTranslation();
  const { currentMatch, records, token } = useMatchStore();
  const { account } = useWallet();
  const [list, setList] = useState<BetRecord[]>([]);
  useEffect(() => {
    if (!currentMatch) return;
    if (props.active === 1) {
      // 输赢竞猜
      setList(currentMatch.winloseRecords);
    } else {
      // 比分竞猜
      setList(currentMatch.scoreGuessRecords);
    }
  }, [currentMatch]);

  const getRecordLabel = (guessType: number) => {
    if (!currentMatch) return '';
    if (guessType === GuessType.GUESS_WINLOSE_A_WIN) {
      return $t('{#競猜%s勝#}').replace(
        '%s',
        locale === 'zh-hk'
          ? CountriesById[currentMatch.countryA.toNumber()].zhName
          : CountriesById[currentMatch.countryA.toNumber()].enName,
      );
    }

    if (guessType === GuessType.GUESS_WINLOSE_B_WIN) {
      return $t('{#競猜%s勝#}').replace(
        '%s',
        locale === 'zh-hk'
          ? CountriesById[currentMatch.countryB.toNumber()].zhName
          : CountriesById[currentMatch.countryB.toNumber()].enName,
      );
    }

    if (guessType === GuessType.GUESS_WINLOSE_DRAW) {
      return $t('{#競猜平局#}');
    }

    return $t('{#競猜%s#}').replace('%s', ScoreById[guessType].label);
  };

  return (
    <>
      {currentMatch && (
        <div className={styles.record}>
          <h2 className={styles.h2}>
            <span>{props.active === 1 ? $t('{#本場輸贏競猜參與記錄#}') : $t('{#本場比分競猜參與記錄#}')}</span>
          </h2>
          <div className={styles.list}>
            {records.length < 1 ? (
              <div className="no-data" style={{ paddingTop: 0 }}>
              <i />
            </div>): (
            records.map((item, index) => {
              return (
                <div className={styles.item} key={index}>
                  <div>
                    <div className={styles.light}>
                      {item.player.slice(0, 6)}...{item.player.slice(-5)}
                    </div>
                    <div className={styles.light}>
                      {/* {Number(item.guessType) === GuessType.GUESS_WINLOSE_A_WIN
                        ? `競猜${
                            CountriesById[currentMatch.countryA.toNumber()]
                              .zhName
                          }勝`
                        : `競猜${
                            CountriesById[currentMatch.countryB.toNumber()]
                              .zhName
                          }勝`} */}
                      {getRecordLabel(Number(item.guessType))}
                    </div>
                  </div>
                  <div>
                    <div className={styles.time}>
                      {formatTime(item.betTime.toNumber(), 'MM-DD HH:mm')}
                    </div>
                    <div
                      className={styles.value}
                      dangerouslySetInnerHTML={{
                        __html: $t('{#競猜<strong>%s</strong>' + token?.symbol + '#}').replace(
                          '%s',
                          toBN(item.betAmount)
                            .div(toPow(token?.decimals || 18))
                            .toString(10),
                        ),
                      }}
                    ></div>
                  </div>
                </div>
              );
            }))
            }
            {/* TODO: 有数据的时候这里要删除掉 */}
            {/* <div className={styles.item}>
              <div>
                <div className={styles.light}>0x7546…88407</div>
                <div className={styles.light}>競猜巴西勝</div>
              </div>
              <div>
                <div className={styles.time}>10-28 12:22</div>
                <div className={styles.value}>
                  競猜<strong>13138.238</strong>TT
                </div>
              </div>
            </div> */}
            {/* <div className={styles.item}>
              <div>
                <div className={styles.light}>0x7546…88407</div>
                <div className={styles.light}>競猜巴西勝</div>
              </div>
              <div>
                <div className={styles.time}>10-28 12:22</div>
                <div className={styles.value}>
                  競猜<strong>13138.238</strong>TT
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <div>
                <div className={styles.light}>0x7546…88407</div>
                <div className={styles.light}>競猜巴西勝</div>
              </div>
              <div>
                <div className={styles.time}>10-28 12:22</div>
                <div className={styles.value}>
                  競猜<strong>13138.238</strong>TT
                </div>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
}
