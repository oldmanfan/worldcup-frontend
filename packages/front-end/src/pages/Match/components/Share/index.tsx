import { useState, useEffect } from 'react';
import copy from 'copy-to-clipboard';
import useTranslation from '@/hooks/useTranslation';
import styles from './index.module.less';
import { delay } from '@/utils';
import { getInviteCode } from '@/api';
import useWallet from '@/hooks/useWallet';

export default function Share() {
  const { $t } = useTranslation();
  const [showShare, setShowShare] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { account } = useWallet();

  useEffect(() => {
    if (showShare) {
      document.body.classList.add(styles['hidden-overflow']);
    } else {
      document.body.classList.remove(styles['hidden-overflow']);
    }
    return () => document.body.classList.remove(styles['hidden-overflow']);
  }, [showShare]);

  const onCopy = async () => {
    const code = await getInviteCode(account);
    copy(`http://www.MetaTdex.com?invite=${code}`);
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
          <div className={styles.bg} />
          <p><label>{$t('{#参与入口#}')}:</label>www.MetaTdex.com</p>
          <button onClick={() => onCopy()}>{$t('{#复制链接#}')}</button>
          {showToast && <div className={styles.toast}>{$t('{#复制成功，快去分享吧#}')}</div>}
        </div>
      </div>)}
    </div>
  );
}
