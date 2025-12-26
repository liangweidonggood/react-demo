import { useMemo } from 'react'
import { RouterProvider } from 'react-router'
import { useGetRoutesQuery } from './store/services/api'
import { createAppRouter } from './routes/routeConfig'
import { Spin } from 'antd'

// 异步加载路由的App组件
const App = () => {
  const {
    data: routes,
    isLoading,
    isError,
    error,
  } = useGetRoutesQuery(undefined)

  // 使用useMemo代替useState和useEffect，避免在effect中直接调用setState
  const router = useMemo(() => {
    if (routes) {
      return createAppRouter()
    }
    return null
  }, [routes])

  // 显示加载状态
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    )
  }

  // 显示错误状态
  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">
          加载路由失败: {error instanceof Error ? error.message : '未知错误'}
        </div>
      </div>
    )
  }

  // 路由创建完成后渲染RouterProvider
  if (router) {
    return <RouterProvider router={router} />
  }

  return null
}

export default App
