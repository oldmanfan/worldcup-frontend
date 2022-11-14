import { Tabs } from 'antd';
import WinLoseMyPartIn from '../components/WinLoseMyPartIn';
import ScoreGuessMyPartIn from '../components/ScoreGuessMyPartIn';
import Banner from './components/Banner';
import styles from './index.module.less';
import useTranslation from '@/hooks/useTranslation';

export default function MyPartIn() {
  const { $t } = useTranslation();
  return (
    <div className={styles.myPartIn}>
      <div className={styles.banner}>
        <Banner />
      </div>
      <div className="tabs-wrap">
        <Tabs
          defaultActiveKey="inprogress"
          tabBarStyle={{
            width: '100%',
            height: '44px',
            backgroundColor: '#161D31',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          <Tabs.TabPane tab={$t('{#輸贏競猜#}')} key="inprogress">
            <WinLoseMyPartIn />
          </Tabs.TabPane>
          <Tabs.TabPane tab={$t('{#比分競猜#}')} key="past">
            <ScoreGuessMyPartIn />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}
