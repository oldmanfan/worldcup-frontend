import { List } from 'antd';
import ListItem from '@/components/ListItem';
import { useMatches } from '@/hooks/useLens';
import { formatTime } from '@/utils';

// 往期赛事
export default function PastList() {
  const { finishedMatches } = useMatches();
  return (
    <List
      dataSource={finishedMatches}
      renderItem={(item, index) => (
        <ListItem
          rows={[
            {
              name: '当前奖池金额',
              value: `$${item.totalPool}`,
            },
            {
              name: '参与人数',
              value: `${item.totalPlayers} 人`,
            },
            {
              name: '下注时间',
              value: `${formatTime(Number(item.guessStartTime))} - ${formatTime(
                Number(item.guessEndTime.toString()),
              )}`,
            },
          ]}
          {...item}
        />
      )}
    ></List>
  );
}
