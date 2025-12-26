import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_ENDPOINTS } from '../../constants'
import type { RouteConfig } from '../../types'

// 自定义baseQuery，用于模拟API响应
const mockBaseQuery = (): ReturnType<typeof fetchBaseQuery> => {
  return async (args) => {
    // 使用下划线忽略未使用的参数
    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, 500))

    // 获取请求URL，处理字符串和FetchArgs两种情况
    const url = typeof args === 'string' ? args : args.url

    // 根据不同的endpoint返回不同的模拟数据
    if (url === API_ENDPOINTS.GET_ROUTES) {
      return {
        data: [
          {
            path: '/',
            element: 'Layout',
            children: [
              {
                path: '',
                element: 'Home',
                name: '首页',
                auth: true,
              },
              {
                path: 'about',
                element: 'About',
                name: '关于我们',
                auth: true,
              },
            ],
          },
          {
            path: '/login',
            element: 'Login',
            name: '登录',
            auth: false,
          },
        ] as RouteConfig[],
      }
    }

    // 对于登录请求
    if (url === API_ENDPOINTS.LOGIN) {
      return {
        data: {
          user: {
            id: '1',
            username: 'admin',
            email: 'admin@example.com',
          },
          token: 'mock-jwt-token',
        },
      }
    }

    // 对于其他请求，返回默认响应
    return {
      data: null,
    }
  }
}

// 创建基础API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: mockBaseQuery(), // 使用自定义的模拟baseQuery
  endpoints: () => ({}),
  tagTypes: ['User', 'Posts', 'Routes'],
})

// 路由API
export const routesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoutes: builder.query<RouteConfig[], void>({
      query: () => ({ url: '/routes', method: 'GET' }),
    }),
  }),
})

// 登录请求参数类型
type LoginRequest = {
  username: string
  password: string
}

// 登录响应类型
type LoginResponse = {
  user: {
    id: string
    username: string
    email: string
  }
  token: string
}

// 登录API
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: API_ENDPOINTS.LOGIN,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    getCurrentUser: builder.query({
      query: () => API_ENDPOINTS.GET_USER_INFO,
      providesTags: ['User'],
    }),
  }),
})

export const { useGetRoutesQuery } = routesApi
export const { useLoginMutation, useGetCurrentUserQuery } = authApi
