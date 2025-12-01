"use strict";
const common_vendor = require("../../common/vendor.js");
const api_user = require("../../api/user.js");
const utils_storage = require("../../utils/storage.js");
const _sfc_main = {
  data() {
    return {
      agreed: false
    };
  },
  methods: {
    async handleAuth() {
      if (!this.agreed) {
        common_vendor.index.showToast({ title: "请先同意用户协议和隐私条款", icon: "none" });
        return;
      }
      try {
        common_vendor.index.showLoading({ title: "登录中..." });
        const loginRes = await new Promise((resolve, reject) => {
          common_vendor.index.login({
            provider: "weixin",
            success: (res2) => resolve(res2),
            fail: (err) => reject(err)
          });
        });
        if (!loginRes.code) {
          throw new Error("获取微信登录凭证失败");
        }
        const res = await api_user.userApi.loginByWechat({ code: loginRes.code });
        if (res.code === 200 && res.data) {
          common_vendor.index.setStorageSync("token", res.data.token);
          utils_storage.storage.set("userInfo", res.data.userInfo);
          common_vendor.index.showToast({ title: "登录成功", icon: "success" });
          setTimeout(() => {
            common_vendor.index.switchTab({ url: "/pages/index/index" });
          }, 1500);
        } else {
          throw new Error(res.message || "登录失败");
        }
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/login/login.vue:75", "授权登录失败:", e);
        common_vendor.index.showToast({
          title: e.message || "登录失败，请重试",
          icon: "none",
          duration: 2e3
        });
      } finally {
        common_vendor.index.hideLoading();
      }
    },
    skipLogin() {
      common_vendor.index.switchTab({ url: "/pages/index/index" });
    },
    goRegister() {
      common_vendor.index.navigateTo({ url: "/pages/register/register" });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.agreed,
    b: common_vendor.o(($event) => $data.agreed = !$data.agreed),
    c: common_vendor.o((...args) => $options.handleAuth && $options.handleAuth(...args)),
    d: common_vendor.o((...args) => $options.skipLogin && $options.skipLogin(...args)),
    e: common_vendor.o((...args) => $options.goRegister && $options.goRegister(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
