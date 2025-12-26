// 通用工具函数

/**
 * 生成唯一ID
 * @returns 唯一ID字符串
 */
export const generateId = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  )
}

/**
 * 防抖函数
 * @param func 要执行的函数
 * @param delay 延迟时间（毫秒）
 * @returns 防抖处理后的函数
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: number | undefined

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

/**
 * 节流函数
 * @param func 要执行的函数
 * @param limit 时间限制（毫秒）
 * @returns 节流处理后的函数
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number,
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  let timeoutId: number | undefined

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      timeoutId = setTimeout(() => {
        inThrottle = false
        if (timeoutId) {
          clearTimeout(timeoutId)
          timeoutId = undefined
        }
      }, limit)
    }
  }
}

/**
 * 深拷贝对象
 * @param obj 要拷贝的对象
 * @returns 拷贝后的对象
 */
export const deepClone = <T = unknown>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T
  }

  if (Array.isArray(obj)) {
    // 使用类型安全的方式处理数组
    return obj.map(deepClone) as unknown as T
  }

  if (typeof obj === 'object') {
    const clonedObj = {} as T
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const k = key as keyof T
        const value = obj[k]
        clonedObj[k] = deepClone(value) as T[keyof T]
      }
    }
    return clonedObj
  }

  return obj
}

/**
 * 格式化日期
 * @param date 日期对象或时间戳
 * @param format 格式化字符串，默认为YYYY-MM-DD HH:mm:ss
 * @returns 格式化后的日期字符串
 */
export const formatDate = (
  date: Date | number | string,
  format: string = 'YYYY-MM-DD HH:mm:ss',
): string => {
  const d = new Date(date)

  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')

  return format
    .replace('YYYY', year.toString())
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}
