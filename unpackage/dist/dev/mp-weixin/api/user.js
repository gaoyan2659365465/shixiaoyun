"use strict";
const utils_request = require("../utils/request.js");
const userApi = {
  // 用户注册
  register(data) {
    return utils_request.request({
      url: "/user/register",
      method: "POST",
      data
    });
  },
  // 密码登录
  loginByPassword(data) {
    return utils_request.request({
      url: "/user/login/password",
      method: "POST",
      data
    });
  },
  // 验证码登录
  loginByCode(data) {
    return utils_request.request({
      url: "/user/login/code",
      method: "POST",
      data
    });
  },
  // 微信登录
  loginByWechat(data) {
    return utils_request.request({
      url: "/user/login/wechat",
      method: "POST",
      data
    });
  },
  // 发送邮箱验证码
  sendEmailCode(email) {
    return utils_request.request({
      url: "/user/code/email",
      method: "POST",
      data: { email }
    });
  },
  // 发送短信验证码
  sendSmsCode(phone) {
    return utils_request.request({
      url: "/user/code/sms",
      method: "POST",
      data: { phone }
    });
  },
  // 获取用户信息
  getUserInfo() {
    return utils_request.request({
      url: "/user/info",
      method: "GET"
    });
  }
};
exports.userApi = userApi;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/user.js.map
