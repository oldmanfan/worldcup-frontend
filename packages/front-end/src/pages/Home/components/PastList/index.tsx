import { List } from 'antd';
import ListItem from '@/components/ListItem';
import { useMatches } from '@/hooks/useLens';
import { formatTime, toFixed } from '@/utils';
import useTranslation from '@/hooks/useTranslation';
import { toBN } from '@/utils/bn';

// 往期赛事
export default function PastList() {
  const { finishedMatches } = useMatches();
  const { $t } = useTranslation();

  if (!finishedMatches || finishedMatches.length < 1) {
    return (
      <div className="no-data">
        <i />
      </div>
    );
  }
  return (
    <List
      dataSource={finishedMatches}
      renderItem={(item, index) => (
        <ListItem
          rows={[
            {
              name: $t('{#當前獎池金額#}'),
              value: `$${toFixed(toBN(item.totalPool).div(1e18).toString(10))}`,
            },
            {
              name: $t('{#參與人數#}'),
              value: $t('{#%s 人#}').replace('%s', item.totalPlayers as string),
              // value: `${item.totalPlayers} 人`,
            },
            {
              name: $t('{#下注時間#}'),
              value: `${formatTime(Number(item.guessStartTime))} - ${formatTime(
                Number(item.guessEndTime.toString(10)),
              )}`,
            },
          ]}
          showScores
          {...item}
        />
      )}
    ></List>
  );
}
