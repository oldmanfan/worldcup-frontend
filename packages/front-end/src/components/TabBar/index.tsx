import React, { useState } from 'react';
import styles from './index.module.less';

type keyType = 'worldcup' | 'mypartin';

interface TabBarProps {
  onSelected: (selected: keyType) => void;
}
export default function TabBar(props: TabBarProps) {
  const { onSelected } = props;
  const [selected, setSelected] = useState<keyType>('worldcup');
  const tabs = [
    {
      key: 'worldcup',
      icon: '',
      name: '世界杯赛事',
    },
    {
      key: 'mypartin',
      icon: '',
      name: '我的参与',
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
