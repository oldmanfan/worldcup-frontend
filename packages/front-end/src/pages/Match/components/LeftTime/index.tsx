import { useEffect, useState, memo } from 'react';
import useTranslation from '@/hooks/useTranslation';
import styles from './index.module.less';

interface LeftTimeProps {
  time: number;
  onEnd?: () => void;
}
const LeftTime = memo((props: LeftTimeProps) => {
  const [left, setLeft] = useState(0);
  const { $t } = useTranslation();

  useEffect(() => {
    const compute = () => {
      const curr = props.time * 1000 - Date.now();
      console.log('curr=', curr, props.time, Date.now());

      if (curr <= 1000) {
        setLeft(0);
        if (interval) {
          clearInterval(interval);
        }
        props.onEnd && props.onEnd();
      } else {
        setLeft(curr);
      }
    };
    const interval = setInterval(() => {
      compute();
    }, 1000);

    compute();

    return () => clearInterval(interval);
  }, [props.time]);

  return (
    <div className={styles.leftTime}>
      <label>{$t('{#倒計時#}')}:</label>
      <span>{left < 0 ? 0 : Math.floor(left / (1000 * 3600 * 24))}d:</span>
      <span>{left < 0 ? 0 : Math.floor((left % (1000 * 3600 * 24)) / (1000 * 3600))}h:</span>
      <span>{left < 0 ? 0 : Math.floor((left % (1000 * 3600)) / (1000 * 60))}m:</span>
      <span>{left < 0 ? 0 : Math.floor((left / 1000 % 60) )}s</span>
      {/* 6d 20h 56m */}
    </div>
  );
});

export default LeftTime;
