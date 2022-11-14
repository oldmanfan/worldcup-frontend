import { useEffect, useState } from 'react';
import styles from './index.module.less';
import useTranslation from '@/hooks/useTranslation';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, message } from 'antd';
import { ExclamationCircleFilled, RightOutlined } from '@ant-design/icons';
import useWallet from '@/hooks/useWallet';
import { useMatchStore } from '@/models';
import { CountriesById } from '@/constant/Countries';
import { GuessType } from '@/constant/GuessType';
import { BigNumberLike, toBN } from '@/utils/bn';
import BigNumber from 'bignumber.js';
import { onlyNumber, toFixed, sleep } from '@/utils';
import useToken from '@/hooks/useToken';
import { useMatches, useTopNRecords } from '@/hooks/useLens';
import { makeQatarContract, QatarContract } from '@/hooks/useContract';
import useContractAddress from '@/hooks/useContractAddress';
import { APPROVE_MAX, ScoreList } from '@/constant';
import useInvite from '@/hooks/useInvite';
import MyBet from '../MyBet';
import { MatchStatus } from '@/hooks/types';

interface ScoreFormProps {
  value: number;
  onChange: (value: number, label: string) => void;
}

interface OptionsProps {
  value: number | GuessType;
  label: string;
  desc: number | string;
}

