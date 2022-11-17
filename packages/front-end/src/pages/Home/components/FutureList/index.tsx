import { List } from 'antd';
import ListItem from '@/components/ListItem';
import { useMatches } from '@/hooks/useLens';
import { formatTime } from '@/utils';
import useTranslation from '@/hooks/useTranslation';
import { toBN, toPow } from '@/utils/bn';

// 未来赛事
export default function FutureList() {
  const { notStartMatches } = useMatches();
  const { $t } = useTranslation();
  if (!notStartMatches || notStartMatches.length < 1) {
    return (
      <div className="no-data">
        <i />
      </div>
    );
  }
  return (
    <List
      dataSource={notStartMatches}
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
              value: $t('{#%s 人#}').replace('%s', item.totalPlayers as string),
              // value: `${item.totalPlayers} 人`,
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
