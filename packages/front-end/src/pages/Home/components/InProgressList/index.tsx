import { useNavigate } from 'react-router-dom';
import { List } from 'antd';
import ListItem from '@/components/ListItem';
import { useMatches } from '@/hooks/useLens';
import { formatTime } from '@/utils';
import { toBN } from '@/utils/bn';

const data = [
  {
    currentReward: '1381213.38',
    userCount: 2342,
    startTime: '10.28 18:42',
    endTime: '10.29 20:55',
  },
  {
    currentReward: '1381213.38',
    userCount: 2342,
    startTime: '10.28 18:42',
    endTime: '10.29 20:55',
  },
  {
    currentReward: '1381213.38',
    userCount: 2342,
    startTime: '10.28 18:42',
    endTime: '10.29 20:55',
  },
];

// 正在进行
export default function InProgressList() {
  const navigate = useNavigate();
  const { onGoingMatches } = useMatches();
  return (
    <List
      dataSource={onGoingMatches}
      renderItem={(item, index) => (
        <ListItem
          rows={[
            {
              name: '当前奖池金额',
              value: `$${toBN(item.totalPool).div(1e18).toString()}`,
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
