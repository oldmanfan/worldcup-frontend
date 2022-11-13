import { List } from 'antd';
import { formatTime, toFixed } from '@/utils';
import PlayerListItem from '@/components/PlayerListItem';
import { useMatchStore } from '@/models';
import { toBN } from '@/utils/bn';

// 往期赛事
export default function ScoreGuessMyPartIn() {
  const { playerScoreGuessRecords } = useMatchStore();
  return (
    <List
      dataSource={playerScoreGuessRecords}
      renderItem={(item, index) => (
        <PlayerListItem
          rows={[
            {
              name: '下注金额',
              value: `${toFixed(toBN(item.winAmount).div(1e18).toString())} TT`,
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
