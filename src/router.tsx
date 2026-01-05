import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import Login from './pages/login/index.tsx';
import Home from './pages/home/index.tsx';
import './index.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />, // 公共布局
    errorElement: <div>出错了</div>,
    children: [
      { index: true, element: <Login /> }, // 默认首页
      { path: 'home', element: <Home /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
