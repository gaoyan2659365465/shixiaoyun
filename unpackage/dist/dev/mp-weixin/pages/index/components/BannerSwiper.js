"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  name: "BannerSwiper",
  props: {
    banners: {
      type: Array,
      required: true,
      default: () => []
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3e3
    },
    duration: {
      type: Number,
      default: 500
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    handleChange(e) {
      this.currentIndex = e.detail.current;
    },
    handleClick(banner, index) {
      this.$emit("click", { banner, index });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.banners, (banner, index, i0) => {
      return {
        a: banner.image,
        b: common_vendor.t(banner.title),
        c: common_vendor.t(banner.subtitle),
        d: banner.id,
        e: common_vendor.o(($event) => $options.handleClick(banner, index), banner.id)
      };
    }),
    b: $props.autoplay,
    c: $props.interval,
    d: $props.duration,
    e: common_vendor.o((...args) => $options.handleChange && $options.handleChange(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-44a3a781"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/components/BannerSwiper.js.map
