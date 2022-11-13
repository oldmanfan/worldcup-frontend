import { Tabs } from 'antd';
import InProgressList from '../components/InProgressList';
import PastList from '../components/PastList';
import FutureList from '../components/FutureList';
import styles from './index.module.less';
import Banner from '@/components/Banner';

export default function WorldCup() {
  return (
    <div className={styles.worldCup}>
      <Banner />
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
          <Tabs.TabPane tab="正在进行" key="inprogress">
            <InProgressList />
          </Tabs.TabPane>
          <Tabs.TabPane tab="未来赛事" key="future">
            <FutureList />
          </Tabs.TabPane>
          <Tabs.TabPane tab="往期赛事" key="past">
            <PastList />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}
