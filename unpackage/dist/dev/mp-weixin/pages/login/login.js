"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      phone: "",
      password: "",
      showPassword: false
    };
  },
  methods: {
    handleLogin() {
      if (!this.phone) {
        common_vendor.index.showToast({ title: "请输入手机号", icon: "none" });
        return;
      }
      if (!this.password) {
        common_vendor.index.showToast({ title: "请输入密码", icon: "none" });
        return;
      }
      common_vendor.index.__f__("log", "at pages/login/login.vue:67", "登录", this.phone, this.password);
    },
    goToForgotPassword() {
      common_vendor.index.navigateTo({ url: "/pages/forgot-password/forgot-password" });
    },
    goToRegister() {
      common_vendor.index.navigateTo({ url: "/pages/register/register" });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: $data.phone,
    c: common_vendor.o(($event) => $data.phone = $event.detail.value),
    d: $data.showPassword ? "text" : "password",
    e: $data.password,
    f: common_vendor.o(($event) => $data.password = $event.detail.value),
    g: $data.showPassword ? "/static/icons/eye-open.png" : "/static/icons/eye-close.png",
    h: common_vendor.o(($event) => $data.showPassword = !$data.showPassword),
    i: common_vendor.o((...args) => $options.goToForgotPassword && $options.goToForgotPassword(...args)),
    j: common_vendor.o((...args) => $options.handleLogin && $options.handleLogin(...args)),
    k: common_vendor.o((...args) => $options.goToRegister && $options.goToRegister(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
