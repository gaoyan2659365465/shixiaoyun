"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      currentTab: 0,
      tabs: [
        { name: "全部", badge: 0 },
        { name: "系统通知", badge: 0 },
        { name: "活动消息", badge: 0 }
      ],
      messages: []
    };
  },
  onLoad() {
    this.loadMessages();
  },
  onPullDownRefresh() {
    this.loadMessages();
    setTimeout(() => {
      common_vendor.index.stopPullDownRefresh();
    }, 1e3);
  },
  methods: {
    switchTab(index) {
      this.currentTab = index;
      this.loadMessages();
    },
    loadMessages() {
      common_vendor.index.__f__("log", "at pages/message/message.vue:83", "加载消息数据，当前标签:", this.currentTab);
    },
    loadMore() {
      common_vendor.index.__f__("log", "at pages/message/message.vue:87", "加载更多消息");
    },
    openMessage(item) {
      common_vendor.index.__f__("log", "at pages/message/message.vue:91", "打开消息:", item);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.tabs, (tab, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(tab.name),
        b: tab.badge > 0
      }, tab.badge > 0 ? {
        c: common_vendor.t(tab.badge > 99 ? "99+" : tab.badge)
      } : {}, {
        d: index,
        e: $data.currentTab === index ? 1 : "",
        f: common_vendor.o(($event) => $options.switchTab(index), index)
      });
    }),
    b: $data.messages.length === 0
  }, $data.messages.length === 0 ? {
    c: common_assets._imports_0
  } : {
    d: common_vendor.f($data.messages, (item, index, i0) => {
      return common_vendor.e({
        a: item.avatar,
        b: item.unread
      }, item.unread ? {} : {}, {
        c: common_vendor.t(item.senderName),
        d: common_vendor.t(item.time),
        e: common_vendor.t(item.content),
        f: item.unread ? 1 : "",
        g: item.unread
      }, item.unread ? {
        h: common_vendor.t(item.unreadCount)
      } : {}, {
        i: index,
        j: common_vendor.o(($event) => $options.openMessage(item), index)
      });
    })
  }, {
    e: common_vendor.o((...args) => $options.loadMore && $options.loadMore(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4c1b26cf"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/message/message.js.map
