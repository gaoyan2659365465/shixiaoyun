"use strict";
const validator = {
  // 验证手机号
  isPhone(phone) {
    return /^1[3-9]\d{9}$/.test(phone);
  },
  // 验证邮箱
  isEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  },
  // 验证密码(6-20位,包含字母和数字)
  isPassword(password) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/.test(password);
  },
  // 验证验证码(6位数字)
  isCode(code) {
    return /^\d{6}$/.test(code);
  },
  // 验证昵称(2-20个字符)
  isNickname(nickname) {
    return nickname && nickname.length >= 2 && nickname.length <= 20;
  }
};
exports.validator = validator;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/validator.js.map
