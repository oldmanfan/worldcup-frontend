import React, { useState, useEffect } from 'react';
import { RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';
import { ListItemProps } from '@/hooks/types';
import { CountriesById } from '@/constant/Countries';
import { useMatchStore } from '@/models';
import useTranslation from '@/hooks/useTranslation';
import { toBN } from '@/utils/bn';

interface RowProps {
  name: string;
  value: string | number;
}
interface IListItemProps extends ListItemProps {
  onClick?: () => void;
  showScores?: boolean;
  showWinLoseReward?: boolean;
  showScoreGuessReward?: boolean;
  showWinLoss?: boolean;
  rows: RowProps[]; // 具体显示的列表信息
}

export default function ListItem(props: IListItemProps) {
  const {
    countryA,
    countryB,
    scoresA,
    scoresB,
    showScores,
    rows,
    showWinLoseReward,
    showScoreGuessReward,
    showWinLoss,
    totalWinloseReward,
    totalScoreGuessReward,
    onClick,
    ...rest
  } = props;
  const { setMatch } = useMatchStore();
  const navigate = useNavigate();
  const [imgs, setImgs] = useState<string[]>([]);
  const { $t, locale } = useTranslation();
  const [scoreVisible, setScoreVisible] = useState(false);

  useEffect(() => {
    const initImg = async () => {
      if (countryA && countryB) {
        const a = await import(
          `../../assets/img/countries/${countryA.toNumber()}@2x.png`
        );
        const b = await import(
          `../../assets/img/countries/${countryB.toNumber()}@2x.png`
        );
        setImgs([a.default, b.default]);
      }
    };
    initImg();
  }, [countryA, countryB]);

  const handleClick = () => {
    const match = {
      countryA,
      countryB,
      scoresA,
      scoresB,
      totalWinloseReward,
      totalScoreGuessReward,
      ...rest,
    };
    if (onClick) {
      onClick();
      return;
    }
    navigate(`/match/${match.matchId.toNumber()}`);
  };

  useEffect(() => {
    if (!(toBN(scoresA).eq(255) && toBN(scoresB).eq(255)) && showScores) {
      setScoreVisible(true);
    }
  }, []);

  return (
    <div className={styles.listItem} onClick={handleClick}>
      <div className={styles.nav}>
        <div>
          <i>
            <img src={imgs[0]} alt="" />
            <img src={imgs[1]} alt="" />
          </i>
          <span>
            <span>
              {locale === 'zh-hk'
                ? CountriesById[countryA.toNumber()].zhName
                : CountriesById[countryA.toNumber()].enName}
            </span>
            <strong>VS</strong>
            <span>
              {locale === 'zh-hk'
                ? CountriesById[countryB.toNumber()].zhName
                : CountriesById[countryB.toNumber()].enName}
            </span>
          </span>
          {scoreVisible && (
            <span className={styles.record}>{`${scoresA} : ${scoresB}`}</span>
          )}
        </div>
        {/* <i className={styles.iconArrow}>{'>'}</i> */}
        <RightOutlined className={styles.iconArrow} />
      </div>
      <div className={styles.detail}>
        {rows.map((item, index) => {
          return (
            <p key={index}>
              <label>{item.name}</label>
              <span>{item.value}</span>
            </p>
          );
        })}
      </div>
      <div className={styles.divider}></div>
      {(showWinLoseReward || showScoreGuessReward) && (
        <div className={styles.recordWrap}>
          <label>{$t('{#盈得#}')}</label>
          {showWinLoseReward && (
            <span>{totalWinloseReward.toString(10)} TT</span>
          )}
          {showScoreGuessReward && (
            <span>{totalScoreGuessReward.toString()} TT</span>
          )}
        </div>
      )}
      {showWinLoss && (
        <i className={`${styles.result} ${styles.iconSuccess}`}></i>
      )}
    </div>
  );
}
