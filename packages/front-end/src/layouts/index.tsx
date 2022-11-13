import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { Outlet } from 'react-router-dom';
import LocaleContextWrapper from '../context/locale';
import WalletProvider from '@/components/WalletProvider';
import { MatchStoreProvider } from '@/models';

export default function DefaultLayout() {
  return (
    <WalletProvider>
      <MatchStoreProvider>
        <LocaleContextWrapper>
          <ConfigProvider locale={zhCN}>
            <Outlet />
          </ConfigProvider>
        </LocaleContextWrapper>
      </MatchStoreProvider>
    </WalletProvider>
  );
}
