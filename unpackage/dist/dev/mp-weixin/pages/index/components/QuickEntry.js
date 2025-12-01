"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  name: "QuickEntry",
  props: {
    entries: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    handleClick(entry) {
      this.$emit("click", entry);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.entries, (entry, k0, i0) => {
      return common_vendor.e({
        a: entry.icon,
        b: entry.badge
      }, entry.badge ? {
        c: common_vendor.t(entry.badge)
      } : {}, {
        d: common_vendor.t(entry.title),
        e: entry.id,
        f: common_vendor.o(($event) => $options.handleClick(entry), entry.id)
      });
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0e6511c5"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/components/QuickEntry.js.map
