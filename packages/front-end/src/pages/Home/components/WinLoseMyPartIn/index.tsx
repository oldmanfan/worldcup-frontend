import { List } from 'antd';
import { useMatchStore } from '@/models';
import { formatTime, toFixed } from '@/utils';
import PlayerListItem from '@/components/PlayerListItem';
import { toBN, toPow } from '@/utils/bn';
import useTranslation from '@/hooks/useTranslation';

// 往期赛事
export default function WinLoseMyPartIn() {
  const { playerWinLoseRecords } = useMatchStore();
  const { $t } = useTranslation();

  if (!playerWinLoseRecords || playerWinLoseRecords.length < 1) {
    return (
      <div className="no-data">
        <i />
      </div>
    );
  }
  return (
    <List
      dataSource={playerWinLoseRecords}
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
              value: `${formatTime(toBN(item.matchEndTime).toNumber() * 1000)}`,
            },
          ]}
          {...item}
        />
      )}
    ></List>
  );
}
