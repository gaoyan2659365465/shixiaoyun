"use strict";
const common_vendor = require("../../common/vendor.js");
const api_cooperation = require("../../api/cooperation.js");
const _sfc_main = {
  data() {
    return {
      formData: {
        name: "",
        companyName: "",
        contact: "",
        crmCode: ""
      },
      agreed: false
    };
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    validateForm() {
      if (!this.formData.name.trim()) {
        common_vendor.index.showToast({ title: "请输入姓名", icon: "none" });
        return false;
      }
      if (!this.formData.companyName.trim()) {
        common_vendor.index.showToast({ title: "请输入公司名称", icon: "none" });
        return false;
      }
      if (!this.formData.contact.trim()) {
        common_vendor.index.showToast({ title: "请输入联系方式", icon: "none" });
        return false;
      }
      if (!this.agreed) {
        common_vendor.index.showToast({ title: "请先同意隐私条款", icon: "none" });
        return false;
      }
      return true;
    },
    async handleSubmit() {
      if (!this.validateForm()) {
        return;
      }
      try {
        common_vendor.index.showLoading({ title: "提交中..." });
        const res = await api_cooperation.cooperationApi.register({
          name: this.formData.name,
          companyName: this.formData.companyName,
          contact: this.formData.contact,
          crmCode: this.formData.crmCode || ""
        });
        common_vendor.index.hideLoading();
        common_vendor.index.showModal({
          title: "感谢注册",
          content: "如需使用业务合作功能，请等待1-3个工作日人工审核。谢谢！",
          showCancel: false,
          confirmText: "确定",
          success: () => {
            common_vendor.index.switchTab({
              url: "/pages/index/index"
            });
          }
        });
      } catch (e) {
        common_vendor.index.hideLoading();
        common_vendor.index.__f__("error", "at pages/register/register.vue:161", "注册失败:", e);
        common_vendor.index.showToast({
          title: e.message || "注册失败，请重试",
          icon: "none"
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: $data.formData.name,
    c: common_vendor.o(($event) => $data.formData.name = $event.detail.value),
    d: $data.formData.companyName,
    e: common_vendor.o(($event) => $data.formData.companyName = $event.detail.value),
    f: $data.formData.contact,
    g: common_vendor.o(($event) => $data.formData.contact = $event.detail.value),
    h: -1,
    i: $data.formData.crmCode,
    j: common_vendor.o(($event) => $data.formData.crmCode = $event.detail.value),
    k: $data.agreed,
    l: common_vendor.o(($event) => $data.agreed = !$data.agreed),
    m: common_vendor.o((...args) => $options.handleSubmit && $options.handleSubmit(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-bac4a35d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/register/register.js.map
