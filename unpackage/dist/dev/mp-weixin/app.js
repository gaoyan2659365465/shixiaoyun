"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/message/message.js";
  "./pages/profile/profile.js";
  "./pages/login/login.js";
  "./pages/register/register.js";
  "./pages/cooperation/cooperation.js";
  "./pages/points/points.js";
  "./pages/coupon/coupon.js";
  "./pages/personal-center/personal-center.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:10", "App Launch");
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:13", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:16", "App Hide");
  }
};
if (!Array) {
  const _component_router_view = common_vendor.resolveComponent("router-view");
  _component_router_view();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
