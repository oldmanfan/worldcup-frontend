import { useNavigate } from 'react-router-dom';
import { List } from 'antd';
import ListItem from '@/components/ListItem';
import { useMatches } from '@/hooks/useLens';
import { formatTime } from '@/utils';
import { toBN, toPow } from '@/utils/bn';
import useTranslation from '@/hooks/useTranslation';
import {useEffect, useState} from "react";
import {getPrice} from "@/api";
import {useMatchStore} from "@/models";

// 正在进行
export default function InProgressList() {
  const navigate = useNavigate();
  const { onGoingMatches } = useMatches();
  const { $t } = useTranslation();
  const { currentMatch } = useMatchStore();
  // tt的价格
  const [ttPrice, setTTPrice] = useState<number>(0);

  useEffect(() => {
    // 获取价格
    if (currentMatch && currentMatch.payTokenSymbol.toUpperCase() === 'USDT') {
      setTTPrice(1);
    } else {
      getPrice().then(setTTPrice);
    }
  }, [])

  if (!onGoingMatches || onGoingMatches.length < 1) {
    return (
      <div className="no-data">
        <i />
      </div>
    );
  }
  return (
    <List
      dataSource={onGoingMatches}
      renderItem={(item, index) => (
        <ListItem
          rows={[
            {
              name: $t('{#當前獎池金額#}'),
              value: `$${toBN(item.totalPool)
                .div(toPow(item.payTokenDecimals.toNumber()))
                .multipliedBy(ttPrice || 1)
                .toString(10)}`,
            },
            {
              name: $t('{#參與人次#}'),
              value: item.totalPlayers as string,
              // value  `${item.totalPlayers} 人`,
            },
            {
              name: $t('{#下注時間#}'),
              value: `${formatTime(Number(item.guessStartTime))} - ${formatTime(
                Number(toBN(item.guessEndTime).toString(10)),
              )}`,
            },
          ]}
          {...item}
        />
      )}
    ></List>
  );
}
