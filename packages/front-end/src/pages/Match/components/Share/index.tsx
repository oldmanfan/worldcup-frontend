import { useState, useEffect } from 'react';
import copy from 'copy-to-clipboard';
import cls from 'classnames';
import useTranslation from '@/hooks/useTranslation';
import styles from './index.module.less';
import { delay } from '@/utils';
import { getInviteCode } from '@/api';
import useWallet from '@/hooks/useWallet';

export default function Share() {
  const { $t, locale } = useTranslation();
  const [showShare, setShowShare] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [inviteCode, setInviteCode] = useState<string>('');
  const { account } = useWallet();

  const shareUrl = inviteCode ? `${location.origin}?invite=${inviteCode}` : location.origin;

  useEffect(() => {
    const queryCode = async () => {
      const code = await getInviteCode(account);
      if (code) {
        setInviteCode(code);
      }
    }
    if (account) {
      queryCode();
    }
  }, [account]);

  useEffect(() => {
    if (showShare) {
      document.body.classList.add(styles['hidden-overflow']);
    } else {
      document.body.classList.remove(styles['hidden-overflow']);
    }
    return () => document.body.classList.remove(styles['hidden-overflow']);
  }, [showShare]);

  const onCopy = async () => {
    copy(shareUrl);
    setShowToast(true);
    await delay(2000);
    setShowToast(false);
  }

  if (!account) {
    return null;
  }

  // console.log('searchParams=', searchParams.get('id'));
  return (
    <div>
      <i className={styles.icon} onClick={() => setShowShare(true)} />
      {showShare && (<div className={styles.share}>
        <div className={styles.content}>
          <i className={styles.close} onClick={() => setShowShare(false)} />
          <div className={cls(styles.bg, { [styles.en]: locale !== 'zh-hk' })} />
          <p><label>{$t('{#參與入口#}')}: </label>{shareUrl}</p>
          <button onClick={() => onCopy()}><span>{$t('{#複製鏈接#}')}</span></button>
          {showToast && <div className={styles.toast}>{$t('{#複製成功，快去分享吧#}')}</div>}
        </div>
      </div>)}
    </div>
  );
}
