"use strict";
const common_vendor = require("../../common/vendor.js");
const api_points = require("../../api/points.js");
const data_points = require("../../data/points.js");
const UserPointsCard = () => "./components/UserPointsCard.js";
const FilterBar = () => "./components/FilterBar.js";
const PointsProductCard = () => "./components/PointsProductCard.js";
const _sfc_main = {
  components: {
    UserPointsCard,
    FilterBar,
    PointsProductCard
  },
  data() {
    return {
      userName: "用户名称",
      userPoints: 0,
      products: [],
      filterOptions: [],
      sortOptions: [],
      currentFilter: "all",
      currentSort: "default",
      loading: false,
      hasMore: true,
      page: 1,
      pageSize: 10,
      showWithdrawModal: false,
      withdrawPoints: "",
      withdrawAmount: "0.00"
    };
  },
  computed: {
    // 筛选后的商品列表
    filteredProducts() {
      let result = [...this.products];
      if (this.currentFilter !== "all") {
        result = result.filter((p) => p.category === this.currentFilter);
      }
      switch (this.currentSort) {
        case "points_asc":
          result.sort((a, b) => a.points - b.points);
          break;
        case "points_desc":
          result.sort((a, b) => b.points - a.points);
          break;
        case "stock_desc":
          result.sort((a, b) => b.stock - a.stock);
          break;
      }
      return result;
    },
    // 显示的商品列表
    displayProducts() {
      return this.filteredProducts;
    }
  },
  onLoad() {
    this.loadData();
  },
  onPullDownRefresh() {
    this.page = 1;
    this.hasMore = true;
    this.loadData().then(() => {
      common_vendor.index.stopPullDownRefresh();
    });
  },
  onReachBottom() {
    if (this.hasMore && !this.loading) {
      this.loadMore();
    }
  },
  methods: {
    // 加载数据
    async loadData() {
      try {
        this.loading = true;
        await this.loadUserPoints();
        await this.loadProducts();
        this.filterOptions = data_points.pointsData.filterOptions;
        this.sortOptions = data_points.pointsData.sortOptions;
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/points/points.vue:198", "加载数据失败:", error);
        common_vendor.index.showToast({
          title: "加载失败",
          icon: "none"
        });
      } finally {
        this.loading = false;
      }
    },
    // 加载用户积分
    async loadUserPoints() {
      try {
        const res = await api_points.getUserPoints();
        if (res.code === 200) {
          this.userPoints = res.data.points || 0;
          this.userName = res.data.userName || "用户名称";
        }
      } catch (error) {
        common_vendor.index.__f__("log", "at pages/points/points.vue:218", "使用本地积分数据:", error);
        this.userPoints = data_points.pointsData.userPoints.points;
      }
    },
    // 加载商品列表
    async loadProducts() {
      try {
        const res = await api_points.getPointsProducts({
          page: this.page,
          pageSize: this.pageSize
        });
        if (res.code === 200) {
          if (this.page === 1) {
            this.products = res.data.list || [];
          } else {
            this.products = [...this.products, ...res.data.list || []];
          }
          this.hasMore = res.data.hasMore || false;
        }
      } catch (error) {
        common_vendor.index.__f__("log", "at pages/points/points.vue:241", "使用本地商品数据:", error);
        this.products = data_points.pointsData.products;
        this.hasMore = false;
      }
    },
    // 加载更多
    async loadMore() {
      if (this.loading || !this.hasMore)
        return;
      this.page++;
      await this.loadProducts();
    },
    // 筛选
    handleFilter(value) {
      this.currentFilter = value;
    },
    // 排序
    handleSort(value) {
      this.currentSort = value;
    },
    // 查看积分明细
    handlePointsDetail() {
      common_vendor.index.navigateTo({
        url: "/pages/points/detail"
      });
    },
    // 打开卡券中心
    handleCouponCenter() {
      common_vendor.index.navigateTo({
        url: "/pages/coupon/coupon"
      });
    },
    // 提现到钱包
    handleWithdraw() {
      if (this.userPoints <= 0) {
        common_vendor.index.showToast({
          title: "当前积分不足，无法提现",
          icon: "none"
        });
        return;
      }
      this.showWithdrawModal = true;
      this.withdrawPoints = "";
      this.withdrawAmount = "0.00";
    },
    // 关闭提现弹窗
    closeWithdrawModal() {
      this.showWithdrawModal = false;
      this.withdrawPoints = "";
      this.withdrawAmount = "0.00";
    },
    // 计算提现金额
    calculateAmount() {
      const points = parseInt(this.withdrawPoints);
      if (isNaN(points) || points <= 0) {
        this.withdrawAmount = "0.00";
      } else {
        this.withdrawAmount = (points / 100).toFixed(2);
      }
    },
    // 确认提现（第一步）
    confirmWithdrawStep() {
      const points = parseInt(this.withdrawPoints);
      if (isNaN(points) || points <= 0) {
        common_vendor.index.showToast({
          title: "请输入有效的积分数量",
          icon: "none"
        });
        return;
      }
      if (points > this.userPoints) {
        common_vendor.index.showToast({
          title: "积分不足，请重新输入",
          icon: "none"
        });
        return;
      }
      this.closeWithdrawModal();
      const amount = this.withdrawAmount;
      common_vendor.index.showModal({
        title: "确认提现",
        content: `提现积分：${points}分
到账金额：¥${amount}元

确认提现到钱包吗？`,
        cancelText: "取消",
        confirmText: "确认提现",
        success: (res) => {
          if (res.confirm) {
            this.confirmWithdraw(points, amount);
          }
        }
      });
    },
    // 确认提现
    async confirmWithdraw(points, amount) {
      try {
        common_vendor.index.showLoading({ title: "提现中..." });
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        const arrivalTime = "1-3个工作日";
        common_vendor.index.hideLoading();
        common_vendor.index.showModal({
          title: "提现成功",
          content: `提现积分：${points}分
到账金额：¥${amount}元
预计到账时间：${arrivalTime}

请注意查收钱包余额`,
          showCancel: false,
          confirmText: "我知道了",
          success: () => {
            this.loadUserPoints();
          }
        });
      } catch (error) {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: error.message || "提现失败，请重试",
          icon: "none"
        });
      }
    },
    // 查看商品详情
    handleProductDetail(product) {
      common_vendor.index.navigateTo({
        url: `/pages/points/product?id=${product.id}`
      });
    },
    // 兑换商品
    async handleExchange(product) {
      if (product.stock <= 0) {
        common_vendor.index.showToast({
          title: "库存不足",
          icon: "none"
        });
        return;
      }
      if (this.userPoints < product.points) {
        common_vendor.index.showToast({
          title: "积分不足",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showModal({
        title: "确认兑换",
        content: `本次兑换需消耗 ${product.points} 积分，是否确认兑换？一经兑换不退不换。`,
        cancelText: "取消",
        confirmText: "确认兑换",
        success: async (res) => {
          if (res.confirm) {
            try {
              const result = await api_points.exchangeProduct(product.id, {
                quantity: 1
              });
              if (result.code === 200) {
                this.page = 1;
                await this.loadData();
                common_vendor.index.showModal({
                  title: "兑换成功",
                  content: "恭喜您兑换成功！可前往卡券中心查看和使用。",
                  cancelText: "稍后再说",
                  confirmText: "去使用",
                  success: (modalRes) => {
                    if (modalRes.confirm) {
                      common_vendor.index.navigateTo({
                        url: "/pages/coupon/coupon"
                      });
                    }
                  }
                });
              }
            } catch (error) {
              common_vendor.index.showToast({
                title: error.message || "兑换失败",
                icon: "none"
              });
            }
          }
        }
      });
    }
  }
};
if (!Array) {
  const _component_UserPointsCard = common_vendor.resolveComponent("UserPointsCard");
  const _component_FilterBar = common_vendor.resolveComponent("FilterBar");
  const _component_PointsProductCard = common_vendor.resolveComponent("PointsProductCard");
  const _component_uni_load_more = common_vendor.resolveComponent("uni-load-more");
  (_component_UserPointsCard + _component_FilterBar + _component_PointsProductCard + _component_uni_load_more)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.handlePointsDetail),
    b: common_vendor.o($options.handleCouponCenter),
    c: common_vendor.o($options.handleWithdraw),
    d: common_vendor.p({
      ["user-name"]: $data.userName,
      points: $data.userPoints
    }),
    e: common_vendor.o($options.handleFilter),
    f: common_vendor.o($options.handleSort),
    g: common_vendor.p({
      ["filter-options"]: $data.filterOptions,
      ["sort-options"]: $data.sortOptions,
      ["result-count"]: $options.filteredProducts.length
    }),
    h: common_vendor.f($options.displayProducts, (product, k0, i0) => {
      return {
        a: product.id,
        b: common_vendor.o($options.handleProductDetail, product.id),
        c: common_vendor.o($options.handleExchange, product.id),
        d: "9bbf7136-2-" + i0,
        e: common_vendor.p({
          product
        })
      };
    }),
    i: $data.hasMore && !$data.loading
  }, $data.hasMore && !$data.loading ? {
    j: common_vendor.o((...args) => $options.loadMore && $options.loadMore(...args))
  } : {}, {
    k: $data.loading
  }, $data.loading ? {
    l: common_vendor.p({
      status: "loading"
    })
  } : !$data.hasMore && $options.displayProducts.length > 0 ? {} : {}, {
    m: !$data.hasMore && $options.displayProducts.length > 0,
    n: !$data.loading && $options.displayProducts.length === 0
  }, !$data.loading && $options.displayProducts.length === 0 ? {} : {}, {
    o: $data.showWithdrawModal
  }, $data.showWithdrawModal ? {
    p: common_vendor.o((...args) => $options.closeWithdrawModal && $options.closeWithdrawModal(...args)),
    q: common_vendor.t($data.userPoints),
    r: common_vendor.o([($event) => $data.withdrawPoints = $event.detail.value, (...args) => $options.calculateAmount && $options.calculateAmount(...args)]),
    s: $data.withdrawPoints,
    t: common_vendor.t($data.withdrawAmount),
    v: common_vendor.o((...args) => $options.closeWithdrawModal && $options.closeWithdrawModal(...args)),
    w: common_vendor.o((...args) => $options.confirmWithdrawStep && $options.confirmWithdrawStep(...args)),
    x: common_vendor.o(() => {
    }),
    y: common_vendor.o((...args) => $options.closeWithdrawModal && $options.closeWithdrawModal(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9bbf7136"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/points/points.js.map
