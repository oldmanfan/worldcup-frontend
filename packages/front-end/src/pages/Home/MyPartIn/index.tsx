import { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { useSearchParams } from "react-router-dom";
import WinLoseMyPartIn from '../components/WinLoseMyPartIn';
import ScoreGuessMyPartIn from '../components/ScoreGuessMyPartIn';
import Banner from './components/Banner';
import styles from './index.module.less';
import useTranslation from '@/hooks/useTranslation';

const getTab = (tab: string) => ['21', '22'].includes(tab) ? tab : '11';

export default function MyPartIn() {
  const { $t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState<string>(getTab(searchParams.get('tab') || ''));

  useEffect(() => {
    setSelected(getTab(searchParams.get('tab') || ''))
  }, [searchParams]);

  return (
    <div className={styles.myPartIn}>
      <div className={styles.banner}>
        <Banner />
      </div>
      <div className="tabs-wrap">
        <Tabs
          activeKey={selected}
          defaultActiveKey="inprogress"
          tabBarStyle={{
            width: '100%',
            height: '44px',
            backgroundColor: '#161D31',
            color: 'rgba(255,255,255,0.4)',
          }}
          onChange={(value) => {
            setSearchParams({ tab: value });
          }}
        >
          <Tabs.TabPane tab={$t('{#輸贏競猜#}')} key="21">
            <WinLoseMyPartIn />
          </Tabs.TabPane>
          <Tabs.TabPane tab={$t('{#比分競猜#}')} key="22">
            <ScoreGuessMyPartIn />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}
