"use strict";
const utils_request = require("../utils/request.js");
function getUserPoints() {
  return utils_request.request({
    url: "/points/user",
    method: "get"
  });
}
function getPointsProducts(params) {
  return utils_request.request({
    url: "/points/products",
    method: "get",
    params
  });
}
function exchangeProduct(productId, data = {}) {
  return utils_request.request({
    url: `/points/products/${productId}/exchange`,
    method: "post",
    data
  });
}
exports.exchangeProduct = exchangeProduct;
exports.getPointsProducts = getPointsProducts;
exports.getUserPoints = getUserPoints;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/points.js.map
