import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './pages/login/index.tsx';
import Home from './pages/home/index.tsx';
import './index.module.scss';
import Course from './pages/course/index.tsx';
import OrderList from './pages/order/list/index.tsx';
import OrderRefund from './pages/order/refund/index.tsx';
import TeacherManager from './pages/user/teacher/index.tsx';
import StudentManager from './pages/user/student/index.tsx';
import CarouselManager from './pages/info/carousel/index.tsx';
import ArticleManager from './pages/info/article/index.tsx';
import Seckill from './pages/promotion/seckill/index.tsx';
import Coupon from './pages/promotion/coupon/index.tsx';
import AppLayout from './pages/layout/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { index: true, element: <Login /> }, // 默认首页
      {
        path: '/',
        element: <AppLayout />, // 公共布局
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
                element: <StudentManager></StudentManager>,
              },
              {
                path: 'teacher',
                element: <TeacherManager></TeacherManager>,
              },
            ],
          },
          {
            path: 'info',
            children: [
              {
                path: 'carousel',
                element: <CarouselManager></CarouselManager>,
              },
              {
                path: 'article',
                element: <ArticleManager></ArticleManager>,
              },
            ],
          },
          {
            path: 'promotion',
            children: [
              {
                path: 'seckill',
                element: <Seckill></Seckill>,
              },
              {
                path: 'coupon',
                element: <Coupon></Coupon>,
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
