"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  name: "CouponCard",
  props: {
    // 卡券数据
    coupon: {
      type: Object,
      required: true
    }
  },
  computed: {
    /**
     * 显示金额
     */
    displayAmount() {
      if (this.coupon.type === "discount") {
        return this.coupon.amount;
      }
      return this.coupon.amount;
    },
    /**
     * 状态样式类
     */
    statusClass() {
      return `status-${this.coupon.status}`;
    }
  },
  methods: {
    /**
     * 复制文本到剪贴板
     * @param {string} text - 要复制的文本
     * @param {string} label - 文本标签（用于提示）
     */
    handleCopy(text, label) {
      common_vendor.index.setClipboardData({
        data: text,
        success: () => {
          common_vendor.index.showToast({
            title: `${label}已复制`,
            icon: "success",
            duration: 2e3
          });
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "复制失败",
            icon: "none",
            duration: 2e3
          });
        }
      });
    },
    /**
     * 使用卡券
     */
    handleUse() {
      this.$emit("use", this.coupon);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($options.displayAmount),
    b: $props.coupon.type === "discount"
  }, $props.coupon.type === "discount" ? {} : $props.coupon.type === "exchange" ? {} : {}, {
    c: $props.coupon.type === "exchange",
    d: common_vendor.t($props.coupon.name),
    e: common_vendor.t($props.coupon.condition),
    f: common_vendor.t($props.coupon.validDate),
    g: common_vendor.t($props.coupon.cardNumber),
    h: common_vendor.o(($event) => $options.handleCopy($props.coupon.cardNumber, "卡号")),
    i: common_vendor.t($props.coupon.cardSecret),
    j: common_vendor.o(($event) => $options.handleCopy($props.coupon.cardSecret, "密码")),
    k: $props.coupon.status === "unused"
  }, $props.coupon.status === "unused" ? {
    l: common_vendor.o((...args) => $options.handleUse && $options.handleUse(...args))
  } : $props.coupon.status === "used" ? {} : $props.coupon.status === "expired" ? {} : {}, {
    m: $props.coupon.status === "used",
    n: $props.coupon.status === "expired",
    o: $props.coupon.status !== "unused"
  }, $props.coupon.status !== "unused" ? {} : {}, {
    p: common_vendor.n($options.statusClass)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b6f73edd"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/coupon/components/CouponCard.js.map
