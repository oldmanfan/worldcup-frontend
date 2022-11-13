import { List } from 'antd';
import { useMatchStore } from '@/models';
import { formatTime, toFixed } from '@/utils';
import PlayerListItem from '@/components/PlayerListItem';
import { toBN } from '@/utils/bn';

// 往期赛事
export default function WinLoseMyPartIn() {
  const { playerWinLoseRecords } = useMatchStore();
  return (
    <List
      dataSource={playerWinLoseRecords}
      renderItem={(item, index) => (
        <PlayerListItem
          rows={[
            {
              name: '下注金额',
              value: `${toFixed(toBN(item.betAmount).div(1e18).toString())} TT`,
            },
            {
              name: '开奖时间',
              value: `${formatTime(toBN(item.matchEndTime).toNumber() * 1000)}`,
            },
          ]}
          {...item}
        />
      )}
    ></List>
  );
}
