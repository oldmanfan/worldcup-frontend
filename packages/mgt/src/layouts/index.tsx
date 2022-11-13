import React from 'react';
import { Breadcrumb, Button, Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom'
import useWallet from '@/hooks/useWallet';
import  './index.less';
import { Outlet } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

function DefaultLayout() {
  const { connect, shortAddress } = useWallet();
  const { navigate } = useNavigate();

  const onMenuClick = (e) => {
    console.log('e=', e);
    if (e.key === 'match') {
      navigate('/');
    }
  }
  const items = [
    {
      key: 'match',
      label: '比赛设置'
    },
    // {
    //   key: 'match',
    //   label: '其他'
    // }
  ]
  // setSettingRole
  return (
    <Layout>
      <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['match']}
          onClick={onMenuClick}
          items={items}
        />
        {!shortAddress ? <Button type="primary" onClick={connect}>Connect</Button> :
          <div className="address">{shortAddress}</div>}
      </Header>
      <Content className="site-layout" style={{ padding: '20px', marginTop: 64 }}>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          <Outlet />
        </div>
      </Content>
      {/* <Footer style={{ textAlign: 'center' }}> ©2022 MetaTdex</Footer> */}
    </Layout>
  );
}

export default DefaultLayout;
