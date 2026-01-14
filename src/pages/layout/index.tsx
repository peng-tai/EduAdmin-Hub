import React, { useEffect, useState } from 'react';
import {
  CloseCircleOutlined,
  DesktopOutlined,
  FileOutlined,
  UserOutlined,
} from '@ant-design/icons';
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

// 核心：提取 # 后的路径
const getHashPath = () => {
  const match = location.hash.match(/#(.+)$/);
  return match ? match[1] : '/';
};

const AppLayout: React.FC = () => {
  const navigate = useNavigate();

  const [selectedMenu, setSelectedMenu] = useState<MenuItemType | null>(null);

  // 获取当前路径，并移除前缀用于菜单匹配
  const currentPath = getHashPath();

  const logout = () => {
    navigate('/');
    console.log('退出登录');
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // 菜单选择事件：拼接前缀后跳转
  const handleSelect = (v: { key: string }) => {
    if (!v.key) return;
    navigate(v.key);
  };

  // 监听路径变化，更新选中的菜单（使用移除前缀后的key匹配）
  useEffect(() => {
    setSelectedMenu(findMenuItemByKey(items, currentPath));
  }, [currentPath]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible={false} width={240}>
        <div className={styles.title}>教育管理系统</div>
        <Menu
          theme="dark"
          // 选中key使用移除前缀后的menuKey
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
          <Breadcrumb
            items={[{ title: selectedMenu?.label }]}
            className={styles.bread}
          />
          <div className={styles.user}>
            <img
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                marginRight: 16,
              }}
              src="data:image/jpeg;base64,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"
            ></img>
            管理员 0001
            <div className={styles.logout}>
              <CloseCircleOutlined
                className={styles.logoutIcon}
                onClick={logout}
              ></CloseCircleOutlined>

              <div className={styles.logoutText} onClick={logout}>
                退出
              </div>
            </div>
          </div>
        </Header>
        <Content className={styles.content}>
          <Outlet></Outlet>
        </Content>
        <Footer className={styles.footer}>Created by PengTai</Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
