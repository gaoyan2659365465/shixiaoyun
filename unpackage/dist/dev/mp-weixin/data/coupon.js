"use strict";
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomFloat(min, max, decimals = 1) {
  const num = Math.random() * (max - min) + min;
  return parseFloat(num.toFixed(decimals));
}
function randomDate() {
  const year = randomInt(2024, 2025);
  const month = String(randomInt(1, 12)).padStart(2, "0");
  const day = String(randomInt(1, 28)).padStart(2, "0");
  return `${year}.${month}.${day}`;
}
function randomNumberString(length) {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += randomInt(0, 9);
  }
  return result;
}
function generateGuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}
function randomChoice(arr) {
  return arr[randomInt(0, arr.length - 1)];
}
const couponTypeList = ["coupon", "exchange", "discount"];
const couponStatusList = ["unused", "used", "expired"];
const couponNames = [
  "京东电子购物卡",
  "天猫超市卡",
  "星巴克咖啡券",
  "肯德基优惠券",
  "麦当劳代金券",
  "美团外卖券",
  "滴滴出行券",
  "爱奇艺会员卡",
  "腾讯视频会员",
  "网易云音乐会员",
  "优酷会员卡",
  "哔哩哔哩大会员",
  "盒马鲜生卡",
  "永辉超市卡",
  "沃尔玛购物卡",
  "家乐福代金券",
  "海底捞火锅券",
  "必胜客优惠券",
  "汉堡王代金券",
  "喜茶饮品券"
];
const couponList = [];
const count = randomInt(20, 30);
for (let i = 0; i < count; i++) {
  const type = randomChoice(couponTypeList);
  const status = randomChoice(couponStatusList);
  let name;
  if (type === "discount") {
    name = randomChoice(couponNames).replace("卡", "折扣券").replace("券", "折扣券");
  } else if (type === "exchange") {
    name = randomChoice(couponNames).replace("卡", "兑换券").replace("券", "兑换券");
  } else {
    name = randomChoice(couponNames);
  }
  const amount = type === "discount" ? randomFloat(1, 9, 1) : randomInt(5, 200);
  couponList.push({
    id: generateGuid(),
    type,
    name,
    amount,
    condition: `满${randomInt(100, 500)}元可用`,
    validDate: `${randomDate()}-${randomDate()}`,
    status,
    cardNumber: randomNumberString(12),
    cardSecret: randomNumberString(6)
  });
}
exports.couponList = couponList;
//# sourceMappingURL=../../.sourcemap/mp-weixin/data/coupon.js.map
