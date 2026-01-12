import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './pages/login/index.tsx';
import Home from './pages/home/index.tsx';
import './index.module.scss';
import Layout from './pages/layout/index.tsx';
import Course from './pages/course/index.tsx';
import OrderList from './pages/order/list/index.tsx';
import OrderRefund from './pages/order/refund/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { index: true, element: <Login /> }, // 默认首页
      {
        path: '/',
        element: <Layout />, // 公共布局
        errorElement: <div>出错了</div>,
        children: [
          { path: 'home', element: <Home /> },
          {
            path: 'course',
            element: <Course></Course>,
          },
          {
            path: 'order',
            children: [
              {
                path: 'list',
                element: <OrderList></OrderList>,
              },
              {
                path: 'refund',
                element: <OrderRefund></OrderRefund>,
              },
            ],
          },
          {
            path: 'user',
            children: [
              {
                path: 'student',
                element: <div>学员</div>,
              },
              {
                path: 'teacher',
                element: <div>讲师</div>,
              },
            ],
          },
          {
            path: 'info',
            children: [
              {
                path: 'carousel',
                element: <div>轮播图</div>,
              },
              {
                path: 'article',
                element: <div>文章</div>,
              },
            ],
          },
          {
            path: 'promotion',
            children: [
              {
                path: 'seckill',
                element: <div>秒杀活动</div>,
              },
              {
                path: 'coupon',
                element: <div>优惠券</div>,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
