// api/coupon.js

import couponList from '@/data/coupon.js';

/**获取卡券列表
 * @param {Object} params - 查询参数
 * @param {string} params.status - 卡券状态：unused(未使用)、used(已使用)、expired(已过期)、all(全部)
 * @param {number} params.page - 页码，从1开始
 * @param {number} params.pageSize - 每页数量
 * @returns {Promise<{code: number, data: {list: Array, total: number, hasMore: boolean}, message: string}>}
 */
export function getCouponList(params = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { status = 'all', page = 1, pageSize = 10 } = params;
      
      // 根据状态筛选
      let filteredList = couponList;
      if (status !== 'all') {
        filteredList = couponList.filter(item => item.status === status);
      }
      
      // 计算分页
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
        message: '获取成功'
      });
    }, 300); // 模拟网络延迟
  });
}

/**
 * 使用卡券
 * @param {string} couponId - 卡券ID
 * @returns {Promise<{code: number, data: null, message: string}>}
 */
export function useCoupon(couponId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const coupon = couponList.find(item => item.id === couponId);
      
      if (!coupon) {
        reject({
          code: 404,
          data: null,
          message: '卡券不存在'
        });
        return;
      }
      
      if (coupon.status === 'used') {
        reject({
          code: 400,
          data: null,
          message: '卡券已使用'
        });
        return;
      }
      
      if (coupon.status === 'expired') {
        reject({
          code: 400,
          data: null,
          message: '卡券已过期'
        });
        return;
      }
      
      // 更新卡券状态为已使用
      coupon.status = 'used';
      
      resolve({
        code: 200,
        data: null,
        message: '使用成功'
      });
    }, 500); // 模拟网络延迟
  });
}

/**
 * 获取卡券统计数据
 * @returns {Promise<{code: number, data: {unused: number, used: number, expired: number, total: number}, message: string}>}
 */
export function getCouponStats() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const unused = couponList.filter(item => item.status === 'unused').length;
      const used = couponList.filter(item => item.status === 'used').length;
      const expired = couponList.filter(item => item.status === 'expired').length;
      const total = couponList.length;
      
      resolve({
        code: 200,
        data: {
          unused,
          used,
          expired,
          total
        },
        message: '获取成功'
      });
    }, 200);
  });
}