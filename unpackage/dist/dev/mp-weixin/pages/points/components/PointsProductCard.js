"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  name: "PointsProductCard",
  props: {
    product: {
      type: Object,
      required: true,
      default: () => ({
        id: 0,
        image: "",
        title: "",
        stock: 0,
        totalStock: 0,
        points: 0,
        trend: "stable"
      })
    }
  },
  computed: {
    // 趋势图标
    trendIcon() {
      const icons = {
        up: "↑",
        down: "↓",
        stable: "→"
      };
      return icons[this.product.trend] || "→";
    },
    // 趋势样式类
    trendClass() {
      return `trend-${this.product.trend}`;
    }
  },
  methods: {
    // 点击卡片
    handleCardClick() {
      this.$emit("click", this.product);
    },
    // 点击兑换按钮
    handleExchange() {
      this.$emit("exchange", this.product);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $props.product.image,
    b: common_vendor.t($props.product.title),
    c: common_vendor.t($props.product.stock),
    d: common_vendor.t($props.product.totalStock),
    e: common_vendor.t($props.product.points),
    f: common_vendor.t($options.trendIcon),
    g: common_vendor.n($options.trendClass),
    h: common_vendor.o((...args) => $options.handleExchange && $options.handleExchange(...args)),
    i: common_vendor.o((...args) => $options.handleCardClick && $options.handleCardClick(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2883a30d"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/points/components/PointsProductCard.js.map
