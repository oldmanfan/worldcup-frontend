import { useEffect, useState } from 'react';
import styles from '../index.module.less';
import useTranslation from '@/hooks/useTranslation';
import { useMatchStore } from '@/models';
import { CountriesById } from '@/constant/Countries';
import { GuessType } from '@/constant/GuessType';
import { BigNumberLike, toBN } from '@/utils/bn';
import { onlyNumber, toFixed, sleep } from '@/utils';
// import useToken from '@/hooks/useToken';
import { APPROVE_MAX, ScoreList } from '@/constant';

export interface OptionsProps {
  value: number | GuessType;
  label: string;
  desc: number | string;
}

export interface ScoreFormProps {
  value: number;
  onChange: (value: number, label: string) => void;
}

export default function ScoreForm(props: ScoreFormProps) {
  const { $t, locale } = useTranslation();
  const { currentMatch } = useMatchStore();
  const [options, setOptions] = useState<OptionsProps[]>(ScoreList);

  useEffect(() => {
    if (currentMatch) {
      const newOptions = currentMatch.scoreGuessPool.odds.map((item, index) => {
        let newOption = ScoreList[index];
        newOption.desc = toBN(item).toString(10);
        return newOption;
      });
      setOptions(newOptions);
    }
  }, [currentMatch]);

  return (
    <>
      {currentMatch && (
        <div className={styles['score-form']}>
          <div className={styles.title}>
            <div className={styles.left}>
              {locale === 'zh-hk'
                ? CountriesById[currentMatch.countryA.toNumber()].zhName
                : CountriesById[currentMatch.countryA.toNumber()].enName
              }
            </div>
            {/*<div>{$t('{#平局#}')}</div>*/}
            <div className={styles.right}>
              {locale === 'zh-hk'
                ? CountriesById[currentMatch.countryB.toNumber()].zhName
                : CountriesById[currentMatch.countryB.toNumber()].enName
              }
            </div>
          </div>
          <div className={styles.options}>
            {options.length > 0 &&
              options.map((item) => {
                let label = item.label;
                if (item.value === 26) {
                  label = $t('{#其他#}');
                }
                if (item.value === 3 || item.value === 8 || item.value === 13 || item.value === 18 || item.value === 23) {
                  return <a className={styles.hidden} key={item.value as string}></a>
                }
                return (
                  <a
                    key={item.value as string}
                    className={
                      item.value === props.value ? styles.selected : ''
                    }
                    onClick={() =>
                      props.onChange(item.value as number, label)
                    }
                  >
                    <label>{label}</label>
                    <div>{toFixed(toBN(item.desc).div(1e18).toString(10))}</div>
                  </a>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}
