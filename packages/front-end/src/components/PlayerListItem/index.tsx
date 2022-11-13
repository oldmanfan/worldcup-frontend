import React from 'react';
import { RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';
import { ListItemProps, PlayerRecords } from '@/hooks/types';
import { CountriesById } from '@/constant/Countries';
import { useMatchStore } from '@/models';
import { toBN } from '@/utils/bn';
import { toFixed } from '@/utils';
import useTranslation from '@/hooks/useTranslation';

interface RowProps {
  name: string;
  value: string | number;
}
interface IListItemProps extends PlayerRecords {
  onClick?: () => void;
  rows: RowProps[]; // 具体显示的列表信息
}

export default function PlayerListItem(props: IListItemProps) {
  const { winAmount, scoresA, scoresB, win, rows, onClick, ...rest } = props;
  const { setMatch } = useMatchStore();
  const navigate = useNavigate();
  const { $t } = useTranslation();

  // const handleClick = () => {
  //   const match = {
  //     scoresA,
  //     scoresB,
  //     ...rest,
  //   };
  //   if (onClick) {
  //     onClick();
  //     return;
  //   }
  //   navigate(`/match/${match.matchId.toNumber()}`);
  // };

  return (
    <div className={styles.listItem}>
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
      <div className={styles.recordWrap}>
        <label>{$t("{#盈得#}")}</label>
        <span>{toFixed(toBN(winAmount).div(1e18).toString())} TT</span>
      </div>
      <i
        className={`${styles.result} ${
          win ? styles.iconSuccess : styles.iconError
        }`}
      ></i>
    </div>
  );
}
