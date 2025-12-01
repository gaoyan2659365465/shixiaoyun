"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  name: "CouponTabBar",
  props: {
    // 当前选中的Tab
    currentTab: {
      type: String,
      default: "unused"
    },
    // 各状态的数量统计
    stats: {
      type: Object,
      default: () => ({
        unused: 0,
        used: 0,
        expired: 0
      })
    }
  },
  computed: {
    // Tab配置列表
    tabs() {
      return [
        {
          label: "未使用",
          value: "unused",
          count: this.stats.unused || 0
        },
        {
          label: "已使用",
          value: "used",
          count: this.stats.used || 0
        },
        {
          label: "已过期",
          value: "expired",
          count: this.stats.expired || 0
        }
      ];
    }
  },
  methods: {
    /**
     * 处理Tab点击事件
     * @param {string} value - Tab的值
     */
    handleTabClick(value) {
      if (value !== this.currentTab) {
        this.$emit("change", value);
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($options.tabs, (tab, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(tab.label),
        b: tab.count > 0
      }, tab.count > 0 ? {
        c: common_vendor.t(tab.count)
      } : {}, {
        d: tab.value,
        e: $props.currentTab === tab.value ? 1 : "",
        f: common_vendor.o(($event) => $options.handleTabClick(tab.value), tab.value)
      });
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-303d8736"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/coupon/components/CouponTabBar.js.map
