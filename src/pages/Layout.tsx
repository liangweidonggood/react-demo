import React from 'react'
import { Outlet, useNavigate } from 'react-router'
import { Layout as AntLayout, Menu, Button } from 'antd'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { logout } from '../store/features/auth/authSlice'

const { Header, Content, Sider } = AntLayout

const Layout: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    void navigate('/login')
  }

  return (
    <AntLayout className="h-screen">
      <Sider
        width={200}
        className="bg-white"
      >
        <div className="text-xl font-bold p-4">React Demo</div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={({ key }) => {
            if (key === '1') {
              void navigate('/')
            } else if (key === '2') {
              void navigate('/about')
            }
          }}
        >
          <Menu.Item key="1">首页</Menu.Item>
          <Menu.Item key="2">关于我们</Menu.Item>
        </Menu>
      </Sider>
      <AntLayout>
        <Header className="bg-white flex items-center justify-between px-4 border-b">
          <div className="text-lg font-semibold">React 19 Demo</div>
          <div className="flex items-center gap-4">
            <span>欢迎, {user?.username || '用户'}</span>
            <Button
              type="primary"
              danger
              onClick={handleLogout}
            >
              登出
            </Button>
          </div>
        </Header>
        <Content className="p-6">
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  )
}

export default Layout
