import styles from './index.module.less';
import useTranslation from '@/hooks/useTranslation';

export default function Rule() {
  const { $t } = useTranslation();

  return (
    <div className={styles.rule}>
      {$t('rule')}
    </div>
  );
}
