"use strict";
const utils_request = require("../utils/request.js");
const cooperationApi = {
  // 业务合作注册
  register(data) {
    return utils_request.request({
      url: "/cooperation/register",
      method: "POST",
      data
    });
  }
};
exports.cooperationApi = cooperationApi;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/cooperation.js.map
