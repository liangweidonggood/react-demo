// 存储操作工具函数

// 存储类型
type StorageType = 'localStorage' | 'sessionStorage'

/**
 * 存储数据到localStorage或sessionStorage
 * @param key 存储键名
 * @param value 存储值
 * @param storageType 存储类型，默认为localStorage
 */
export const setStorage = <T = unknown>(
  key: string,
  value: T,
  storageType: StorageType = 'localStorage',
): void => {
  try {
    const storage = window[storageType]
    const serializedValue = JSON.stringify(value)
    storage.setItem(key, serializedValue)
  } catch (error) {
    console.error('存储数据失败:', error)
  }
}

/**
 * 从localStorage或sessionStorage获取数据
 * @param key 存储键名
 * @param storageType 存储类型，默认为localStorage
 * @returns 存储的值，如果不存在或解析失败则返回null
 */
export const getStorage = <T = unknown>(
  key: string,
  storageType: StorageType = 'localStorage',
): T | null => {
  try {
    const storage = window[storageType]
    const serializedValue = storage.getItem(key)
    if (serializedValue === null) {
      return null
    }
    return JSON.parse(serializedValue) as T
  } catch (error) {
    console.error('获取数据失败:', error)
    return null
  }
}

/**
 * 从localStorage或sessionStorage移除数据
 * @param key 存储键名
 * @param storageType 存储类型，默认为localStorage
 */
export const removeStorage = (
  key: string,
  storageType: StorageType = 'localStorage',
): void => {
  try {
    const storage = window[storageType]
    storage.removeItem(key)
  } catch (error) {
    console.error('移除数据失败:', error)
  }
}

/**
 * 清空localStorage或sessionStorage
 * @param storageType 存储类型，默认为localStorage
 */
export const clearStorage = (
  storageType: StorageType = 'localStorage',
): void => {
  try {
    const storage = window[storageType]
    storage.clear()
  } catch (error) {
    console.error('清空存储失败:', error)
  }
}
