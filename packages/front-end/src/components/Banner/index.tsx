import { Tabs } from 'antd';
import styles from './index.module.less';
import cls from 'classnames';
import useWallet from '@/hooks/useWallet';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
import type { MenuProps } from 'antd';
import useTranslation from '@/hooks/useTranslation';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';

export interface BannerProps {
  rule?: boolean;
  hideBg?: boolean;
}
export default function Banner(props: BannerProps) {
  const { shortAddress, chainId, connect } = useWallet();
  // const shortAddress = '0x123.1231'
  // const chainId = '256'
  const { changeLocale, locale, $t } = useTranslation();

  const items: MenuProps['items'] = [
    {
      label: (
        <Space size={16}>
          <i>🇺🇸</i>
          <span>English</span>
        </Space>
      ),
      key: 'en-us',
    },
    {
      label: (
        <Space size={16}>
          <i>🇨🇳</i>
          <span>繁体中文</span>
        </Space>
      ),
      key: 'zh-hk',
    },
  ];

  const menuProps = {
    items,
    onClick: (e: any) => {
      if (locale !== e.key) {
        changeLocale(e.key);
      }
    },
  };
  const handleConnect = () => {
    if (shortAddress) {
      // teco钱包，跳转至钱包管理
      if ((window as any).TECO_postMessage) {
        (window as any).TECO_postMessage({
          type: 'open_wallet_manage',
        });
      }
      return;
    }
    connect().catch(() => {
      // 链接失败，且在teco钱包中，跳转到创建钱包流程
      if ((window as any).TECO_postMessage) {
        (window as any).TECO_postMessage({
          type: 'open_create_wallet',
        });
      } else {
        // 跳转到下载页面
        location.href = 'https://www.metatdex.com/download';
      }
    });
  };

  useEffect(() => {
    if (chainId && !shortAddress) {
      connect();
    }
  }, [chainId, shortAddress]);

  return (
    <div
      className={cls(styles.banner, {
        [styles.en]: locale !== 'zh-hk',
        [styles.hideBg]: props.hideBg,
      })}
    >
      <div>
        <div className={styles.address} onClick={handleConnect}>
          <i
            className={cls(
              styles['icon-chain'],
              styles[`chain-${Number(chainId)}`],
            )}
          />
          <span>{shortAddress ? shortAddress : $t('{#連接錢包#}')}</span>
        </div>
        {props.rule ? (
          <NavLink className={styles.rule} to="/rule">
            {$t('{#活動規則#}')}
          </NavLink>
        ) : (
          <div className={styles.lang}>
            <Dropdown menu={menuProps} overlayClassName={styles.popup}>
              <Button>
                <Space size={2}>
                  {locale === 'zh-hk' ? (
                    <>
                      <i>🇨🇳</i>
                      <span>繁体中文</span>
                    </>
                  ) : (
                    <>
                      <i>🇺🇸</i>
                      <span>English</span>
                    </>
                  )}
                  <i className={styles.icon} />
                </Space>
              </Button>
            </Dropdown>
          </div>
        )}
      </div>
    </div>
  );
}
