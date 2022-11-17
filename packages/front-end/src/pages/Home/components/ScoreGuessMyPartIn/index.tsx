import { List } from 'antd';
import { formatTime, toFixed } from '@/utils';
import PlayerListItem from '@/components/PlayerListItem';
import { useMatchStore } from '@/models';
import { toBN, toPow } from '@/utils/bn';
import useTranslation from '@/hooks/useTranslation';

// 往期赛事
export default function ScoreGuessMyPartIn() {
  const { playerScoreGuessRecords } = useMatchStore();
  const { $t } = useTranslation();

  if (!playerScoreGuessRecords || playerScoreGuessRecords.length < 1) {
    return (
      <div className="no-data">
        <i />
      </div>
    );
  }

  return (
    <List
      dataSource={playerScoreGuessRecords}
      renderItem={(item, index) => (
        <PlayerListItem
          rows={[
            {
              name: $t('{#下注金額#}'),
              value: `${toFixed(
                toBN(item.betAmount)
                  .div(toPow(item.token.decimals))
                  .toString(10),
              )} ${item.token.symbol}`,
            },
            {
              name: $t('{#開獎時間#}'),
              value: `${formatTime(toBN(item.matchEndTime).toNumber())}`,
            },
          ]}
          {...item}
        />
      )}
    ></List>
  );
}
