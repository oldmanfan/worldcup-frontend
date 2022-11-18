import { List } from 'antd';
import { useMatchStore } from '@/models';
import { formatTime, toFixed } from '@/utils';
import PlayerListItem from '@/components/PlayerListItem';
import { toBN, toPow } from '@/utils/bn';
import useTranslation from '@/hooks/useTranslation';
import { CountriesById } from '@/constant/Countries';
import { GuessType } from '@/constant/GuessType';

// 往期赛事
export default function WinLoseMyPartIn() {
  const { playerWinLoseRecords } = useMatchStore();
  const { $t, locale } = useTranslation();

  if (!playerWinLoseRecords || playerWinLoseRecords.length < 1) {
    return (
      <div className="no-data">
        <i />
      </div>
    );
  }
  console.log('playerWinLoseRecords=', playerWinLoseRecords)
  return (
    <List
      dataSource={playerWinLoseRecords}
      renderItem={(item, index) => {
        let guessDesc = '';
        if (item.guessType.toNumber() === GuessType.GUESS_WINLOSE_DRAW) {
          guessDesc = $t("{#平局#}");
        } else {
          const countryId = item.guessType.toNumber() === GuessType.GUESS_WINLOSE_A_WIN
            ? item.countryA.toNumber()
            : item.countryB.toNumber();
          const countryName = locale === 'zh-hk'
            ? CountriesById[countryId].zhName
            : CountriesById[countryId].enName
          guessDesc = $t("{#%s勝#}").replace('%s', countryName)
        }
        return (
          <PlayerListItem
            rows={[
              {
                name: $t('{#我的競猜#}'),
                value: guessDesc,
              },
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
                value: `${formatTime(item.matchEndTime.toNumber())}`,
              },
            ]}
            {...item}
          />
        )
      }}
    ></List>
  );
}
