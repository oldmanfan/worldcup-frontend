import { useNavigate } from 'react-router-dom';
import { List } from 'antd';
import ListItem from '@/components/ListItem';
import { useMatches } from '@/hooks/useLens';
import { formatTime } from '@/utils';
import { toBN, toPow } from '@/utils/bn';
import useTranslation from '@/hooks/useTranslation';

// 正在进行
export default function InProgressList() {
  const navigate = useNavigate();
  const { onGoingMatches } = useMatches();
  const { $t } = useTranslation();
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
