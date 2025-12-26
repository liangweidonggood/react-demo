// 路由配置类型
export interface RouteConfig {
  path: string
  element: string
  children?: RouteConfig[]
  name?: string
  icon?: string
  auth?: boolean
}

// 路由数据类型
export interface RouteData {
  routes: RouteConfig[]
}
