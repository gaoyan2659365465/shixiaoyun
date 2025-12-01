import request from '@/utils/request'

/**
 * 积分商城相关API接口
 */

/**
 * 获取用户积分信息
 * @returns {Promise}
 */
export function getUserPoints() {
	return request({
		url: '/api/points/user',
		method: 'get'
	})
}

/**
 * 获取积分明细
 * @param {Object} params - 查询参数
 * @param {Number} params.page - 页码
 * @param {Number} params.pageSize - 每页数量
 * @returns {Promise}
 */
export function getPointsHistory(params) {
	return request({
		url: '/api/points/history',
		method: 'get',
		params
	})
}

/**
 * 获取积分商品列表
 * @param {Object} params - 查询参数
 * @param {Number} params.page - 页码
 * @param {Number} params.pageSize - 每页数量
 * @param {String} params.category - 商品分类
 * @param {String} params.sort - 排序方式
 * @returns {Promise}
 */
export function getPointsProducts(params) {
	return request({
		url: '/api/points/products',
		method: 'get',
		params
	})
}

/**
 * 获取积分商品详情
 * @param {Number} id - 商品ID
 * @returns {Promise}
 */
export function getProductDetail(id) {
	return request({
		url: `/api/points/products/${id}`,
		method: 'get'
	})
}

/**
 * 兑换积分商品
 * @param {Number} productId - 商品ID
 * @param {Object} data - 兑换数据
 * @param {Number} data.quantity - 兑换数量
 * @param {String} data.address - 收货地址（如需要）
 * @returns {Promise}
 */
export function exchangeProduct(productId, data = {}) {
	return request({
		url: `/api/points/products/${productId}/exchange`,
		method: 'post',
		data
	})
}

/**
 * 获取我的兑换记录
 * @param {Object} params - 查询参数
 * @param {Number} params.page - 页码
 * @param {Number} params.pageSize - 每页数量
 * @param {String} params.status - 订单状态
 * @returns {Promise}
 */
export function getMyExchanges(params) {
	return request({
		url: '/api/points/exchanges',
		method: 'get',
		params
	})
}

/**
 * 获取兑换订单详情
 * @param {Number} orderId - 订单ID
 * @returns {Promise}
 */
export function getExchangeDetail(orderId) {
	return request({
		url: `/api/points/exchanges/${orderId}`,
		method: 'get'
	})
}

/**
 * 获取卡券中心列表
 * @param {Object} params - 查询参数
 * @returns {Promise}
 */
export function getMyCoupons(params) {
	return request({
		url: '/api/points/coupons',
		method: 'get',
		params
	})
}

/**
 * 使用卡券
 * @param {Number} couponId - 卡券ID
 * @returns {Promise}
 */
export function useCoupon(couponId) {
	return request({
		url: `/api/points/coupons/${couponId}/use`,
		method: 'post'
	})
}