"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_storage = require("../../utils/storage.js");
const _sfc_main = {
  data() {
    return {
      userInfo: {},
      showEditModal: false,
      editField: "",
      editFieldLabel: "",
      editValue: ""
    };
  },
  onLoad() {
    this.loadUserInfo();
  },
  onShow() {
    this.loadUserInfo();
  },
  methods: {
    loadUserInfo() {
      const cachedUserInfo = utils_storage.storage.get("userInfo");
      if (cachedUserInfo) {
        this.userInfo = cachedUserInfo;
      }
    },
    handleEdit(field) {
      const fieldLabels = {
        name: "姓名",
        companyName: "公司名",
        contact: "联系方式",
        crmCode: "CRM编码"
      };
      this.editField = field;
      this.editFieldLabel = fieldLabels[field];
      this.editValue = this.userInfo[field] || "";
      this.showEditModal = true;
    },
    closeModal() {
      this.showEditModal = false;
      this.editField = "";
      this.editFieldLabel = "";
      this.editValue = "";
    },
    saveEdit() {
      if (!this.editValue.trim()) {
        common_vendor.index.showToast({
          title: `请输入${this.editFieldLabel}`,
          icon: "none"
        });
        return;
      }
      this.userInfo[this.editField] = this.editValue.trim();
      utils_storage.storage.set("userInfo", this.userInfo);
      common_vendor.index.showToast({
        title: "保存成功",
        icon: "success"
      });
      this.closeModal();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.userInfo.name || "未设置"),
    b: common_vendor.o(($event) => $options.handleEdit("name")),
    c: common_vendor.t($data.userInfo.companyName || "未设置"),
    d: common_vendor.o(($event) => $options.handleEdit("companyName")),
    e: common_vendor.t($data.userInfo.contact || "未设置"),
    f: common_vendor.o(($event) => $options.handleEdit("contact")),
    g: common_vendor.t($data.userInfo.crmCode || "未设置"),
    h: common_vendor.o(($event) => $options.handleEdit("crmCode")),
    i: $data.showEditModal
  }, $data.showEditModal ? {
    j: common_vendor.t($data.editFieldLabel),
    k: common_vendor.o((...args) => $options.closeModal && $options.closeModal(...args)),
    l: "请输入" + $data.editFieldLabel,
    m: $data.editField === "crmCode" ? 200 : $data.editField === "companyName" ? 100 : 50,
    n: $data.editValue,
    o: common_vendor.o(($event) => $data.editValue = $event.detail.value),
    p: common_vendor.o((...args) => $options.closeModal && $options.closeModal(...args)),
    q: common_vendor.o((...args) => $options.saveEdit && $options.saveEdit(...args)),
    r: common_vendor.o(() => {
    }),
    s: common_vendor.o((...args) => $options.closeModal && $options.closeModal(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e2fdecdd"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/personal-center/personal-center.js.map
