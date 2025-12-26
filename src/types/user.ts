// 用户信息类型
export interface User {
  id: string
  username: string
  email: string
  // 可以根据需要添加更多字段
  [key: string]: string | number | boolean | null | undefined
}

// 登录请求参数类型
export interface LoginRequest {
  username: string
  password: string
}

// 登录响应类型
export interface LoginResponse {
  user: User
  token: string
}

// 认证状态类型
export interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null
}
