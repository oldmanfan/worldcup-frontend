import { useEffect, useState } from 'react';
import styles from './index.module.less';
import useTranslation from '@/hooks/useTranslation';
import { useMatchStore } from '@/models';
import { formatTime } from '@/utils';
import { CountriesById } from '@/constant/Countries';

export interface InfoProps {
  active: number;
  onChange: (active: number) => void;
}

export default function Info(props: InfoProps) {
  const { $t } = useTranslation();
  const [active, setActive] = useState(1);
  const { currentMatch } = useMatchStore();
  const [imgs, setImgs] = useState<string[]>([]);

  const change = (key: number) => {
    setActive(key);
    props.onChange(key);
  };

  useEffect(() => {
    const initImg = async () => {
      if (currentMatch?.countryA && currentMatch?.countryA) {
        const a = await import(
          `../../../../assets/img/countries/${currentMatch.countryA.toNumber()}@2x.png`
        );
        const b = await import(
          `../../../../assets/img/countries/${currentMatch.countryB.toNumber()}@2x.png`
        );
        console.log('import countries img=', a.default);
        setImgs([a.default, b.default]);
      }
    };
    initImg();
  }, [currentMatch?.countryA, currentMatch?.countryA]);

  // console.log('currentMatch===', currentMatch)
  return (
    <>
      {currentMatch && (
        <div className={styles.info}>
          <h2 className={styles.h2}>
            <span>{$t('{#競猜進行中#}')}</span>
          </h2>
          <div className={styles.tip}>
            下注時間：
            {formatTime(
              currentMatch.guessStartTime.toNumber(),
              'MM月DD日 hh:mm',
            )}
            -
            {formatTime(currentMatch.guessEndTime.toNumber(), 'MM月DD日 hh:mm')}
          </div>
          <div className={styles.detail}>
            <div>
              <label>
                {CountriesById[currentMatch.countryA.toNumber()].zhName}
              </label>
              <div className={styles.nation}>
                <img src={imgs[0]} alt="" />
              </div>
            </div>
            <div>
              <label>
                {CountriesById[currentMatch.countryB.toNumber()].zhName}
              </label>
              <div className={styles.nation}>
                <img src={imgs[1]} alt="" />
              </div>
            </div>
          </div>
          <div className={styles.tabs}>
            <div
              className={active === 1 ? styles.active : ''}
              onClick={() => change(1)}
            >
              {$t('{#輸贏競猜#}')}
            </div>
            <div
              className={active === 2 ? styles.active : ''}
              onClick={() => change(2)}
            >
              {$t('{#比分競猜#}')}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
