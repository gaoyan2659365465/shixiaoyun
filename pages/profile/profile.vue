<template>
	<view class="profile-container">
		<!-- 用户信息卡片 -->
		<view class="user-card">
			<view class="user-info">
				<image class="avatar" :src="userInfo.avatar || '/static/images/default-avatar.png'" mode="aspectFill"></image>
				<view class="user-details">
					<text class="username">{{ userInfo.nickname || '未登录' }}</text>
					<text class="user-id">ID: {{ userInfo.id || '---' }}</text>
				</view>
			</view>
			<view class="user-stats">
				<view class="stat-item" @tap="goToPoints">
					<text class="stat-value">{{ userInfo.points || 0 }}</text>
					<text class="stat-label">积分</text>
				</view>
				<view class="stat-divider"></view>
				<view class="stat-item" @tap="goToCoupon">
					<text class="stat-value">{{ userInfo.couponCount || 0 }}</text>
					<text class="stat-label">优惠券</text>
				</view>
			</view>
		</view>

		<!-- 功能菜单 -->
		<view class="section">
			<view class="menu-list">
				<view 
					v-for="(item, index) in menuItems" 
					:key="index"
					class="menu-item"
					@tap="handleMenuClick(item)"
				>
					<view class="menu-left">
						<image class="menu-icon" :src="item.icon" mode="aspectFit"></image>
						<text class="menu-label">{{ item.label }}</text>
					</view>
					<view class="menu-right">
						<text v-if="item.badge" class="menu-badge">{{ item.badge }}</text>
						<text class="arrow">›</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 退出登录按钮 -->
		<view class="logout-section" v-if="isLoggedIn">
			<button class="logout-btn" @tap="handleLogout">退出登录</button>
		</view>
	</view>
</template>

<script>
import { storage } from '@/utils/storage.js'

export default {
	data() {
		return {
			isLoggedIn: false,
			userInfo: {},
			menuItems: [
				{ label: '个人中心', icon: '/static/images/menu-profile.png', action: 'profile' },
				{ label: '客服中心', icon: '/static/images/menu-service.png', action: 'service' },
				{ label: '关于我们', icon: '/static/images/menu-about.png', action: 'about' }
			]
		}
	},
	onLoad() {
		this.checkLoginStatus()
		this.loadUserInfo()
	},
	onShow() {
		this.checkLoginStatus()
		if (this.isLoggedIn) {
			this.loadUserInfo()
		}
	},
	methods: {
		checkLoginStatus() {
			const token = uni.getStorageSync('token')
			this.isLoggedIn = !!token
			if (!this.isLoggedIn) {
				this.userInfo = {}
			}
		},
		loadUserInfo() {
			if (!this.isLoggedIn) return
			
			// 从缓存获取用户信息
			const cachedUserInfo = storage.get('userInfo')
			if (cachedUserInfo) {
				this.userInfo = cachedUserInfo
			}
			
			// TODO: 从服务器获取最新用户信息
			console.log('加载用户信息')
		},
		handleMenuClick(item) {
			if (!this.isLoggedIn && item.action !== 'about' && item.action !== 'service') {
				this.goToLogin()
				return
			}

			// 处理菜单点击
			switch (item.action) {
				case 'profile':
					uni.navigateTo({
						url: '/pages/personal-center/personal-center'
					})
					break
				case 'service':
					// TODO: 跳转到客服中心
					console.log('跳转到客服中心')
					break
				case 'about':
					// TODO: 跳转到关于我们
					console.log('跳转到关于我们')
					break
				default:
					console.log('未知操作:', item.action)
			}
		},
		goToLogin() {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		},
		// 跳转到积分商城
		goToPoints() {
			if (!this.isLoggedIn) {
				this.goToLogin()
				return
			}
			uni.navigateTo({
				url: '/pages/points/points'
			})
		},
		// 跳转到卡券中心
		goToCoupon() {
			if (!this.isLoggedIn) {
				this.goToLogin()
				return
			}
			uni.navigateTo({
				url: '/pages/coupon/coupon'
			})
		},
		handleLogout() {
			uni.showModal({
				title: '提示',
				content: '确定要退出登录吗？',
				success: (res) => {
					if (res.confirm) {
						uni.removeStorageSync('token')
						storage.remove('userInfo')
						this.isLoggedIn = false
						this.userInfo = {}
						uni.showToast({
							title: '已退出登录',
							icon: 'success'
						})
					}
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.profile-container {
	min-height: 100vh;
	background-color: $bg-color;
	padding-bottom: 40rpx;
}

.user-card {
	background: linear-gradient(135deg, $brand-blue 0%, $assist-blue 100%);
	padding: $spacing-4;
	margin-bottom: $spacing-3;
}

.user-info {
	display: flex;
	align-items: center;
	margin-bottom: $spacing-4;
}

.avatar {
	width: 128rpx;
	height: 128rpx;
	border-radius: $radius-circle;
	border: 4rpx solid rgba(255, 255, 255, 0.3);
	margin-right: $spacing-3;
}

.user-details {
	flex: 1;
	display: flex;
	flex-direction: column;
}

.username {
	font-size: $font-t2;
	color: #FFFFFF;
	font-weight: 600;
	margin-bottom: $spacing-1;
}

.user-id {
	font-size: $font-t4;
	color: rgba(255, 255, 255, 0.8);
}

.user-stats {
	display: flex;
	background-color: rgba(255, 255, 255, 0.15);
	border-radius: $radius-medium;
	padding: $spacing-3 0;
}

.stat-item {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;

	&:active {
		opacity: 0.7;
	}
}

.stat-value {
	font-size: $font-t2;
	color: #FFFFFF;
	font-weight: 600;
	margin-bottom: $spacing-1;
}

.stat-label {
	font-size: $font-t5;
	color: rgba(255, 255, 255, 0.8);
}

.stat-divider {
	width: 1rpx;
	height: 60rpx;
	background-color: rgba(255, 255, 255, 0.2);
	align-self: center;
}

.section {
	background-color: $card-bg;
	margin-bottom: $spacing-3;
}

.arrow {
	font-size: 40rpx;
	color: $text-secondary;
	margin-left: 4rpx;
}

.menu-list {
	padding: 0 $spacing-4;
}

.menu-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: $spacing-3 0;
	border-bottom: 1rpx solid $divider-color;
}

.menu-item:last-child {
	border-bottom: none;
}

.menu-left {
	display: flex;
	align-items: center;
}

.menu-icon {
	width: 40rpx;
	height: 40rpx;
	margin-right: $spacing-3;
}

.menu-label {
	font-size: $font-t3;
	color: $text-title;
}

.menu-right {
	display: flex;
	align-items: center;
}

.menu-badge {
	font-size: $font-t5;
	color: $assist-red;
	margin-right: $spacing-2;
}

.logout-section {
	padding: 0 $spacing-4;
	margin-top: $spacing-4;
}

.logout-btn {
	width: 100%;
	height: 88rpx;
	background-color: $card-bg;
	color: $text-title;
	font-size: $font-t3;
	border-radius: $radius-medium;
	border: 1rpx solid $divider-color;
}
</style>