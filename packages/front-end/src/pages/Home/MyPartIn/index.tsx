import { Tabs } from 'antd';
import WinLoseMyPartIn from '../components/WinLoseMyPartIn';
import ScoreGuessMyPartIn from '../components/ScoreGuessMyPartIn';
import Banner from './components/Banner';
import styles from './index.module.less';

export default function MyPartIn() {
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
            backgroundColor: '#27335D',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          <Tabs.TabPane tab="输赢竞猜" key="inprogress">
            <WinLoseMyPartIn />
          </Tabs.TabPane>
          <Tabs.TabPane tab="比分竞猜" key="past">
            <ScoreGuessMyPartIn />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}
