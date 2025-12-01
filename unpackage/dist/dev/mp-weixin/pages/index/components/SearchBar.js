"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  name: "SearchBar",
  props: {
    placeholder: {
      type: String,
      default: "Search"
    },
    backgroundColor: {
      type: String,
      default: "#FFFFFF"
    }
  },
  methods: {
    handleClick() {
      this.$emit("click");
    }
  }
};
if (!Array) {
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  _component_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "search",
      size: "16",
      color: "#a7abb2"
    }),
    b: common_vendor.t($props.placeholder),
    c: common_vendor.o((...args) => $options.handleClick && $options.handleClick(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4c59ab1b"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/components/SearchBar.js.map
