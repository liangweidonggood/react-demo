import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'
import { useAppSelector } from '@/store/hooks'

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const location = useLocation()

  if (!isAuthenticated) {
    // 如果未登录，重定向到登录页，并保存当前位置以便登录后返回
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    )
  }

  return <Outlet />
}

export default ProtectedRoute
