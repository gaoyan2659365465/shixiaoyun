"use strict";
const data_coupon = require("../data/coupon.js");
function getCouponList(params = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { status = "all", page = 1, pageSize = 10 } = params;
      let filteredList = data_coupon.couponList;
      if (status !== "all") {
        filteredList = data_coupon.couponList.filter((item) => item.status === status);
      }
      const total = filteredList.length;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const list = filteredList.slice(start, end);
      const hasMore = end < total;
      resolve({
        code: 200,
        data: {
          list,
          total,
          hasMore
        },
        message: "获取成功"
      });
    }, 300);
  });
}
function useCoupon(couponId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const coupon = data_coupon.couponList.find((item) => item.id === couponId);
      if (!coupon) {
        reject({
          code: 404,
          data: null,
          message: "卡券不存在"
        });
        return;
      }
      if (coupon.status === "used") {
        reject({
          code: 400,
          data: null,
          message: "卡券已使用"
        });
        return;
      }
      if (coupon.status === "expired") {
        reject({
          code: 400,
          data: null,
          message: "卡券已过期"
        });
        return;
      }
      coupon.status = "used";
      resolve({
        code: 200,
        data: null,
        message: "使用成功"
      });
    }, 500);
  });
}
function getCouponStats() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const unused = data_coupon.couponList.filter((item) => item.status === "unused").length;
      const used = data_coupon.couponList.filter((item) => item.status === "used").length;
      const expired = data_coupon.couponList.filter((item) => item.status === "expired").length;
      const total = data_coupon.couponList.length;
      resolve({
        code: 200,
        data: {
          unused,
          used,
          expired,
          total
        },
        message: "获取成功"
      });
    }, 200);
  });
}
exports.getCouponList = getCouponList;
exports.getCouponStats = getCouponStats;
exports.useCoupon = useCoupon;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/coupon.js.map
