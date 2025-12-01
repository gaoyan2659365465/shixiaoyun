"use strict";
const utils_request = require("../utils/request.js");
function getHomeData() {
  return utils_request.request({
    url: "/api/home/data",
    method: "get"
  });
}
function getActivities(params) {
  return utils_request.request({
    url: "/api/activities",
    method: "get",
    params
  });
}
function joinActivity(activityId, data = {}) {
  return utils_request.request({
    url: `/api/activities/${activityId}/join`,
    method: "post",
    data
  });
}
exports.getActivities = getActivities;
exports.getHomeData = getHomeData;
exports.joinActivity = joinActivity;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/activity.js.map
