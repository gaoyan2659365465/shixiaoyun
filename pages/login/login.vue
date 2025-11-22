<template>
	<view class="login-container">
		<!-- Logo区域 -->
		<view class="logo-section">
			<image class="logo" src="/static/logo.png" mode="aspectFit"></image>
			<text class="app-name">视消云</text>
		</view>

		<!-- 登录方式切换 -->
		<view class="login-type-tabs">
			<view
				class="tab-item"
				:class="{ active: loginType === 'password' }"
				@click="switchLoginType('password')"
			>
				密码登录
			</view>
			<view
				class="tab-item"
				:class="{ active: loginType === 'code' }"
				@click="switchLoginType('code')"
			>
				验证码登录
			</view>
		</view>

		<!-- 登录表单 -->
		<view class="login-form">
			<!-- 手机号输入 -->
			<view class="form-item">
				<view class="input-wrapper" :class="{ error: errors.phone }">
					<image class="input-icon" src="/static/icons/phone.png"></image>
					<input
						class="form-input"
						type="number"
						v-model="formData.phone"
						placeholder="请输入手机号"
						maxlength="11"
						@input="clearError('phone')"
					/>
					<image
						v-if="formData.phone"
						class="clear-icon"
						src="/static/icons/close.png"
						@click="formData.phone = ''"
					></image>
				</view>
				<text v-if="errors.phone" class="error-text">{{ errors.phone }}</text>
			</view>

			<!-- 密码输入 -->
			<view v-if="loginType === 'password'" class="form-item">
				<view class="input-wrapper" :class="{ error: errors.password }">
					<image class="input-icon" src="/static/icons/lock.png"></image>
					<input
						class="form-input"
						:type="showPassword ? 'text' : 'password'"
						v-model="formData.password"
						placeholder="请输入密码"
						@input="clearError('password')"
					/>
					<image
						class="eye-icon"
						:src="showPassword ? '/static/icons/eye-open.png' : '/static/icons/eye-close.png'"
						@click="showPassword = !showPassword"
					></image>
				</view>
				<text v-if="errors.password" class="error-text">{{ errors.password }}</text>
			</view>

			<!-- 验证码输入 -->
			<view v-if="loginType === 'code'" class="form-item">
				<view class="input-wrapper" :class="{ error: errors.code }">
					<image class="input-icon" src="/static/icons/code.png"></image>
					<input
						class="form-input"
						type="number"
						v-model="formData.code"
						placeholder="请输入验证码"
						maxlength="6"
						@input="clearError('code')"
					/>
					<view class="code-btn" @click="sendCode" :class="{ disabled: codeCountdown > 0 }">
						{{ codeCountdown > 0 ? `${codeCountdown}s` : '获取验证码' }}
					</view>
				</view>
				<text v-if="errors.code" class="error-text">{{ errors.code }}</text>
			</view>
		</view>

		<!-- 隐私协议 -->
		<view class="agreement-section">
			<checkbox-group @change="onAgreementChange">
				<label class="agreement-label">
					<checkbox :checked="agreedToTerms" color="#4458ff" />
					<text class="agreement-text">
						我已阅读并同意
						<text class="link" @click.stop="viewAgreement('privacy')">《隐私协议》</text>
						和
						<text class="link" @click.stop="viewAgreement('service')">《服务协议》</text>
					</text>
				</label>
			</checkbox-group>
		</view>

		<!-- 登录按钮 -->
		<button
			class="login-btn"
			:class="{ loading: isLoading, disabled: !canSubmit }"
			:disabled="!canSubmit"
			@click="handleLogin"
		>
			<text v-if="isLoading">登录中...</text>
			<text v-else>登录</text>
		</button>

		<!-- 微信登录 -->
		<view class="wechat-login">
			<view class="divider">
				<text>其他登录方式</text>
			</view>
			<view class="wechat-btn" @click="handleWechatLogin">
				<image class="wechat-icon" src="/static/icons/wechat.png"></image>
				<text>微信登录</text>
			</view>
		</view>

		<!-- 注册入口 -->
		<view class="register-link">
			<text>还没有账号?</text>
			<text class="link" @click="goToRegister">立即注册</text>
		</view>
	</view>
