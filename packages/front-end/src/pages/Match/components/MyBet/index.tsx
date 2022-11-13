
import { useEffect, useState } from 'react';
import styles from './index.module.less';
import useTranslation from '@/hooks/useTranslation';
import { useMatchStore } from '@/models';
import useWallet from '@/hooks/useWallet';
import { GuessType } from '@/constant/GuessType';
import { CountriesById, ScoreById } from '@/constant';
import { formatTime } from '@/utils';
import { BetRecord } from '@/hooks/types';
import { toBN } from '@/utils/bn';

export interface MyBetProps {
  active: number;
}

export default function MyBet(props: RecordProps) {
  const { $t, changeLocale } = useTranslation();
  const { currentMatch } = useMatchStore();
  // const { account } = useWallet();
  // const [list, setList] = useState<BetRecord[]>([]);

  const records = [{}, {}, {}]
  return (
    <>
      {currentMatch && (
        <div className={styles.my}>
          {records.map((item, index) => {
            return (
              <div className={styles.item} key={index}>
                <div>
                  <label>已竞猜中国VS巴西</label>
                  <strong>2:1</strong>
                  <span><i />待开奖</span>
                </div>
                <p>参与12121.131TT，赔率8.3倍</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
