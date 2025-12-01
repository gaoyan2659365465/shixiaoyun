import request from '@/utils/request.js'

// 业务合作相关API
export const cooperationApi = {
  // 业务合作注册
  register(data) {
    return request({
      url: '/cooperation/register',
      method: 'POST',
      data
    })
  }
}

export default cooperationApi
