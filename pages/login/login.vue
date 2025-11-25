<template>
	<view class="login-container">
		<view class="title">积分商城</view>
		
		<view class="register-text">注册新用户</view>
		
		<view class="agreement">
			<checkbox :checked="agreed" @tap="agreed = !agreed" color="#000" />
			<text>我已阅读并同意《用户协议》《隐私条款》</text>
		</view>
		
		<button class="auth-btn" @tap="handleAuth">一键授权登录</button>
		
		<text class="skip-link" @tap="skipLogin">暂不登录</text>
		
		<view class="divider">
			<view class="line"></view>
			<text>or</text>
			<view class="line"></view>
		</view>
		
		<button class="register-btn" @tap="goRegister">注册新用户</button>
	</view>
</template>

<script>
import { userApi } from '@/api/user.js'
import { storage } from '@/utils/storage.js'

export default {
	data() {
		return {
			agreed: false
		}
	},
	methods: {
		async handleAuth() {
			if (!this.agreed) {
				uni.showToast({ title: '请先同意用户协议和隐私条款', icon: 'none' })
				return
			}
			
			try {
				uni.showLoading({ title: '登录中...' })
				const loginRes = await uni.login({ provider: 'weixin' })
				const res = await userApi.loginByWechat({ code: loginRes.code })
				
				uni.setStorageSync('token', res.data.token)
				storage.set('userInfo', res.data.userInfo)
				
				uni.showToast({ title: '登录成功', icon: 'success' })
				setTimeout(() => {
					uni.switchTab({ url: '/pages/index/index' })
				}, 1500)
			} catch (e) {
				console.error('授权登录失败:', e)
			} finally {
				uni.hideLoading()
			}
		},
		skipLogin() {
			uni.switchTab({ url: '/pages/index/index' })
		},
		goRegister() {
			uni.navigateTo({ url: '/pages/register/register' })
		}
	}
}
</script>

<style scoped>
.login-container {
	min-height: 100vh;
	background-color: #FFFFFF;
	padding: 0 40rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.title {
	font-size: 48rpx;
	font-weight: 600;
	color: #000;
	margin-top: 200rpx;
	margin-bottom: 120rpx;
}

.register-text {
	font-size: 32rpx;
	color: #000;
	margin-bottom: 40rpx;
}

.agreement {
	display: flex;
	align-items: center;
	font-size: 24rpx;
	color: #666;
	margin-bottom: 60rpx;
}

.agreement checkbox {
	margin-right: 12rpx;
	transform: scale(0.8);
}

.auth-btn {
	width: 670rpx;
	height: 96rpx;
	background-color: #000;
	color: #FFF;
	font-size: 32rpx;
	border-radius: 48rpx;
	border: none;
	margin-bottom: 40rpx;
}

.skip-link {
	font-size: 28rpx;
	color: #000;
	margin-bottom: 60rpx;
}

.divider {
	display: flex;
	align-items: center;
	width: 670rpx;
	margin-bottom: 60rpx;
}

.divider .line {
	flex: 1;
	height: 1rpx;
	background-color: #E5E5E5;
}

.divider text {
	font-size: 24rpx;
	color: #999;
	margin: 0 20rpx;
}

.register-btn {
	width: 670rpx;
	height: 96rpx;
	background-color: #F5F5F5;
	color: #666;
	font-size: 32rpx;
	border-radius: 48rpx;
	border: none;
}
</style>