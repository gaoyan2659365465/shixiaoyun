// 本地存储封装
export const storage = {
  // 设置
  set(key, value) {
    try {
      uni.setStorageSync(key, JSON.stringify(value))
    } catch (e) {
      console.error('存储失败:', e)
    }
  },

  // 获取
  get(key) {
    try {
      const value = uni.getStorageSync(key)
      return value ? JSON.parse(value) : null
    } catch (e) {
      console.error('读取失败:', e)
      return null
    }
  },

  // 删除
  remove(key) {
    try {
      uni.removeStorageSync(key)
    } catch (e) {
      console.error('删除失败:', e)
    }
  },

  // 清空
  clear() {
    try {
      uni.clearStorageSync()
    } catch (e) {
      console.error('清空失败:', e)
    }
  }
}

export default storage
