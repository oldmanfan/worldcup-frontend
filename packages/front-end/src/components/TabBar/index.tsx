import React, { useState } from 'react';
import styles from './index.module.less';
import useTranslation from '@/hooks/useTranslation';

type keyType = 'worldcup' | 'mypartin';

interface TabBarProps {
  onSelected: (selected: keyType) => void;
}
export default function TabBar(props: TabBarProps) {
  const { onSelected } = props;
  const [selected, setSelected] = useState<keyType>('worldcup');
  const { $t } = useTranslation();

  const tabs = [
    {
      key: 'worldcup',
      icon: '',
      name: $t('{#世界盃賽事#}'),
    },
    {
      key: 'mypartin',
      icon: '',
      name: $t('{#我的參與#}'),
    },
  ];

  const handleSelect = (key: keyType) => {
    setSelected(key);
    onSelected(key);
  };

  return (
    <div className={styles.tabbar}>
      <ul>
        {tabs.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => handleSelect(item.key as keyType)}
              className={`${item.key === selected ? styles.selected : ''}`}
            >
              <i className={`icon-${item.key}`}></i>
              <span>{item.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
