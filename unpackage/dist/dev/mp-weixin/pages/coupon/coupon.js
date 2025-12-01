"use strict";
const common_vendor = require("../../common/vendor.js");
const api_coupon = require("../../api/coupon.js");
const CouponTabBar = () => "./components/CouponTabBar.js";
const CouponCard = () => "./components/CouponCard.js";
const CouponEmpty = () => "./components/CouponEmpty.js";
const _sfc_main = {
  name: "CouponPage",
  components: {
    CouponTabBar,
    CouponCard,
    CouponEmpty
  },
  data() {
    return {
      // 当前Tab
      currentTab: "unused",
      // 卡券列表
      couponList: [],
      // 统计数据
      stats: {
        unused: 0,
        used: 0,
        expired: 0
      },
      // 分页参数
      page: 1,
      pageSize: 10,
      hasMore: true,
      // 加载状态
      loading: false,
      refreshing: false,
      // 用户头像
      userAvatar: "/static/logo.png",
      // 状态栏高度
      statusBarHeight: 0
    };
  },
  computed: {
    /**
     * 空状态文本
     */
    emptyText() {
      const textMap = {
        unused: "暂无未使用的卡券",
        used: "暂无已使用的卡券",
        expired: "暂无已过期的卡券"
      };
      return textMap[this.currentTab] || "暂无卡券";
    }
  },
  onLoad() {
    const systemInfo = common_vendor.index.getSystemInfoSync();
    this.statusBarHeight = systemInfo.statusBarHeight || 0;
    this.loadStats();
    this.loadCouponList();
  },
  methods: {
    /**
     * 加载统计数据
     */
    async loadStats() {
      try {
        const res = await api_coupon.getCouponStats();
        if (res.code === 200) {
          this.stats = res.data;
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/coupon/coupon.vue:137", "加载统计数据失败:", error);
      }
    },
    /**
     * 加载卡券列表
     * @param {boolean} isRefresh - 是否为刷新操作
     */
    async loadCouponList(isRefresh = false) {
      if (this.loading)
        return;
      this.loading = true;
      try {
        const res = await api_coupon.getCouponList({
          status: this.currentTab,
          page: this.page,
          pageSize: this.pageSize
        });
        if (res.code === 200) {
          const { list, hasMore } = res.data;
          if (isRefresh) {
            this.couponList = list;
          } else {
            this.couponList = [...this.couponList, ...list];
          }
          this.hasMore = hasMore;
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/coupon/coupon.vue:169", "加载卡券列表失败:", error);
        common_vendor.index.showToast({
          title: "加载失败",
          icon: "none",
          duration: 2e3
        });
      } finally {
        this.loading = false;
        this.refreshing = false;
      }
    },
    /**
     * 处理Tab切换
     * @param {string} tab - 新的Tab值
     */
    handleTabChange(tab) {
      this.currentTab = tab;
      this.page = 1;
      this.couponList = [];
      this.hasMore = true;
      this.loadCouponList(true);
    },
    /**
     * 处理下拉刷新
     */
    handleRefresh() {
      this.refreshing = true;
      this.page = 1;
      this.hasMore = true;
      this.loadStats();
      this.loadCouponList(true);
    },
    /**
     * 处理上拉加载更多
     */
    handleLoadMore() {
      if (!this.hasMore || this.loading)
        return;
      this.page += 1;
      this.loadCouponList();
    },
    /**
     * 处理使用卡券
     * @param {Object} coupon - 卡券对象
     */
    async handleUseCoupon(coupon) {
      common_vendor.index.showModal({
        title: "确认使用",
        content: `确定要使用"${coupon.name}"吗？`,
        success: async (res) => {
          if (res.confirm) {
            try {
              common_vendor.index.showLoading({
                title: "使用中...",
                mask: true
              });
              const result = await api_coupon.useCoupon(coupon.id);
              common_vendor.index.hideLoading();
              if (result.code === 200) {
                common_vendor.index.showToast({
                  title: "使用成功",
                  icon: "success",
                  duration: 2e3
                });
                this.handleRefresh();
              }
            } catch (error) {
              common_vendor.index.hideLoading();
              common_vendor.index.showToast({
                title: error.message || "使用失败",
                icon: "none",
                duration: 2e3
              });
            }
          }
        }
      });
    },
    /**
     * 返回上一页
     */
    handleBack() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    /**
     * 跳转到个人中心
     */
    handleProfile() {
      common_vendor.index.switchTab({
        url: "/pages/profile/profile"
      });
    }
  }
};
if (!Array) {
  const _component_coupon_tab_bar = common_vendor.resolveComponent("coupon-tab-bar");
  const _component_coupon_card = common_vendor.resolveComponent("coupon-card");
  const _component_coupon_empty = common_vendor.resolveComponent("coupon-empty");
  (_component_coupon_tab_bar + _component_coupon_card + _component_coupon_empty)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.handleBack && $options.handleBack(...args)),
    b: $data.userAvatar,
    c: common_vendor.o((...args) => $options.handleProfile && $options.handleProfile(...args)),
    d: $data.statusBarHeight + "px",
    e: common_vendor.o($options.handleTabChange),
    f: common_vendor.p({
      ["current-tab"]: $data.currentTab,
      stats: $data.stats
    }),
    g: $data.couponList.length > 0
  }, $data.couponList.length > 0 ? common_vendor.e({
    h: common_vendor.f($data.couponList, (coupon, k0, i0) => {
      return {
        a: coupon.id,
        b: common_vendor.o($options.handleUseCoupon, coupon.id),
        c: "96ba783d-1-" + i0,
        d: common_vendor.p({
          coupon
        })
      };
    }),
    i: $data.hasMore
  }, $data.hasMore ? common_vendor.e({
    j: $data.loading
  }, $data.loading ? {} : {}) : {}) : !$data.loading ? {
    l: common_vendor.o($options.handleRefresh),
    m: common_vendor.p({
      ["empty-text"]: $options.emptyText
    })
  } : {}, {
    k: !$data.loading,
    n: $data.loading && $data.couponList.length === 0
  }, $data.loading && $data.couponList.length === 0 ? {} : {}, {
    o: $data.refreshing,
    p: common_vendor.o((...args) => $options.handleRefresh && $options.handleRefresh(...args)),
    q: common_vendor.o((...args) => $options.handleLoadMore && $options.handleLoadMore(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-96ba783d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/coupon/coupon.js.map
