"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_storage = require("../../utils/storage.js");
const _sfc_main = {
  data() {
    return {
      isLoggedIn: false,
      userInfo: {},
      menuItems: [
        { label: "个人中心", icon: "/static/images/menu-profile.png", action: "profile" },
        { label: "客服中心", icon: "/static/images/menu-service.png", action: "service" },
        { label: "关于我们", icon: "/static/images/menu-about.png", action: "about" }
      ]
    };
  },
  onLoad() {
    this.checkLoginStatus();
    this.loadUserInfo();
  },
  onShow() {
    this.checkLoginStatus();
    if (this.isLoggedIn) {
      this.loadUserInfo();
    }
  },
  methods: {
    checkLoginStatus() {
      const token = common_vendor.index.getStorageSync("token");
      this.isLoggedIn = !!token;
      if (!this.isLoggedIn) {
        this.userInfo = {};
      }
    },
    loadUserInfo() {
      if (!this.isLoggedIn)
        return;
      const cachedUserInfo = utils_storage.storage.get("userInfo");
      if (cachedUserInfo) {
        this.userInfo = cachedUserInfo;
      }
      common_vendor.index.__f__("log", "at pages/profile/profile.vue:96", "加载用户信息");
    },
    handleMenuClick(item) {
      if (!this.isLoggedIn && item.action !== "about" && item.action !== "service") {
        this.goToLogin();
        return;
      }
      switch (item.action) {
        case "profile":
          common_vendor.index.navigateTo({
            url: "/pages/personal-center/personal-center"
          });
          break;
        case "service":
          common_vendor.index.__f__("log", "at pages/profile/profile.vue:113", "跳转到客服中心");
          break;
        case "about":
          common_vendor.index.__f__("log", "at pages/profile/profile.vue:117", "跳转到关于我们");
          break;
        default:
          common_vendor.index.__f__("log", "at pages/profile/profile.vue:120", "未知操作:", item.action);
      }
    },
    goToLogin() {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    },
    // 跳转到积分商城
    goToPoints() {
      if (!this.isLoggedIn) {
        this.goToLogin();
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/points/points"
      });
    },
    // 跳转到卡券中心
    goToCoupon() {
      if (!this.isLoggedIn) {
        this.goToLogin();
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/coupon/coupon"
      });
    },
    handleLogout() {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.removeStorageSync("token");
            utils_storage.storage.remove("userInfo");
            this.isLoggedIn = false;
            this.userInfo = {};
            common_vendor.index.showToast({
              title: "已退出登录",
              icon: "success"
            });
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.userInfo.avatar || "/static/images/default-avatar.png",
    b: common_vendor.t($data.userInfo.nickname || "未登录"),
    c: common_vendor.t($data.userInfo.id || "---"),
    d: common_vendor.t($data.userInfo.points || 0),
    e: common_vendor.o((...args) => $options.goToPoints && $options.goToPoints(...args)),
    f: common_vendor.t($data.userInfo.couponCount || 0),
    g: common_vendor.o((...args) => $options.goToCoupon && $options.goToCoupon(...args)),
    h: common_vendor.f($data.menuItems, (item, index, i0) => {
      return common_vendor.e({
        a: item.icon,
        b: common_vendor.t(item.label),
        c: item.badge
      }, item.badge ? {
        d: common_vendor.t(item.badge)
      } : {}, {
        e: index,
        f: common_vendor.o(($event) => $options.handleMenuClick(item), index)
      });
    }),
    i: $data.isLoggedIn
  }, $data.isLoggedIn ? {
    j: common_vendor.o((...args) => $options.handleLogout && $options.handleLogout(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-dd383ca2"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/profile.js.map
