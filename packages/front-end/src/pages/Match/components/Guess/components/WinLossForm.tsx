
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

export interface WinLossFormProps {
  value: number;
  onChange: (value: number, label: string) => void;
}

export default function WinLossForm(props: WinLossFormProps) {
  const { $t, locale } = useTranslation();
  const { currentMatch } = useMatchStore();
  const [options, setOptions] = useState<OptionsProps[]>([]);

  useEffect(() => {
    if (currentMatch) {
      const odds: number[] =
        currentMatch.winlosePool.odds.map((item) =>
          toBN(item).div(1e18).toNumber(),
        ) || [];
      const countryA =
        locale === 'zh-hk'
          ? CountriesById[currentMatch.countryA.toNumber()].zhName
          : CountriesById[currentMatch.countryA.toNumber()].enName;
      const countryB =
        locale === 'zh-hk'
          ? CountriesById[currentMatch.countryB.toNumber()].zhName
          : CountriesById[currentMatch.countryB.toNumber()].enName;
      const options = [
        {
          value: GuessType.GUESS_WINLOSE_A_WIN,
          label: $t('{#%s勝#}').replace('%s', countryA),
          desc: odds[0],
        },
        // {
        //   value: GuessType.GUESS_WINLOSE_DRAW,
        //   label: $t('{#平局#}'),
        //   desc: odds[1],
        // },
        {
          value: GuessType.GUESS_WINLOSE_B_WIN,
          label: $t('{#%s勝#}').replace('%s', countryB),
          desc: odds[2],
        },
      ];
      setOptions(options);
      props.onChange(options[0].value, options[0].label);
    }
  }, [currentMatch]);

  return (
    <>
      {currentMatch && options.length > 0 && (
        <div className={styles['winloss-form']}>
          {options.map((item) => {
            return (
              <div
                key={`key${item.value}`}
                className={props.value === item.value ? styles.selected : ''}
                onClick={() => props.onChange(item.value as number, item.label)}
              >
                <label>{item.label}</label>
                <div>{toFixed(item.desc)}</div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
