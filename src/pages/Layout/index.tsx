import React from 'react';
import { DesktopOutlined, FileOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

import styles from './index.module.scss';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: '/home',
    icon: <UserOutlined />,
    label: '首页',
  },
  {
    key: '/course',
    icon: <DesktopOutlined />,
    label: '课程管理',
  },
  {
    key: '/order',
    icon: <FileOutlined />,
    label: '订单管理',
    children: [
      {
        key: '/order/list',
        label: '订单',
      },
      {
        key: '/order/refund',
        label: '退款',
      },
    ],
  },
  {
    key: '/user',
    icon: <FileOutlined />,
    label: '用户管理',
    children: [
      {
        key: '/user/student',
        label: '学员',
      },
      {
        key: '/user/teacher',
        label: '讲师',
      },
    ],
  },
  {
    key: '/info',
    icon: <FileOutlined />,
    label: '资讯管理',
    children: [
      {
        key: '/info/carousel',
        label: '轮播图',
      },
      {
        key: '/info/article',
        label: '文章',
      },
    ],
  },
  {
    key: '/promotion',
    icon: <FileOutlined />,
    label: '促销管理',
    children: [
      {
        key: '/promotion/seckill',
        label: '秒杀活动',
      },
      {
        key: '/promotion/coupon',
        label: '优惠券',
      },
    ],
  },
];

const App: React.FC = () => {
  const navigate = useNavigate();

  const currentPath = location.pathname;

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleSelect = (v: { key: string }) => {
    if (!v.key) return;
    navigate(v.key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible={false}
        width={240}
      >
        <div className={styles.title}>教育管理系统</div>
        <Menu
          theme="dark"
          selectedKeys={[currentPath]}
          defaultOpenKeys={['/order', '/user', '/info', '/promotion']}
          mode="inline"
          items={items}
          onSelect={handleSelect}
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
