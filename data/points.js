/**
 * 积分商城数据模型
 * 用于积分商城展示的静态数据和数据结构定义
 */

// 积分商品数据
export const pointsProducts = [
	{
		id: 1,
		image: '/static/images/points/jd-card.jpg',
		title: '京东卡',
		stock: 1,
		totalStock: 10,
		points: 10,
		trend: 'up', // up: 上涨, down: 下跌, stable: 稳定
		category: 'card',
		description: '京东购物卡，可在京东商城使用'
	},
	{
		id: 2,
		image: '/static/images/points/tmall-card.jpg',
		title: '天猫卡',
		stock: 5,
		totalStock: 10,
		points: 20,
		trend: 'up',
		category: 'card',
		description: '天猫购物卡，可在天猫商城使用'
	},
	{
		id: 3,
		image: '/static/images/points/phone-card.jpg',
		title: '话费充值卡',
		stock: 8,
		totalStock: 10,
		points: 15,
		trend: 'stable',
		category: 'card',
		description: '手机话费充值卡，支持三大运营商'
	},
	{
		id: 4,
		image: '/static/images/points/movie-ticket.jpg',
		title: '电影票',
		stock: 3,
		totalStock: 10,
		points: 25,
		trend: 'down',
		category: 'ticket',
		description: '电影票兑换券，可在指定影院使用'
	},
	{
		id: 5,
		image: '/static/images/points/coffee-coupon.jpg',
		title: '咖啡券',
		stock: 6,
		totalStock: 10,
		points: 12,
		trend: 'up',
		category: 'coupon',
		description: '咖啡兑换券，可在指定咖啡店使用'
	},
	{
		id: 6,
		image: '/static/images/points/book-card.jpg',
		title: '图书卡',
		stock: 4,
		totalStock: 10,
		points: 18,
		trend: 'stable',
		category: 'card',
		description: '图书购物卡，可在指定书店使用'
	}
]

// 筛选选项
export const filterOptions = [
	{
		id: 'all',
		label: '全部',
		value: 'all'
	},
	{
		id: 'card',
		label: '购物卡',
		value: 'card'
	},
	{
		id: 'ticket',
		label: '票券',
		value: 'ticket'
	},
	{
		id: 'coupon',
		label: '优惠券',
		value: 'coupon'
	}
]

// 排序选项
export const sortOptions = [
	{
		id: 'default',
		label: '默认排序',
		value: 'default'
	},
	{
		id: 'points_asc',
		label: '积分从低到高',
		value: 'points_asc'
	},
	{
		id: 'points_desc',
		label: '积分从高到低',
		value: 'points_desc'
	},
	{
		id: 'stock_desc',
		label: '库存从高到低',
		value: 'stock_desc'
	}
]

// 用户积分信息
export const userPoints = {
	points: 1000,
	level: 1,
	levelName: '普通会员',
	nextLevelPoints: 100
}

// 积分商城完整数据
export const pointsData = {
	userPoints,
	products: pointsProducts,
	filterOptions,
	sortOptions,
	hasMore: true
}

export default pointsData