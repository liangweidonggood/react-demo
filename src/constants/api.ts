// API相关常量

// API基础URL
export const API_BASE_URL = '/api'

// API端点
export const API_ENDPOINTS = {
  // 认证相关
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  GET_USER_INFO: '/auth/user',

  // 路由相关
  GET_ROUTES: '/routes',

  // 可以根据需要添加更多端点
} as const

// 请求超时时间（毫秒）
export const REQUEST_TIMEOUT = 30000
