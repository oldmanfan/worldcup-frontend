import { Tabs } from 'antd';
import InProgressList from '../components/InProgressList';
import PastList from '../components/PastList';
import FutureList from '../components/FutureList';
import styles from './index.module.less';
import Banner from '@/components/Banner';
import useTranslation from '@/hooks/useTranslation'

export default function WorldCup() {
  const { $t } = useTranslation();
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
          <Tabs.TabPane tab={$t('{#正在進行#}')} key="inprogress">
            <InProgressList />
          </Tabs.TabPane>
          <Tabs.TabPane tab={$t('{#未來賽事#}')} key="future">
            <FutureList />
          </Tabs.TabPane>
          <Tabs.TabPane tab={$t('{#往期賽事#}')} key="past">
            <PastList />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}
