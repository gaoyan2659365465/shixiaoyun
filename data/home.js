/**
 * 首页数据模型
 * 用于首页展示的静态数据和数据结构定义
 */

// 轮播横幅数据
export const banners = [
	{
		id: 1,
		image: '/static/images/home/banner/banner1.jpg',
		title: 'Banner title',
		subtitle: '查找活动，支持提醒查找',
		link: '/pages/activity/list'
	},
	{
		id: 2,
		image: '/static/images/home/banner/banner2.jpg',
		title: '精彩活动',
		subtitle: '更多精彩等你来',
		link: '/pages/activity/list'
	},
	{
		id: 3,
		image: '/static/images/home/banner/banner3.jpg',
		title: '热门推荐',
		subtitle: '不容错过的精彩内容',
		link: '/pages/activity/list'
	}
]

// 快捷入口数据
export const quickEntries = [
	{
		id: 1,
		icon: '/static/images/home/icons/checkin.png',
		title: '活动签到',
		path: '/pages/checkin/checkin',
		badge: ''
	},
	{
		id: 2,
		icon: '/static/images/home/icons/cooperation.png',
		title: '业务合作',
		path: '/pages/cooperation/cooperation',
		badge: ''
	},
	{
		id: 3,
		icon: '/static/images/home/icons/points.png',
		title: '积分商城',
		path: '/pages/points/points',
		badge: 'NEW'
	}
]

// 活动列表数据
export const activities = [
	{
		id: 1,
		image: '/static/images/home/activities/activity1.jpg',
		title: '案例收集',
		startDate: '2025.01.01',
		endDate: '2025.12.31',
		status: 'ongoing', // ongoing: 进行中, upcoming: 即将开始, ended: 已结束
		participants: 128,
		maxParticipants: 200
	},
	{
		id: 2,
		image: '/static/images/home/activities/activity2.jpg',
		title: '年度总结大会',
		startDate: '2025.02.01',
		endDate: '2025.02.28',
		status: 'upcoming',
		participants: 45,
		maxParticipants: 100
	},
	{
		id: 3,
		image: '/static/images/home/activities/activity3.jpg',
		title: '技术分享会',
		startDate: '2025.03.15',
		endDate: '2025.03.15',
		status: 'ongoing',
		participants: 89,
		maxParticipants: 150
	},
	{
		id: 4,
		image: '/static/images/home/activities/activity4.jpg',
		title: '团建活动',
		startDate: '2024.12.20',
		endDate: '2024.12.20',
		status: 'ended',
		participants: 200,
		maxParticipants: 200
	}
]

// 首页完整数据
export const homeData = {
	banners,
	quickEntries,
	activities,
	hasMore: true
}

export default homeData