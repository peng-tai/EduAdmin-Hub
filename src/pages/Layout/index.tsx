import React, { useState } from 'react';
import { DesktopOutlined, FileOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

import styles from './index.module.scss';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: '首页',
  },
  {
    key: '2',
    icon: <DesktopOutlined />,
    label: '课程管理',
  },
  {
    key: '3',
    icon: <FileOutlined />,
    label: '订单管理',
    children: [
      {
        key: '3-1',
        label: '订单',
      },
      {
        key: '3-2',
        label: '退款',
      },
    ],
  },
  {
    key: '4',
    icon: <FileOutlined />,
    label: '用户管理',
    children: [
      {
        key: '4-1',
        label: '学员',
      },
      {
        key: '4-2',
        label: '讲师',
      },
    ],
  },
  {
    key: '5',
    icon: <FileOutlined />,
    label: '资讯管理',
    children: [
      {
        key: '5-1',
        label: '轮播图',
      },
      {
        key: '5-2',
        label: '文章',
      },
    ],
  },
  {
    key: '6',
    icon: <FileOutlined />,
    label: '促销管理',
    children: [
      {
        key: '6-1',
        label: '秒杀活动',
      },
      {
        key: '6-2',
        label: '优惠券',
      },
    ],
  },
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultOpenKeys={['3', '4', '5', '6']}
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{ background: colorBgContainer }}
          className={styles.header}
        />
        <Content className={styles.content}>
          <Outlet></Outlet>
        </Content>
        <Footer className={styles.footer}>Created by PengTai</Footer>
      </Layout>
    </Layout>
  );
};

export default App;
