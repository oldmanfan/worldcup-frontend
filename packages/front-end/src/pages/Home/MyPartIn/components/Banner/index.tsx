import styles from './index.module.less';
import { useMatches } from '@/hooks/useLens';
import { toFixed, sleep } from '@/utils';
import { toBN } from '@/utils/bn';
import { Button, message } from 'antd';
import { useState } from 'react';
import useWallet from '@/hooks/useWallet';
import useContractAddress from '@/hooks/useContractAddress';
import { makeQatarContract } from '@/hooks/useContract';
export default function Banner() {
  const { playerTotalInfo, getAllMatches } = useMatches();
  const [loading, setLoading] = useState(false);
  const { account, provider } = useWallet();
  const { contractAddress } = useContractAddress();

  const handleClaim = async () => {
    try {
      if (toBN(playerTotalInfo?.playerTotalUnWithdraw).eq(0)) {
        message.error('There are no extractable rewards');
        return;
      }
      setLoading(true);
      const contract = makeQatarContract(
        contractAddress.qatar,
        provider,
        account,
      );
      const tx = await contract.claimAllRewards();
      await tx.wait();
      await sleep();
      getAllMatches();
      message.success('Claim Success');
    } catch (error) {
      message.error(error.message || 'Claim Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {playerTotalInfo && (
        <div className={styles.bannerWrap}>
          <div className={styles.totalReward}>
            <div>
              <label>累計競猜價值(TT)</label>
              <span>
                {toFixed(
                  toBN(playerTotalInfo.playerTotalBetAmount)
                    .div(1e18)
                    .toString(),
                )}
              </span>
            </div>
            <Button loading={loading} onClick={handleClaim}>
              領取獎勵
            </Button>
          </div>
          <div className={styles.valueBox}>
            <div>
              <label>中奖</label>
              <span>
                {toFixed(
                  toBN(playerTotalInfo.playerTotalWinAmount)
                    .div(1e18)
                    .toString(),
                )}{' '}
                TT
              </span>
            </div>
            <div>
              <label>已领取</label>
              <span>
                {toFixed(
                  toBN(playerTotalInfo.playerTotalWithdraw)
                    .div(1e18)
                    .toString(),
                )}{' '}
                TT
              </span>
            </div>
            <div>
              <label>待领取</label>
              <span>
                {toFixed(
                  toBN(playerTotalInfo.playerTotalUnWithdraw)
                    .div(1e18)
                    .toString(),
                )}{' '}
                TT
              </span>
            </div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.valueBox}>
            <div>
              <label>參與次數</label>
              <span>{toBN(playerTotalInfo.playerTotalPartIn).toNumber()}</span>
            </div>
            <div>
              <label>中獎次數</label>
              <span>
                {toBN(playerTotalInfo.playerTotalWinTimes).toNumber()}
              </span>
            </div>
            <div>
              <label>收益率</label>
              <span>
                {toFixed(
                  toBN(playerTotalInfo.playerWinRate).div(1e18).toString(),
                )}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
