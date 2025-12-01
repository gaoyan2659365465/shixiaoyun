"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  name: "UserPointsCard",
  props: {
    userName: {
      type: String,
      default: "用户名称"
    },
    points: {
      type: Number,
      default: 0
    }
  },
  methods: {
    // 查看积分明细
    handlePointsDetail() {
      this.$emit("detail");
    },
    // 打开卡券中心
    handleCouponCenter() {
      this.$emit("coupon");
    },
    // 提现到钱包
    handleWithdraw() {
      this.$emit("withdraw");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.userName),
    b: common_vendor.t($props.points),
    c: common_vendor.o((...args) => $options.handlePointsDetail && $options.handlePointsDetail(...args)),
    d: common_vendor.o((...args) => $options.handleCouponCenter && $options.handleCouponCenter(...args)),
    e: common_vendor.o((...args) => $options.handleWithdraw && $options.handleWithdraw(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-19d141c5"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/points/components/UserPointsCard.js.map
