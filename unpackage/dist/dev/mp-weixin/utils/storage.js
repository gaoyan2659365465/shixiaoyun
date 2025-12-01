"use strict";
const common_vendor = require("../common/vendor.js");
const storage = {
  // 设置
  set(key, value) {
    try {
      common_vendor.index.setStorageSync(key, JSON.stringify(value));
    } catch (e) {
      common_vendor.index.__f__("error", "at utils/storage.js:8", "存储失败:", e);
    }
  },
  // 获取
  get(key) {
    try {
      const value = common_vendor.index.getStorageSync(key);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      common_vendor.index.__f__("error", "at utils/storage.js:18", "读取失败:", e);
      return null;
    }
  },
  // 删除
  remove(key) {
    try {
      common_vendor.index.removeStorageSync(key);
    } catch (e) {
      common_vendor.index.__f__("error", "at utils/storage.js:28", "删除失败:", e);
    }
  },
  // 清空
  clear() {
    try {
      common_vendor.index.clearStorageSync();
    } catch (e) {
      common_vendor.index.__f__("error", "at utils/storage.js:37", "清空失败:", e);
    }
  }
};
exports.storage = storage;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/storage.js.map
