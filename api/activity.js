import request from '@/utils/request'

/**
 * 活动相关API接口
 */

/**
 * 获取首页数据
 * @returns {Promise}
 */
export function getHomeData() {
	return request({
		url: '/api/home/data',
		method: 'get'
	})
}

/**
 * 获取轮播横幅列表
 * @returns {Promise}
 */
export function getBanners() {
	return request({
		url: '/api/home/banners',
		method: 'get'
	})
}

/**
 * 获取快捷入口配置
 * @returns {Promise}
 */
export function getQuickEntries() {
	return request({
		url: '/api/home/quick-entries',
		method: 'get'
	})
}

/**
 * 获取活动列表
 * @param {Object} params - 查询参数
 * @param {Number} params.page - 页码
 * @param {Number} params.pageSize - 每页数量
 * @param {String} params.status - 活动状态 (ongoing/upcoming/ended)
 * @param {String} params.keyword - 搜索关键词
 * @returns {Promise}
 */
export function getActivities(params) {
	return request({
		url: '/api/activities',
		method: 'get',
		params
	})
}

/**
 * 获取活动详情
 * @param {Number} id - 活动ID
 * @returns {Promise}
 */
export function getActivityDetail(id) {
	return request({
		url: `/api/activities/${id}`,
		method: 'get'
	})
}

/**
 * 报名参加活动
 * @param {Number} activityId - 活动ID
 * @param {Object} data - 报名数据
 * @returns {Promise}
 */
export function joinActivity(activityId, data = {}) {
	return request({
		url: `/api/activities/${activityId}/join`,
		method: 'post',
		data
	})
}

/**
 * 取消报名
 * @param {Number} activityId - 活动ID
 * @returns {Promise}
 */
export function cancelJoin(activityId) {
	return request({
		url: `/api/activities/${activityId}/cancel`,
		method: 'post'
	})
}

/**
 * 活动签到
 * @param {Number} activityId - 活动ID
 * @param {Object} data - 签到数据
 * @param {String} data.code - 签到码
 * @param {String} data.location - 签到位置
 * @returns {Promise}
 */
export function checkin(activityId, data) {
	return request({
		url: `/api/activities/${activityId}/checkin`,
		method: 'post',
		data
	})
}

/**
 * 获取我的活动列表
 * @param {Object} params - 查询参数
 * @param {String} params.type - 活动类型 (joined/created/collected)
 * @returns {Promise}
 */
export function getMyActivities(params) {
	return request({
		url: '/api/activities/my',
		method: 'get',
		params
	})
}

/**
 * 收藏活动
 * @param {Number} activityId - 活动ID
 * @returns {Promise}
 */
export function collectActivity(activityId) {
	return request({
		url: `/api/activities/${activityId}/collect`,
		method: 'post'
	})
}

/**
 * 取消收藏
 * @param {Number} activityId - 活动ID
 * @returns {Promise}
 */
export function uncollectActivity(activityId) {
	return request({
		url: `/api/activities/${activityId}/uncollect`,
		method: 'post'
	})
}