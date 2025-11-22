import request from '@/utils/request.js'

// 用户相关API
export const userApi = {
  // 用户注册
  register(data) {
    return request({
      url: '/user/register',
      method: 'POST',
      data
    })
  },

  // 密码登录
  loginByPassword(data) {
    return request({
      url: '/user/login/password',
      method: 'POST',
      data
    })
  },

  // 验证码登录
  loginByCode(data) {
    return request({
      url: '/user/login/code',
      method: 'POST',
      data
    })
  },

  // 微信登录
  loginByWechat(data) {
    return request({
      url: '/user/login/wechat',
      method: 'POST',
      data
    })
  },

  // 发送邮箱验证码
  sendEmailCode(email) {
    return request({
      url: '/user/code/email',
      method: 'POST',
      data: { email }
    })
  },

  // 发送短信验证码
  sendSmsCode(phone) {
    return request({
      url: '/user/code/sms',
      method: 'POST',
      data: { phone }
    })
  },

  // 获取用户信息
  getUserInfo() {
    return request({
      url: '/user/info',
      method: 'GET'
    })
  }
}

export default userApi
