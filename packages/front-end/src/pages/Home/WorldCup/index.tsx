import { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { useSearchParams } from "react-router-dom";
import InProgressList from '../components/InProgressList';
import PastList from '../components/PastList';
import FutureList from '../components/FutureList';
import styles from './index.module.less';
import Banner from '@/components/Banner';
import useTranslation from '@/hooks/useTranslation'
import {useMatches} from "@/hooks/useLens";

const getTab = (tab: string) => ['11', '12', '13'].includes(tab) ? tab : '11';

export default function WorldCup() {
  const { $t } = useTranslation();
  const { onGoingMatches } = useMatches();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState<string>(getTab(searchParams.get('tab') || ''));

  useEffect(() => {
    if (selected === '11' && onGoingMatches.length === 0) {
      setSelected('12')
    }
  }, [onGoingMatches])

  useEffect(() => {
    setSelected(getTab(searchParams.get('tab') || ''))
  }, [searchParams]);


  return (
    <div className={styles.worldCup}>
      <Banner />
      <div className="tabs-wrap">
        <Tabs
          activeKey={selected}
          // defaultActiveKey="inprogress"
          tabBarStyle={{
            width: '100%',
            height: '44px',
            backgroundColor: '#27335D',
            color: 'rgba(255,255,255,0.4)',
          }}
          onChange={(value) => {
            setSearchParams({ tab: value });
          }}
        >
          <Tabs.TabPane tab={$t('{#正在進行#}')} key="11">
            <InProgressList />
          </Tabs.TabPane>
          <Tabs.TabPane tab={$t('{#未來賽事#}')} key="12">
            <FutureList />
          </Tabs.TabPane>
          <Tabs.TabPane tab={$t('{#往期賽事#}')} key="13">
            <PastList />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}