function ScoreForm(props: ScoreFormProps) {
  const { $t } = useTranslation();
  const { currentMatch } = useMatchStore();
  const [options, setOptions] = useState<OptionsProps[]>(ScoreList);

  useEffect(() => {
    if (currentMatch) {
      const newOptions = currentMatch.scoreGuessPool.odds.map((item, index) => {
        let newOption = ScoreList[index];
        newOption.desc = toBN(item).toString(10);
        return newOption;
      });
      setOptions(newOptions);
    }
  }, [currentMatch]);

  return (
    <>
      {currentMatch && (
        <div className={styles['score-form']}>
          <div className={styles.title}>
            <div className={styles.left}>
              {CountriesById[currentMatch.countryA.toNumber()].zhName}
            </div>
            <div>{$t('{#平局#}')}</div>
            <div className={styles.right}>
              {CountriesById[currentMatch.countryB.toNumber()].zhName}
            </div>
          </div>
          <div className={styles.options}>
            {options.length > 0 &&
              options.map((item) => {
                return (
                  <a
                    key={item.value}
                    className={
                      item.value === props.value ? styles.selected : ''
                    }
                    onClick={() => props.onChange(item.value, item.label)}
                  >
                    <label>{item.label}</label>
                    <div>{toFixed(toBN(item.desc).div(1e18).toString())}</div>
                  </a>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}

interface WinLossFormProps {
  value: number;
  onChange: (value: number, label: string) => void;
}

function WinLossForm(props: WinLossFormProps) {
  const { $t, locale } = useTranslation();
  const { currentMatch } = useMatchStore();
  const [options, setOptions] = useState<OptionsProps[]>([]);

  useEffect(() => {
    if (currentMatch) {
      const odds: number[] =
        currentMatch.winlosePool.odds.map((item) =>
          toBN(item).div(1e18).toNumber(),
        ) || [];
      const countryA =
        locale === 'zh-hk'
          ? CountriesById[currentMatch.countryA.toNumber()].zhName
          : CountriesById[currentMatch.countryA.toNumber()].enName;
      const countryB =
        locale === 'zh-hk'
          ? CountriesById[currentMatch.countryB.toNumber()].zhName
          : CountriesById[currentMatch.countryB.toNumber()].enName;
      const options = [
        {
          value: GuessType.GUESS_WINLOSE_A_WIN,
          label: $t('{#%s勝#}').replace('%s', countryA),
          desc: odds[0],
        },
        {
          value: GuessType.GUESS_WINLOSE_DRAW,
          label: $t('{#平局#}'),
          desc: odds[1],
        },
        {
          value: GuessType.GUESS_WINLOSE_B_WIN,
          label: $t('{#%s勝#}').replace('%s', countryB),
          desc: odds[2],
        },
      ];
      setOptions(options);
      props.onChange(options[0].value, options[0].label);
    }
  }, [currentMatch]);

  return (
    <>
      {currentMatch && options.length > 0 && (
        <div className={styles['winloss-form']}>
          {options.map((item) => {
            return (
              <div
                key={`key${item.value}`}
                className={props.value === item.value ? styles.selected : ''}
                onClick={() => props.onChange(item.value, item.label)}
              >
                <label>{item.label}</label>
                <div>{toFixed(item.desc)}</div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export interface GuessOptions {
  type: number;
}

export default function Guess(props: GuessOptions) {
  const { $t } = useTranslation();
  const navigate = useNavigate();
  const [winLoss, setWinLoss] = useState<GuessType>(
    GuessType.GUESS_WINLOSE_A_WIN,
  );
  const [selectedLabel, setSelectedLabel] = useState('');
  const [score, setScore] = useState<number>(1);
  const { getAllMatches } = useMatches();
  const { connect, account, provider } = useWallet();
  const { contractAddress } = useContractAddress();
  const [qatarContract, setQatarContract] = useState<
    QatarContract | undefined
  >();
  // 按钮loading
  const [loading, setLoading] = useState(false);
  // 总奖池
  const [eachDeposited, setEachDeposited] = useState<BigNumberLike[]>([]);
  const [reward, setReward] = useState<BigNumberLike>(new BigNumber(0));
  const { balance: ttBalance, allowance, contract: ttContract } = useToken();
  const { currentMatch } = useMatchStore();
  const [inputValue, setInputValue] = useState('0');
  const [fee, setFee] = useState('0');
  const { getTopNRecords } = useTopNRecords();
  const { setRelationship } = useInvite();

  useEffect(() => {
    if (account && provider && contractAddress) {
      const qatarContract = makeQatarContract(
        contractAddress.qatar,
        provider,
        account,
      );
      setQatarContract(qatarContract);
    }
  }, [account, provider, contractAddress]);

  useEffect(() => {
    if (currentMatch) {
      getTopNRecords(currentMatch.matchId.toNumber(), props.type - 1);
    }
  }, [props.type]);

  useEffect(() => {
    if (currentMatch) {
      getTopNRecords(currentMatch.matchId.toNumber(), props.type - 1);
      let records = [];
      if (props.type === 1) {
        // 猜输赢
        setEachDeposited(currentMatch.winlosePool.eachDeposited);
        records = currentMatch.winloseRecords;
      } else {
        // 猜比分
        setEachDeposited(currentMatch.scoreGuessPool.eachDeposited);
        records = currentMatch.scoreGuessRecords;
      }

      // 计算回报
      let totalReward = new BigNumber(0);
      for (const record of records) {
        totalReward = record.win
          ? totalReward.plus(
              toBN(record.odds).multipliedBy(toBN(record.betAmount)),
            )
          : totalReward;
      }
      setReward(totalReward);
    }
  }, [currentMatch]);

  useEffect(() => {
    // 计算预计可赢得
    const odd = currentMatch?.winlosePool.odds[Number(winLoss) - 27];
    const reward = toBN(inputValue).multipliedBy(toBN(odd).div(1e18));
    // 计算手续费
    const fee = toBN(inputValue).multipliedBy(0.03).toString();
    setInputValue(inputValue);
    setReward(reward);
    setFee(fee);
  }, [inputValue, winLoss, score]);

  const handleInput = (value: string) => {
    const betValue = onlyNumber({
      num: value,
      decimals: 18,
      max: ttBalance.div(1e18).toString(),
    });
    setInputValue(betValue);
    setFee(fee);
  };

  const handleGuess = async () => {
    if (!qatarContract) {
      message.error('Contract not init complate!');
      return;
    }
    if (!currentMatch) {
      message.error('get match info failed');
      return;
    }
    setLoading(true);
    try {
      // set invitation relationship
      setRelationship(account);
      // bet
      const guessType = props.type === 1 ? Number(winLoss) : score;
      const amount = toBN(inputValue).multipliedBy(1e18);
      // 检查allowance
      if (allowance.lt(amount)) {
        const tx = await ttContract?.approve(
          contractAddress.qatar,
          APPROVE_MAX,
        );
        await tx?.wait();
      }
      const tx = await qatarContract.guess(
        currentMatch?.matchId.toNumber(),
        guessType,
        amount.toString(),
      );
      await tx.wait();
      message.success('Bet success');
      await sleep();
      setInputValue('0');
      getAllMatches();
      getTopNRecords(currentMatch.matchId.toNumber(), props.type - 1);
    } catch (error) {
      message.error(error.message || 'bet failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAll = () => {
    setInputValue(ttBalance.div(1e18).toString());
  };

  const getForm = () => {
    if (!currentMatch) return <></>;
    if (currentMatch.status === MatchStatus.MATCH_FINISHED) return <></>;
    return props.type === 1 ? (
      <WinLossForm
        value={Number(winLoss)}
        onChange={(value, label) => {
          setWinLoss(value);
          setSelectedLabel(label);
        }}
      />
    ) : (
      <ScoreForm
        value={score}
        onChange={(value, label) => {
          setScore(value);
          setSelectedLabel(label);
        }}
      />
    );
  };

  return (
    <>
      {currentMatch && (
        <div className={styles.guess}>
          <h3>{$t('{#輸贏總獎池#}')}</h3>
          <div className={styles.total}>
            ${' '}
            {props.type === 1
              ? toBN(currentMatch.winlosePool.deposited).div(1e18).toString()
              : toBN(currentMatch.scoreGuessPool.deposited)
                  .div(1e18)
                  .toString()}
          </div>

          {/* Form表单 */}
          {getForm()}

          {/* 竞猜操作区域 */}
          {currentMatch.status !== MatchStatus.MATCH_FINISHED && (
            <div>
              <div className={styles.formItem}>
                <label>
                  {' '}
                  {props.type === 1
                    ? $t('{#當前%s總參投金額#}').replace('%s', selectedLabel)
                    : $t('{#當前%s參投金額#}').replace('%s', selectedLabel)}
                  :
                </label>
                {eachDeposited.length > 0 && (
                  <div>
                    ${' '}
                    {props.type === 1
                      ? toFixed(
                          toBN(eachDeposited[Number(winLoss) - 27])
                            .div(1e18)
                            .toString(),
                        )
                      : toFixed(
                          toBN(eachDeposited[Number(score) - 1])
                            .div(1e18)
                            .toString(),
                        )}
                  </div>
                )}
              </div>
              <div className={styles.formItem}>
                <label>{$t('{#回報率#}')}:</label>
                <div>
                  {props.type === 1
                    ? toFixed(
                        toBN(
                          currentMatch.winlosePool.odds[Number(winLoss) - 27],
                        )
                          .div(1e18)
                          .toString(),
                      )
                    : toFixed(
                        toBN(currentMatch.scoreGuessPool.odds[score - 1])
                          .div(1e18)
                          .toString(),
                      )}
                </div>
              </div>
              <div className={styles.split} />
              <div className={styles.input}>
                <div>
                  <i />
                </div>
                <input
                  type="text"
                  placeholder={$t('{#輸入TT參與競猜#}')}
                  value={inputValue}
                  onChange={(value) => handleInput(value.target.value)}
                />
                <button onClick={handleAll}>ALL</button>
              </div>
              <div className={styles.balance}>
                {toFixed(ttBalance.div(1e18).toString())} TT
              </div>
              {/* <div className={styles.error}>
                <ExclamationCircleFilled />
                <span>当前余额不足，去充值</span>
                <RightOutlined />
              </div> */}
              <div className={styles.formItem}>
                <label>{$t('{#預盈可得#}')}</label>
                <div className={styles.primary}>
                  {toFixed(reward.toString())} TT
                </div>
              </div>
              <div className={styles.formItem}>
                <label>{$t('{#手續費#}')}</label>
                <div className={styles.grey}> {toFixed(fee)} TT</div>
              </div>
              <Button
                loading={loading}
                type="primary"
                className={styles.btn}
                onClick={handleGuess}
              >
                {$t('{#參與競猜#}')}
              </Button>
            </div>
          )}

          {!account && (
            <Button
              type="primary"
              className={styles.btn}
              onClick={() => connect()}
            >
              {$t('{#連接錢包#}')}
            </Button>
          )}
          <MyBet active={props.type} />
        </div>
      )}
    </>
  );
}
