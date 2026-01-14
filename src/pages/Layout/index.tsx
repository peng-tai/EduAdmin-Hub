import React, { useEffect, useState } from 'react';
import { DesktopOutlined, FileOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

import styles from './index.module.scss';
import type { MenuItemType } from 'antd/es/menu/interface';

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

// 核心：递归查找匹配 key 的菜单项
const findMenuItemByKey = (
  menuList: MenuItem[],
  targetKey: string,
): MenuItemType | null => {
  // 遍历当前层级的菜单
  for (const item of menuList) {
    // 安全检查 item 是否为 null
    if (!item) continue;

    // 1. 当前项 key 匹配，直接返回
    if (item.key === targetKey) {
      return item as MenuItemType;
    }
    // 2. 当前项有子菜单，递归查找子菜单
    if ('children' in item && item.children && item.children.length > 0) {
      const foundItem = findMenuItemByKey(
        item.children as MenuItem[],
        targetKey,
      );
      // 子菜单中找到匹配项，返回
      if (foundItem) {
        return foundItem;
      }
    }
  }
  // 3. 未找到匹配项
  return null;
};

const App: React.FC = () => {
  const navigate = useNavigate();

  const [selectedMenu, setSelectedMenu] = useState<MenuItemType | null>(null);

  const currentPath = location.pathname;

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleSelect = (v: { key: string }) => {
    if (!v.key) return;
    navigate(v.key);
  };

  useEffect(() => {
    setSelectedMenu(findMenuItemByKey(items, currentPath));
  }, [currentPath]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible={false} width={240}>
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
        >
          <Breadcrumb items={[{ title: selectedMenu?.label }]} className={styles.bread} />
        </Header>
        <Content className={styles.content}>
          <Outlet></Outlet>
        </Content>
        <Footer className={styles.footer}>Created by PengTai</Footer>
      </Layout>
    </Layout>
  );
};

export default App;
