"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  name: "ActivityCard",
  props: {
    activity: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  computed: {
    buttonText() {
      const statusMap = {
        "ongoing": "报名参加",
        "upcoming": "即将开始",
        "ended": "已结束"
      };
      return statusMap[this.activity.status] || "报名参加";
    }
  },
  methods: {
    handleCardClick() {
      this.$emit("click-card", this.activity);
    },
    handleButtonClick() {
      if (this.activity.status !== "ended") {
        this.$emit("click-button", this.activity);
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
    a: $props.activity.image,
    b: common_vendor.t($props.activity.title),
    c: common_vendor.p({
      type: "calendar",
      size: "12",
      color: "#a7abb2"
    }),
    d: common_vendor.t($props.activity.startDate),
    e: common_vendor.t($props.activity.endDate),
    f: $props.activity.participants
  }, $props.activity.participants ? {
    g: common_vendor.t($props.activity.participants),
    h: common_vendor.t($props.activity.maxParticipants)
  } : {}, {
    i: common_vendor.t($options.buttonText),
    j: common_vendor.n($props.activity.status),
    k: common_vendor.o((...args) => $options.handleButtonClick && $options.handleButtonClick(...args)),
    l: common_vendor.o((...args) => $options.handleCardClick && $options.handleCardClick(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-03dd9d6c"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/components/ActivityCard.js.map
