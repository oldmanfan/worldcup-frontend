import styles from './index.module.less';
import useTranslation from '@/hooks/useTranslation';

export default function Rule() {
  const { locale } = useTranslation();

  return (
    <div className={styles.rule}>
      {locale === 'zh-hk' ? (
        <div className={styles.content}>
          <h2>比赛规则</h2>
          <p>
            1. 在规定的下注时间选择你支持的球队进行下注即可！<br />
            2.下注分为猜输赢和猜比分，根据你下注池子的赔率决定赢的金额倍数；
          </p>
          <h2>下注时间</h2>
          <p>
            开始下注时间：开赛前六个小时；<br />
            结束下注时间：开赛前十分钟；<br />
            开奖时间：以实际时间为准；
          </p>
          <h2>赔率怎么计算？</h2>
          <p>
            1. 胜赔率=三个池的总价值 ÷ 胜利池的价值<br />
            2. 负赔率=三个池的总价值 ÷ 负池的价值<br />
            3. 平赔率=三个池的总价值 ÷ 平池的价值
          </p>
          <h2>使用什么下注？</h2>
          <p>
            HECO：使用TT下注<br />
            BSC：使用USDT下注
          </p>
          <h2>举例</h2>
          <p>
            1. 如果一场比赛结束，胜利池有100TT，三个池子总奖池有10000TT，则胜利的赔率是10000/100=100 X<br />
            2. 有百分之三的国库费哦；<br />
            3. 如果你在HECO链下注了100TT，该池子的赔率是80X，你就可以赢取（100*80）*（1-0.03）=776TT（具体赔率需要根据实际情况计算）。
          </p>
        </div>) : (
          <div className={styles.content}>
            <h2>Competition rules</h2>
            <p>
              1. Choose the team you support to bet at the betting time!<br />
              2. Betting is divided into guessing wins and losses & guessing the score. The prize you may win is determined according to the odds of your betting pool;
            </p>
            <h2>Betting time</h2>
            <p>
              Start betting time: six hours before the start of the game;<br />
              End betting time: 10 minutes before the game starts;<br />
              Draw time: right after the end of the competition;
            </p>
            <h2>How are the odds calculated?</h2>
            <p>
              1. Winning odds = total value of the three pools ÷ value of the winning pool<br />
              2. Negative odds = the total value of the three pools ÷ the value of the negative pool<br />
              3. Even odds = total value of the three pools ÷ value of the even pool<br />
            </p>
            <h2>What token?</h2>
            <p>
              HECO: Bet with TT<br />
              BSC: Bet with USDT<br />
            </p>
            <h2>Example</h2>
            <p>
              1. If a game is over, the victory pool has 100TT, and the total prize pool of the three pools is 10000TT, then the odds of victory are 10000/100=100x;<br />
              2. There is a 3% fee;<br />
              3. If you bet 100TT on the HECO chain, and the odds of this pool are 80x, you can win (100*80)*(1-0.03)=776TT (the specific odds need to be calculated according to the actual situation).
            </p>
        </div>
      )}
    </div>
  );
}
