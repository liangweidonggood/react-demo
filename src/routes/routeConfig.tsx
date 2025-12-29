import React from 'react'
import { createBrowserRouter } from 'react-router'
import Layout from '@/pages/Layout'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Login from '@/pages/Login'
import ProtectedRoute from '@/components/ProtectedRoute'

// 创建浏览器路由的函数
export const createAppRouter = () => {
  // 直接返回固定的路由配置，确保嵌套路由能正确工作
  return createBrowserRouter([
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: React.createElement(Layout),
          children: [
            {
              index: true,
              element: React.createElement(Home),
            },
            {
              path: 'about',
              element: React.createElement(About),
            },
          ],
        },
      ],
    },
    {
      path: '/login',
      element: React.createElement(Login),
    },
  ])
}
