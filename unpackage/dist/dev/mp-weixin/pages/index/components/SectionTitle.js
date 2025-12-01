"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  name: "SectionTitle",
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ""
    },
    showArrow: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleClick() {
      if (this.showArrow) {
        this.$emit("click");
      }
    }
  }
};
if (!Array) {
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  _component_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($props.title),
    b: $props.subtitle
  }, $props.subtitle ? {
    c: common_vendor.t($props.subtitle)
  } : {}, {
    d: $props.showArrow
  }, $props.showArrow ? {
    e: common_vendor.p({
      type: "right",
      size: "16",
      color: "#a7abb2"
    })
  } : {}, {
    f: common_vendor.o((...args) => $options.handleClick && $options.handleClick(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-94113f0c"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/components/SectionTitle.js.map
