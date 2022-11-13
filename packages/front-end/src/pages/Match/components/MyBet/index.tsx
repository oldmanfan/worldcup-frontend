
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
  const { $t } = useTranslation();
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
                  <label>{$t('{#已競猜#}')}中国VS巴西</label>
                  <strong>2:1</strong>
                  <span><i />{$t('{#待開獎#}')}</span>
                </div>
                <p>{$t('{#參與%sTT，赔率%n倍#}').replace('%s', '12121.131').replace('%n', '8.3')}</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
