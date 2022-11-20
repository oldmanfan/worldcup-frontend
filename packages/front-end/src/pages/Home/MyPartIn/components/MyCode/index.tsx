import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import styles from './index.module.less';
import cls from 'classnames';
import useTranslation from '@/hooks/useTranslation';
import useInvite from '@/hooks/useInvite';

export default function MyCode() {
  const [showShare, setShowShare] = useState(false);
  const { $t, locale } = useTranslation();
  const { setRelationship, getReferralCode } = useInvite();
  const [inputValue, setInputValue]= useState<string>('');

  const code = getReferralCode();

  // console.log('code===', code);

  const handleOk = async () => {
    if (!code && inputValue) {
      const status = await setRelationship(inputValue);
      console.log('status=', status);
      if (status === 3) {
        message.error($t("{#邀請碼不存在#}"));
        return;
      }
    }
    setShowShare(false);
  };

  useEffect(() => {
    if (showShare) {
      document.body.classList.add(styles['hidden-overflow']);
    } else {
      document.body.classList.remove(styles['hidden-overflow']);
    }
    return () => document.body.classList.remove(styles['hidden-overflow']);
  }, [showShare]);

  return (
    <div className={styles.code}>
      <i className={cls(styles.icon, { [styles.done]: !!code, [styles.zh]: locale === 'zh-hk' })}
        onClick={() => setShowShare(true)}
      />
      {showShare && (
        <div className={styles.modal}>
          <div className={styles.mask} onClick={() => setShowShare(false)} />
          <div className={styles.content}>
            <h3>{$t('{#邀請碼#}')}</h3>
            {code ? (<p>{code}</p>) : (
              <input
                type="text"
                maxLength={20}
                placeholder={$t('{#請輸入邀請碼#}')}
                onInput={(e: any) => setInputValue(e.target.value.trim())}
              />
            )}
            <button onClick={() => handleOk()}>{$t('{#確定#}')}</button>
          </div>
        </div>
      )}
    </div>
  );
}
