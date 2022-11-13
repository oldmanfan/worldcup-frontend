import { useState } from 'react';
import TabBar from '@/components/TabBar';
import WorldCup from './WorldCup';
import MyPartIn from './MyPartIn';
import { useMatches } from '@/hooks/useLens';
import { CountriesById } from '@/constant/Countries';
import styles from './index.module.less';

export default function Home() {
  const [selected, setSelected] = useState('worldcup');
  return (
    <div className={styles.homePage}>
      {selected === 'worldcup' ? <WorldCup /> : <MyPartIn />}
      <TabBar
        onSelected={(key) => {
          setSelected(key);
        }}
      />
    </div>
  );
}
