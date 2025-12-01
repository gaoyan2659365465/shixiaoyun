"use strict";
const common_vendor = require("../../common/vendor.js");
const data_partners = require("../../data/partners.js");
const _sfc_main = {
  data() {
    return {
      // 筛选条件
      filters: [
        { label: "杭州市", active: false, key: "city" },
        { label: "客户类型", active: false, key: "type" },
        { label: "门店服务", active: false, key: "service" }
      ],
      // 搜索关键词
      searchKeyword: "",
      // 合作伙伴数据
      partners: [],
      // 加载状态
      loading: false
    };
  },
  // 页面加载时获取数据
  onLoad() {
    this.loadPartners();
  },
  computed: {
    // 过滤后的合作伙伴列表
    filteredPartners() {
      let result = this.partners;
      if (this.searchKeyword) {
        const keyword = this.searchKeyword.toLowerCase();
        result = result.filter(
          (partner) => partner.name.toLowerCase().includes(keyword) || partner.location.toLowerCase().includes(keyword) || partner.tags.some((tag) => tag.toLowerCase().includes(keyword))
        );
      }
      return result;
    }
  },
  methods: {
    /**
     * 加载合作伙伴数据
     */
    async loadPartners() {
      try {
        this.loading = true;
        const data = await data_partners.getAllPartners();
        this.partners = data;
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/cooperation/cooperation.vue:129", "加载合作伙伴数据失败:", error);
        common_vendor.index.showToast({
          title: "加载失败",
          icon: "none"
        });
      } finally {
        this.loading = false;
      }
    },
    /**
     * 切换筛选条件
     */
    toggleFilter(index) {
      this.filters[index].active = !this.filters[index].active;
      common_vendor.index.__f__("log", "at pages/cooperation/cooperation.vue:144", "筛选条件变更:", this.filters[index]);
    },
    /**
     * 处理搜索
     */
    async handleSearch() {
      if (!this.searchKeyword.trim()) {
        await this.loadPartners();
        return;
      }
      try {
        this.loading = true;
        const results = await data_partners.searchPartners(this.searchKeyword);
        this.partners = results;
        if (results.length === 0) {
          common_vendor.index.showToast({
            title: "未找到相关合作伙伴",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/cooperation/cooperation.vue:172", "搜索失败:", error);
        common_vendor.index.showToast({
          title: "搜索失败",
          icon: "none"
        });
      } finally {
        this.loading = false;
      }
    },
    /**
     * 处理合作伙伴点击
     */
    handlePartnerClick(partner) {
      common_vendor.index.__f__("log", "at pages/cooperation/cooperation.vue:186", "点击合作伙伴:", partner);
    },
    /**
     * 处理联系按钮点击
     */
    handleContact(partner) {
      common_vendor.index.showModal({
        title: "联系我们",
        content: `您正在联系：${partner.name}

电话：${partner.phone || "暂无"}
邮箱：${partner.email || "暂无"}`,
        confirmText: "拨打电话",
        cancelText: "取消",
        success: (res) => {
          if (res.confirm && partner.phone) {
            common_vendor.index.makePhoneCall({
              phoneNumber: partner.phone,
              fail: (err) => {
                common_vendor.index.__f__("error", "at pages/cooperation/cooperation.vue:208", "拨打电话失败:", err);
                common_vendor.index.showToast({
                  title: "拨打失败",
                  icon: "none"
                });
              }
            });
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.filters, (filter, index, i0) => {
      return {
        a: common_vendor.t(filter.label),
        b: common_vendor.t(filter.active ? "✓" : "▼"),
        c: index,
        d: filter.active ? 1 : "",
        e: common_vendor.o(($event) => $options.toggleFilter(index), index)
      };
    }),
    b: common_vendor.o([($event) => $data.searchKeyword = $event.detail.value, (...args) => $options.handleSearch && $options.handleSearch(...args)]),
    c: $data.searchKeyword,
    d: common_vendor.f($options.filteredPartners, (partner, k0, i0) => {
      return common_vendor.e({
        a: partner.logo
      }, partner.logo ? {
        b: partner.logo
      } : {}, {
        c: common_vendor.t(partner.name),
        d: common_vendor.f(partner.tags, (tag, tagIndex, i1) => {
          return {
            a: common_vendor.t(tag),
            b: tagIndex
          };
        }),
        e: common_vendor.o(($event) => $options.handleContact(partner), partner.id),
        f: partner.id
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8d7c12ff"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/cooperation/cooperation.js.map
