import styles from './index.module.less';
import { useMatches } from '@/hooks/useLens';
import { toFixed, sleep, getErrorMsg } from '@/utils';
import { toBN, toPow } from '@/utils/bn';
import { Button, message } from 'antd';
import { useState } from 'react';
import useWallet from '@/hooks/useWallet';
import useContractAddress from '@/hooks/useContractAddress';
import { makeQatarContract } from '@/hooks/useContract';
import useTranslation from '@/hooks/useTranslation';
import BannerTop from '@/components/Banner';

export default function Banner() {
  const { playerTotalInfo, getAllMatches } = useMatches();
  const [loading, setLoading] = useState(false);
  const { account, provider } = useWallet();
  const { contractAddress } = useContractAddress();
  const { $t } = useTranslation();

  const handleClaim = async () => {
    if (!playerTotalInfo?.playerTotalUnWithdraw) {
      message.error('There are no unclaimed rewards');
      return;
    }
    try {
      if (toBN(playerTotalInfo?.playerTotalUnWithdraw).eq(0)) {
        message.error('There are no extractable rewards');
        return;
      }
      if (!contractAddress) {
        message.error('Get contract address failed');
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
    } catch (error: any) {
      const msg = getErrorMsg(error, 'Claim Failed');
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BannerTop hideBg />
      {playerTotalInfo && (
        <div className={styles.bannerWrap}>
          <div className={styles.totalReward}>
            <div>
              <label>{$t('{#累計競猜價值#}')}(TT)</label>
              <span>
                {toFixed(
                  toBN(playerTotalInfo.playerTotalBetAmount)
                    .div(toPow(playerTotalInfo.token.decimals))
                    .toString(10),
                )}
              </span>
            </div>
            <Button loading={loading} onClick={handleClaim}>
              {$t('{#領取獎勵#}')}
            </Button>
          </div>
          <div className={styles.valueBox}>
            <div>
              <label>{$t('{#中獎#}')}</label>
              <span>
                {toFixed(
                  toBN(playerTotalInfo.playerTotalWinAmount)
                    .div(toPow(playerTotalInfo.token.decimals))
                    .toString(10),
                )}{' '}
                {playerTotalInfo.token.symbol}
              </span>
            </div>
            <div>
              <label>{$t('{#已領取#}')}</label>
              <span>
                {toFixed(
                  toBN(playerTotalInfo.playerTotalWithdraw)
                    .div(toPow(playerTotalInfo.token.decimals))
                    .toString(10),
                )}{' '}
                {playerTotalInfo.token.symbol}
              </span>
            </div>
            <div>
              <label>{$t('{#待領取#}')}</label>
              <span>
                {toFixed(
                  toBN(playerTotalInfo.playerTotalUnWithdraw)
                    .div(toPow(playerTotalInfo.token.decimals))
                    .toString(10),
                )}{' '}
                {playerTotalInfo.token.symbol}
              </span>
            </div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.valueBox}>
            <div>
              <label>{$t('{#參與次數#}')}</label>
              <span>{toBN(playerTotalInfo.playerTotalPartIn).toNumber()}</span>
            </div>
            <div>
              <label>{$t('{#中獎次數#}')}</label>
              <span>
                {toBN(playerTotalInfo.playerTotalWinTimes).toNumber()}
              </span>
            </div>
            <div>
              <label>{$t('{#收益率#}')}</label>
              <span>
                {toBN(playerTotalInfo.playerWinRate).isNaN()
                  ? '0'
                  : toFixed(
                      toBN(playerTotalInfo.playerWinRate).toString(10),
                    )}{' '}
                %
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
