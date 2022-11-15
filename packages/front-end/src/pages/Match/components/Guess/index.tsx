import { useEffect, useState } from 'react';
import styles from './index.module.less';
import useTranslation from '@/hooks/useTranslation';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { Button, message } from 'antd';
import { ExclamationCircleFilled, RightOutlined } from '@ant-design/icons';
import useWallet from '@/hooks/useWallet';
import { useMatchStore } from '@/models';
import { CountriesById } from '@/constant/Countries';
import { GuessType } from '@/constant/GuessType';
import { BigNumberLike, toBN } from '@/utils/bn';
import BigNumber from 'bignumber.js';
import { onlyNumber, toFixed, sleep } from '@/utils';
// import useToken from '@/hooks/useToken';
import { useMatches, useTopNRecords } from '@/hooks/useLens';
import { makeQatarContract, QatarContract } from '@/hooks/useContract';
import useContractAddress from '@/hooks/useContractAddress';
import { APPROVE_MAX, ScoreList } from '@/constant';
import useInvite from '@/hooks/useInvite';
import MyBet from '../MyBet';
import { BetRecord, MatchStatus, Token } from '@/hooks/types';
import { makeERC20Contract } from '@/hooks/useContract';
import LeftTime from '../LeftTime';
import { getPrice } from '@/api';
import ScoreForm from './components/ScoreForm';
import WinLossForm from './components/WinLossForm';
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
  const { connect, account, provider, chainId } = useWallet();
  const { contractAddress } = useContractAddress();
  const [qatarContract, setQatarContract] = useState<
    QatarContract | undefined
  >();
  // 按钮loading
  const [loading, setLoading] = useState(false);
  // 显示倒计时
  const [showLeftTime, setShowLeftTime] = useState(false);
  // 总奖池
  const [eachDeposited, setEachDeposited] = useState<BigNumberLike[]>([]);
  const [reward, setReward] = useState<BigNumberLike>(new BigNumber(0));
  // const { balance: ttBalance, allowance, contract: ttContract } = useToken();
  const [ttBalance, setTTBalance] = useState(toBN(0));
  const { currentMatch } = useMatchStore();
  const [token, setToken] = useState<Token | undefined>();
  const [inputValue, setInputValue] = useState('0');
  // tt的价格
  const [ttPrice, setTTPrice] = useState<number>(0);
  const [fee, setFee] = useState('0');
  const { getTopNRecords } = useTopNRecords();
  const { reportBet } = useInvite();
  const [showBetOption, setShowBetOption] = useState(false);
  const [claimedReward, setClaimedReward] = useState<BetRecord | undefined>();
  const [claimLoading, setClaimLoading] = useState(false);

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

  // 查询账户余额
  useEffect(() => {
    const getData = async () => {
      if (account && provider && token) {
        const ttContract = makeERC20Contract(token.address, provider, account);
        const balance = await ttContract.balanceOf(account);
        setTTBalance(toBN(balance));
      }
    };

    getData();
  }, [account, provider, token]);

  useEffect(() => {
    if (currentMatch) {
      getTopNRecords(currentMatch.matchId.toNumber(), props.type - 1);
    }
  }, [props.type, currentMatch]);

  useEffect(() => {
    if (currentMatch) {
      // 检查奖励是否已领取
      setClaimedReward(undefined);
      if (props.type === 1) {
        currentMatch.winloseRecords.map((item) => {
          // if (item.win && item.claimedAmount.eq(0)) {
          //   setClaimedReward(item);
          // }
          if (item.win) {
            setClaimedReward(item);
          }
        });
      } else {
        currentMatch.scoreGuessRecords.map((item) => {
          // if (item.win && item.claimedAmount.eq(0)) {
          //   setClaimedReward(item);
          // }
          if (item.win) {
            setClaimedReward(item);
          }
        });
      }
      console.log('claimed reward', claimedReward, props.type);

      const token: Token = {
        address: currentMatch.payToken,
        name: currentMatch.payTokenName,
        decimals: currentMatch.payTokenDecimals.toNumber(),
        symbol: currentMatch.payTokenSymbol,
      };
      setToken(token);

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
      // 未开始 按钮显示倒计时
      if (currentMatch.status === 0) {
        setShowLeftTime(true);
      }
      // 获取价格
      getPrice().then(setTTPrice);
    }
  }, [currentMatch, props.type]);

  useEffect(() => {
    // 计算预计可赢得
    const odd = currentMatch?.winlosePool.odds[Number(winLoss) - 27];
    const reward = odd ? toBN(inputValue).multipliedBy(toBN(odd).div(1e18)) : 0;
    // 计算手续费
    const fee = toBN(inputValue).multipliedBy(0.03).toString(10);
    setInputValue(inputValue);
    setReward(reward);
    setFee(fee);
  }, [inputValue, winLoss, score]);

  const handleInput = (value: string) => {
    const betValue = onlyNumber({
      num: value,
      decimals: 18,
      max: ttBalance.div(1e18).toString(10),
    });
    setInputValue(betValue);
    setFee(fee);
  };

  useEffect(() => {
    if (currentMatch) {
      if (currentMatch.status === MatchStatus.GUESS_ON_GOING) {
        setShowBetOption(true);
      } else {
        setShowBetOption(false);
      }
    }
  }, [currentMatch]);

  const handleGuess = async () => {
    if (!qatarContract) {
      message.error('Contract not init complate!');
      return;
    }
    if (!currentMatch) {
      message.error('get match info failed');
      return;
    }
    if (!token) {
      message.error('token not get');
      return;
    }
    const ttContract = makeERC20Contract(token.address, provider, account);
    setLoading(true);
    try {
      // bet
      const guessType = props.type === 1 ? Number(winLoss) : score;
      const amount = toBN(inputValue).multipliedBy(
        toBN(10).pow(token.decimals),
      );
      // 检查allowance
      const allowance = await ttContract.allowance(
        account,
        qatarContract.address,
      );
      // 检查allowance
      if (toBN(allowance).lt(amount)) {
        const tx = await ttContract?.approve(
          contractAddress.qatar,
          APPROVE_MAX,
        );
        await tx?.wait();
      }
      const tx = await qatarContract.guess(
        currentMatch?.matchId.toNumber(),
        guessType,
        amount.toString(10),
      );
      await tx.wait();
      message.success('Bet success');
      // 上报记录
      reportBet({
        chainId: chainId || 0,
        wallet: account,
        matchId: currentMatch?.matchId.toNumber().toString(),
        guessType: guessType?.toString() || '',
        betAmount: amount.toString(10),
        betTime: tx.timestamp?.toString() || Date.now().toString(),
        // 逻辑里面处理，是否存在referralCode，没丢弃
        referralCode: '',
        txHash: tx.hash,
      });
      await sleep();
      setInputValue('0');
      getAllMatches();
      getTopNRecords(currentMatch.matchId.toNumber(), props.type - 1);
    } catch (error: any) {
      message.error(error.message || 'bet failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAll = () => {
    setInputValue(ttBalance.div(1e18).toString(10));
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

  const handleClaim = async () => {
    try {
      console.log({ qatarContract });
      if (qatarContract && currentMatch && claimedReward) {
        setClaimLoading(true);

        const tx = await qatarContract.claimReward(
          toBN(currentMatch.matchId).toString(10),
          toBN(claimedReward.betId).toString(10),
        );
        await tx.wait();
        // 刷新数据
        getAllMatches();
        message.success('claim success');
        setClaimedReward(undefined);
      }
    } catch (error) {
      message.error('Claim Failed');
    } finally {
      setClaimLoading(false);
    }
  };

  // TODO: 判断是u还是tt, 是tt才需要乘以ttPrice
  //  总奖池
  const totalPool = currentMatch
    ? props.type === 1
      ? toBN(currentMatch.winlosePool.deposited)
          .div(1e18)
          .multipliedBy(ttPrice || 1)
          .toString(10)
      : toBN(currentMatch.scoreGuessPool.deposited)
          .div(1e18)
          .multipliedBy(ttPrice || 1)
          .toString(10)
    : '0';

  return (
    <>
      {currentMatch && (
        <div className={styles.guess}>
          <h3>
            {props.type === 1 ? $t('{#輸贏總獎池#}') : $t('{#比分總獎池#}')}
          </h3>
          <div className={styles.total}>
            <span style={{ marginRight: 2 }}>$</span>
            <span>
              {Number(totalPool) > 0 ? Number(totalPool).toFixed(2) : 0}
            </span>
          </div>

          {/* 检查奖励是否已领取 */}
          {currentMatch.status === MatchStatus.MATCH_FINISHED && (
            <div className={styles.winInfo}>
              <p>{$t('{#盈得#}')}</p>
              <div>
                <span>
                  <strong>
                    {(claimedReward &&
                      toBN(claimedReward.betAmount)
                        .multipliedBy(toBN(claimedReward.odds).div(1e18))
                        .div(1e18)
                        .toString()) ||
                      0}{' '}
                    {token && token?.symbol}
                  </strong>
                </span>
                {/* 选中输赢奖池 */}
                {claimedReward && claimedReward.claimedAmount.eq(0) ? (
                  <Button
                    type="primary"
                    onClick={handleClaim}
                    loading={claimLoading}
                  >
                    {$t('{#領取獎勵#}')}
                  </Button>
                ) : (
                  <Button type="primary" disabled>
                    {$t('{#已領取#}')}
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Form表单 */}
          {showBetOption && getForm()}

          {/* 竞猜操作区域 */}
          {showBetOption && (
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
                            .toString(10),
                        )
                      : toFixed(
                          toBN(eachDeposited[Number(score) - 1])
                            .div(1e18)
                            .toString(10),
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
                          .toString(10),
                      )
                    : toFixed(
                        toBN(currentMatch.scoreGuessPool.odds[score - 1])
                          .div(1e18)
                          .toString(10),
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
                {toFixed(ttBalance.div(1e18).toString(10))} {token?.symbol}
              </div>
              {/* <div className={styles.error}>
                <ExclamationCircleFilled />
                <span>当前余额不足，去充值</span>
                <RightOutlined />
              </div> */}
              <div className={styles.formItem}>
                <label>{$t('{#預盈可得#}')}</label>
                <div className={styles.primary}>
                  {toFixed(reward.toString(10))} {token?.symbol}
                </div>
              </div>
              <div className={styles.formItem}>
                <label>{$t('{#手續費#}')}</label>
                <div className={styles.grey}>
                  {' '}
                  {toFixed(fee)} {token?.symbol}
                </div>
              </div>
              {showLeftTime ? (
                <Button
                  disabled
                  type="primary"
                  className={styles.btn}
                  onClick={handleGuess}
                >
                  <LeftTime
                    time={currentMatch.matchEndTime.toNumber()}
                    onEnd={() => setShowLeftTime(false)}
                  />
                </Button>
              ) : (
                <Button
                  loading={loading}
                  type="primary"
                  className={styles.btn}
                  onClick={handleGuess}
                >
                  {$t('{#參與競猜#}')}
                </Button>
              )}
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
          {currentMatch.status !== MatchStatus.MATCH_FINISHED && (
            <MyBet active={props.type} />
          )}
        </div>
      )}
    </>
  );
}
