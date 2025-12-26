import React from 'react'
import { Form, Input, Button, Card, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router'
import { useLoginMutation } from '../store/services/api'
import { useAppDispatch } from '../store/hooks'
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from '../store/features/auth/authSlice'

const Login: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const [, { isLoading }] = useLoginMutation()

  // 定义location.state的类型，避免使用any
  interface LocationState {
    from?: {
      pathname: string
    }
  }

  const from = (location.state as LocationState)?.from?.pathname || '/'

  const handleSubmit = async (values: {
    username: string
    password: string
  }) => {
    try {
      dispatch(loginStart())

      // 模拟登录成功，实际项目中替换为真实API调用
      // const response = await login(values).unwrap()

      // 模拟响应数据
      const mockResponse = {
        user: {
          id: '1',
          username: values.username,
          email: `${values.username}@example.com`,
        },
        token: 'mock-jwt-token',
      }

      dispatch(loginSuccess(mockResponse))
      message.success('登录成功')
      void navigate(from, { replace: true })
    } catch (error) {
      dispatch(loginFailure('登录失败'))
      message.error('登录失败，请检查用户名和密码')
      console.error('Login error:', error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card
        title="登录"
        className="w-96"
      >
        <Form
          form={form}
          onFinish={(values: { username: string; password: string }) => {
            void handleSubmit(values)
          }}
          layout="vertical"
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={isLoading}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
