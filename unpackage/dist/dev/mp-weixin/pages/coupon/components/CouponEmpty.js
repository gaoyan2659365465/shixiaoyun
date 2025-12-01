"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  name: "CouponEmpty",
  props: {
    // 空状态文本
    emptyText: {
      type: String,
      default: "暂无卡券"
    },
    // 是否显示刷新按钮
    showRefresh: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    /**
     * 处理刷新操作
     */
    handleRefresh() {
      this.$emit("refresh");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($props.emptyText),
    b: $props.showRefresh
  }, $props.showRefresh ? {
    c: common_vendor.o((...args) => $options.handleRefresh && $options.handleRefresh(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6cca6ea3"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/coupon/components/CouponEmpty.js.map
