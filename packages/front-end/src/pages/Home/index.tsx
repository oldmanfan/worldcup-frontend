import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import TabBar, { keyType } from '@/components/TabBar';
import WorldCup from './WorldCup';
import MyPartIn from './MyPartIn';
import { useMatches } from '@/hooks/useLens';
import { CountriesById } from '@/constant/Countries';
import styles from './index.module.less';

function getTabName(tab: string | null): keyType {
  if (!tab) {
    return 'worldcup';
  }
  return ['21', '22'].indexOf(tab) > -1 ? 'mypartin' : 'worldcup'
}

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState<keyType>(getTabName(searchParams.get('tab')));
  // console.log('searchParams==', searchParams.get('tab'));

  useEffect(() => {
    setSelected(getTabName(searchParams.get('tab')))
  }, [searchParams])

  return (
    <div className={styles.homePage}>
      {selected === 'worldcup' ? <WorldCup /> : <MyPartIn />}
      <TabBar
        active={selected}
        onSelected={(key) => {
          setSearchParams({ tab: key === 'mypartin' ? '21' : '' });
        }}
      />
    </div>
  );
}