</template>

<script>
import { userApi } from '@/api/user.js'
import { validator } from '@/utils/validator.js'
import { storage } from '@/utils/storage.js'

export default {
	data() {
		return {
			loginType: 'password', // password | code
			showPassword: false,
			agreedToTerms: false,
			isLoading: false,
			codeCountdown: 0,
			formData: {
				phone: '',
				password: '',
				code: ''
			},
			errors: {
				phone: '',
				password: '',
				code: ''
			}
		}
	},
	computed: {
		canSubmit() {
			return this.agreedToTerms && this.formData.phone && !this.isLoading
		}
	},
	methods: {
		// 切换登录方式
		switchLoginType(type) {
			this.loginType = type
			this.clearAllErrors()
		},

		// 清除单个错误
		clearError(field) {
			this.errors[field] = ''
		},

		// 清除所有错误
		clearAllErrors() {
			this.errors = {
				phone: '',
				password: '',
				code: ''
			}
		},

		// 表单验证
		validateForm() {
			this.clearAllErrors()
			let isValid = true

			// 验证手机号
			if (!this.formData.phone) {
				this.errors.phone = '请输入手机号'
				isValid = false
			} else if (!validator.isPhone(this.formData.phone)) {
				this.errors.phone = '请输入正确的手机号'
				isValid = false
			}

			// 验证密码
			if (this.loginType === 'password') {
				if (!this.formData.password) {
					this.errors.password = '请输入密码'
					isValid = false
				}
			}

			// 验证验证码
			if (this.loginType === 'code') {
				if (!this.formData.code) {
					this.errors.code = '请输入验证码'
					isValid = false
				} else if (!validator.isCode(this.formData.code)) {
					this.errors.code = '请输入6位数字验证码'
					isValid = false
				}
			}

			return isValid
		},

		// 发送验证码
		async sendCode() {
			if (this.codeCountdown > 0) return

			// 验证手机号
			if (!this.formData.phone) {
				this.errors.phone = '请输入手机号'
				return
			}
			if (!validator.isPhone(this.formData.phone)) {
				this.errors.phone = '请输入正确的手机号'
				return
			}

			try {
				await userApi.sendSmsCode(this.formData.phone)
				uni.showToast({
					title: '验证码已发送',
					icon: 'success'
				})

				// 开始倒计时
				this.codeCountdown = 60
				const timer = setInterval(() => {
					this.codeCountdown--
					if (this.codeCountdown <= 0) {
						clearInterval(timer)
					}
				}, 1000)
			} catch (error) {
				console.error('发送验证码失败:', error)
			}
		},

		// 处理登录
		async handleLogin() {
			if (!this.canSubmit) return

			if (!this.validateForm()) return

			this.isLoading = true

			try {
				let res
				if (this.loginType === 'password') {
					res = await userApi.loginByPassword({
						phone: this.formData.phone,
						password: this.formData.password
					})
				} else {
					res = await userApi.loginByCode({
						phone: this.formData.phone,
						code: this.formData.code
					})
				}

				// 保存token和用户信息
				storage.set('token', res.data.token)
				storage.set('userInfo', res.data.userInfo)

				uni.showToast({
					title: '登录成功',
					icon: 'success'
				})

				// 跳转到首页
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/index/index'
					})
				}, 1500)

			} catch (error) {
				console.error('登录失败:', error)
			} finally {
				this.isLoading = false
			}
		},

		// 微信登录
		handleWechatLogin() {
			if (!this.agreedToTerms) {
				uni.showToast({
					title: '请先同意隐私协议和服务协议',
					icon: 'none'
				})
				return
			}

			// 微信登录逻辑
			uni.login({
				provider: 'weixin',
				success: async (loginRes) => {
					try {
						const res = await userApi.loginByWechat({
							code: loginRes.code
						})

						storage.set('token', res.data.token)
						storage.set('userInfo', res.data.userInfo)

						uni.showToast({
							title: '登录成功',
							icon: 'success'
						})

						setTimeout(() => {
							uni.switchTab({
								url: '/pages/index/index'
							})
						}, 1500)

					} catch (error) {
						console.error('微信登录失败:', error)
					}
				},
				fail: (err) => {
					console.error('获取微信登录凭证失败:', err)
					uni.showToast({
						title: '微信登录失败',
						icon: 'none'
					})
				}
			})
		},

		// 协议勾选变化
		onAgreementChange(e) {
			this.agreedToTerms = e.detail.value.length > 0
		},

		// 查看协议
		viewAgreement(type) {
			uni.navigateTo({
				url: `/pages/agreement/agreement?type=${type}`
			})
		},

		// 去注册
		goToRegister() {
			uni.navigateTo({
				url: '/pages/register/register'
			})
		}
	}
}
</script>

