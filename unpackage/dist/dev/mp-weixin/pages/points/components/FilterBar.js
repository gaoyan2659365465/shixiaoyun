"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  name: "FilterBar",
  props: {
    filterOptions: {
      type: Array,
      default: () => []
    },
    sortOptions: {
      type: Array,
      default: () => []
    },
    resultCount: {
      type: Number,
      default: 0
    },
    defaultFilter: {
      type: String,
      default: "all"
    },
    defaultSort: {
      type: String,
      default: "default"
    }
  },
  data() {
    return {
      currentFilter: this.defaultFilter,
      currentSort: this.defaultSort
    };
  },
  computed: {
    // 当前筛选项的索引
    filterIndex() {
      const index = this.filterOptions.findIndex((opt) => opt.value === this.currentFilter);
      return index >= 0 ? index : 0;
    },
    // 当前排序项的索引
    sortIndex() {
      const index = this.sortOptions.findIndex((opt) => opt.value === this.currentSort);
      return index >= 0 ? index : 0;
    },
    // 当前筛选项的标签
    currentFilterLabel() {
      const option = this.filterOptions.find((opt) => opt.value === this.currentFilter);
      return option ? option.label : "筛选";
    },
    // 当前排序项的标签
    currentSortLabel() {
      const option = this.sortOptions.find((opt) => opt.value === this.currentSort);
      return option ? option.label : "排序";
    }
  },
  methods: {
    // 筛选项改变
    onFilterChange(e) {
      const index = e.detail.value;
      const option = this.filterOptions[index];
      if (option) {
        this.currentFilter = option.value;
        this.$emit("filter", option.value);
      }
    },
    // 排序项改变
    onSortChange(e) {
      const index = e.detail.value;
      const option = this.sortOptions[index];
      if (option) {
        this.currentSort = option.value;
        this.$emit("sort", option.value);
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($options.currentFilterLabel),
    b: $props.filterOptions,
    c: $options.filterIndex,
    d: common_vendor.o((...args) => $options.onFilterChange && $options.onFilterChange(...args)),
    e: common_vendor.t($options.currentSortLabel),
    f: $props.sortOptions,
    g: $options.sortIndex,
    h: common_vendor.o((...args) => $options.onSortChange && $options.onSortChange(...args)),
    i: common_vendor.t($props.resultCount)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6181dc89"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/points/components/FilterBar.js.map
