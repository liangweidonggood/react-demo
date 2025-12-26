// 应用全局常量

// 存储键名
export const STORAGE_KEYS = {
  TOKEN: 'app_token',
  USER_INFO: 'app_user_info',
  THEME: 'app_theme',
  LANGUAGE: 'app_language',
} as const

// 主题类型
export const THEME_TYPES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
} as const

// 语言类型
export const LANGUAGE_TYPES = {
  ZH_CN: 'zh-CN',
  EN_US: 'en-US',
} as const

// 路由相关常量
export const ROUTE_CONSTANTS = {
  LOGIN: '/login',
  HOME: '/',
  NOT_FOUND: '*',
} as const