<style scoped>
.login-container {
	min-height: 100vh;
	background-color: #F5F6FA;
	padding: 48rpx 32rpx;
}

/* Logo区域 */
.logo-section {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 80rpx;
	margin-top: 60rpx;
}

.logo {
	width: 160rpx;
	height: 160rpx;
	margin-bottom: 24rpx;
}

.app-name {
	font-size: 48rpx;
	font-weight: 600;
	color: #17171a;
}

/* 登录方式切换 */
.login-type-tabs {
	display: flex;
	justify-content: center;
	margin-bottom: 48rpx;
}

.tab-item {
	padding: 16rpx 32rpx;
	margin: 0 16rpx;
	font-size: 32rpx;
	color: #656a73;
	position: relative;
}

.tab-item.active {
	color: #4458ff;
	font-weight: 500;
}

.tab-item.active::after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 48rpx;
	height: 4rpx;
	background-color: #4458ff;
	border-radius: 2rpx;
}

/* 登录表单 */
.login-form {
	margin-bottom: 32rpx;
}

.form-item {
	margin-bottom: 32rpx;
}

.input-wrapper {
	display: flex;
	align-items: center;
	height: 112rpx;
	background-color: #fff;
	border-radius: 16rpx;
	padding: 0 24rpx;
	border: 2rpx solid transparent;
}

.input-wrapper.error {
	border-color: #f34545;
}

.input-icon {
	width: 40rpx;
	height: 40rpx;
	margin-right: 16rpx;
}

.form-input {
	flex: 1;
	font-size: 28rpx;
	color: #17171a;
}

.clear-icon,
.eye-icon {
	width: 36rpx;
	height: 36rpx;
	margin-left: 16rpx;
}

.code-btn {
	padding: 12rpx 24rpx;
	font-size: 24rpx;
	color: #4458ff;
	white-space: nowrap;
}

.code-btn.disabled {
	color: #a7abb2;
}

.error-text {
	display: block;
	margin-top: 8rpx;
	margin-left: 24rpx;
	font-size: 24rpx;
	color: #f34545;
}

/* 隐私协议 */
.agreement-section {
	margin-bottom: 32rpx;
}

.agreement-label {
	display: flex;
	align-items: center;
}

.agreement-text {
	font-size: 24rpx;
	color: #656a73;
	margin-left: 8rpx;
}

.link {
	color: #4458ff;
}

/* 登录按钮 */
.login-btn {
	width: 100%;
	height: 112rpx;
	background-color: #4458ff;
	color: #fff;
	font-size: 32rpx;
	font-weight: 500;
	border-radius: 16rpx;
	border: none;
	margin-bottom: 48rpx;
}

.login-btn.loading {
	opacity: 0.8;
}

.login-btn.disabled {
	background-color: #a7abb2;
	opacity: 0.6;
}

.login-btn::after {
	border: none;
}

/* 微信登录 */
.wechat-login {
	margin-bottom: 32rpx;
}

.divider {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 32rpx;
	color: #a7abb2;
	font-size: 24rpx;
}

.divider::before,
.divider::after {
	content: '';
	flex: 1;
	height: 1rpx;
	background-color: #E5E6EA;
	margin: 0 16rpx;
}

.wechat-btn {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.wechat-icon {
	width: 88rpx;
	height: 88rpx;
	margin-bottom: 16rpx;
}

.wechat-btn text {
	font-size: 24rpx;
	color: #656a73;
}

/* 注册入口 */
.register-link {
	text-align: center;
	font-size: 28rpx;
	color: #656a73;
}

.register-link .link {
	margin-left: 8rpx;
}
</style>
