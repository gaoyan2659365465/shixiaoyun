"use strict";
const partnersData = [
  {
    id: 1,
    name: "晋城运营服务中心",
    logo: "",
    // 可以替换为实际的logo URL
    location: "浙江省杭州市西湖区",
    address: "西湖区文三路123号",
    tags: ["电讯学院", "酒店工程"],
    type: "客户类型A",
    service: "门店服务",
    city: "杭州市",
    phone: "0571-12345678",
    email: "jincheng@example.com",
    description: "专业的运营服务中心，提供全方位的电讯和酒店工程解决方案"
  },
  {
    id: 2,
    name: "杭州科技服务中心",
    logo: "",
    location: "浙江省杭州市滨江区",
    address: "滨江区江南大道3588号",
    tags: ["科技园区", "智能制造"],
    type: "客户类型B",
    service: "技术支持",
    city: "杭州市",
    phone: "0571-23456789",
    email: "tech@example.com",
    description: "致力于智能制造和科技创新的专业服务机构"
  },
  {
    id: 3,
    name: "上海运营服务中心",
    logo: "",
    location: "上海市浦东新区",
    address: "浦东新区世纪大道1000号",
    tags: ["金融服务", "商业中心"],
    type: "客户类型A",
    service: "门店服务",
    city: "上海市",
    phone: "021-12345678",
    email: "shanghai@example.com",
    description: "服务于金融和商业领域的综合性运营中心"
  },
  {
    id: 4,
    name: "北京合作服务中心",
    logo: "",
    location: "北京市朝阳区",
    address: "朝阳区建国路88号",
    tags: ["互联网", "创新园区"],
    type: "客户类型C",
    service: "咨询服务",
    city: "北京市",
    phone: "010-12345678",
    email: "beijing@example.com",
    description: "专注于互联网和创新领域的专业咨询服务"
  },
  {
    id: 5,
    name: "深圳技术服务中心",
    logo: "",
    location: "广东省深圳市南山区",
    address: "南山区科技园南区",
    tags: ["高新技术", "研发中心"],
    type: "客户类型B",
    service: "技术支持",
    city: "深圳市",
    phone: "0755-12345678",
    email: "shenzhen@example.com",
    description: "高新技术研发和技术支持的专业服务机构"
  },
  {
    id: 6,
    name: "成都运营服务中心",
    logo: "",
    location: "四川省成都市高新区",
    address: "高新区天府大道中段",
    tags: ["电子商务", "物流配送"],
    type: "客户类型A",
    service: "门店服务",
    city: "成都市",
    phone: "028-12345678",
    email: "chengdu@example.com",
    description: "电子商务和物流配送领域的综合服务中心"
  },
  {
    id: 7,
    name: "广州商业服务中心",
    logo: "",
    location: "广东省广州市天河区",
    address: "天河区珠江新城",
    tags: ["商业综合体", "零售连锁"],
    type: "客户类型C",
    service: "咨询服务",
    city: "广州市",
    phone: "020-12345678",
    email: "guangzhou@example.com",
    description: "商业综合体和零售连锁的专业咨询服务"
  },
  {
    id: 8,
    name: "南京教育服务中心",
    logo: "",
    location: "江苏省南京市鼓楼区",
    address: "鼓楼区中山路321号",
    tags: ["教育培训", "学术交流"],
    type: "客户类型B",
    service: "教育服务",
    city: "南京市",
    phone: "025-12345678",
    email: "nanjing@example.com",
    description: "专注于教育培训和学术交流的服务机构"
  }
];
function getAllPartners() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...partnersData]);
    }, 100);
  });
}
function searchPartners(keyword) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!keyword) {
        resolve([...partnersData]);
        return;
      }
      const lowerKeyword = keyword.toLowerCase();
      const results = partnersData.filter(
        (partner) => partner.name.toLowerCase().includes(lowerKeyword) || partner.location.toLowerCase().includes(lowerKeyword) || partner.address.toLowerCase().includes(lowerKeyword) || partner.tags.some((tag) => tag.toLowerCase().includes(lowerKeyword)) || partner.description.toLowerCase().includes(lowerKeyword)
      );
      resolve(results);
    }, 100);
  });
}
exports.getAllPartners = getAllPartners;
exports.searchPartners = searchPartners;
//# sourceMappingURL=../../.sourcemap/mp-weixin/data/partners.js.map
