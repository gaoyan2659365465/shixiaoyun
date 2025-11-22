<template>
	<view class="register-container">
		<!-- 顶部标题 -->
		<view class="header">
			<text class="title">欢迎注册</text>
			<text class="subtitle">创建您的视消云账号</text>
		</view>

		<!-- 注册表单 -->
		<view class="register-form">
			<!-- 昵称输入 -->
			<view class="form-item">
				<view class="input-wrapper" :class="{ error: errors.nickname }">
					<text class="required-mark">*</text>
					<image class="input-icon" src="/static/icons/user.png"></image>
					<input
						class="form-input"
						v-model="formData.nickname"
						placeholder="请输入昵称(2-20个字符)"
						maxlength="20"
						@input="clearError('nickname')"
					/>
					<image
						v-if="formData.nickname"
						class="clear-icon"
						src="/static/icons/close.png"
						@click="formData.nickname = ''"
					></image>
				</view>
				<text v-if="errors.nickname" class="error-text">
					<image class="error-icon" src="/static/icons/error.png"></image>
					{{ errors.nickname }}
				</text>
			</view>

			<!-- 手机号输入 -->
			<view class="form-item">
				<view class="input-wrapper" :class="{ error: errors.phone }">
					<text class="required-mark">*</text>
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
				<text v-if="errors.phone" class="error-text">
					<image class="error-icon" src="/static/icons/error.png"></image>
					{{ errors.phone }}
				</text>
			</view>

			<!-- 邮箱输入 -->
			<view class="form-item">
				<view class="input-wrapper" :class="{ error: errors.email }">
					<text class="required-mark">*</text>
					<image class="input-icon" src="/static/icons/email.png"></image>
					<input
						class="form-input"
						type="text"
						v-model="formData.email"
						placeholder="请输入邮箱"
						@input="clearError('email')"
					/>
					<image
						v-if="formData.email"
						class="clear-icon"
						src="/static/icons/close.png"
						@click="formData.email = ''"
					></image>
				</view>
				<text v-if="errors.email" class="error-text">
					<image class="error-icon" src="/static/icons/error.png"></image>
					{{ errors.email }}
				</text>
			</view>

			<!-- 邮箱验证码输入 -->
			<view class="form-item">
				<view class="input-wrapper" :class="{ error: errors.emailCode }">
					<text class="required-mark">*</text>
					<image class="input-icon" src="/static/icons/code.png"></image>
					<input
						class="form-input"
						type="number"
						v-model="formData.emailCode"
						placeholder="请输入邮箱验证码"
						maxlength="6"
						@input="clearError('emailCode')"
					/>
					<view class="code-btn" @click="sendEmailCode" :class="{ disabled: emailCodeCountdown > 0 }">
						{{ emailCodeCountdown > 0 ? `${emailCodeCountdown}s` : '获取验证码' }}
					</view>
				</view>
				<text v-if="errors.emailCode" class="error-text">
					<image class="error-icon" src="/static/icons/error.png"></image>
					{{ errors.emailCode }}
				</text>
			</view>

			<!-- 密码输入 -->
			<view class="form-item">
				<view class="input-wrapper" :class="{ error: errors.password }">
					<text class="required-mark">*</text>
					<image class="input-icon" src="/static/icons/lock.png"></image>
					<input
						class="form-input"
						:type="showPassword ? 'text' : 'password'"
						v-model="formData.password"
						placeholder="请输入密码(6-20位,包含字母和数字)"
						maxlength="20"
						@input="clearError('password')"
					/>
					<image
						class="eye-icon"
						:src="showPassword ? '/static/icons/eye-open.png' : '/static/icons/eye-close.png'"
						@click="showPassword = !showPassword"
					></image>
				</view>
				<text v-if="errors.password" class="error-text">
					<image class="error-icon" src="/static/icons/error.png"></image>
					{{ errors.password }}
				</text>
			</view>

			<!-- 确认密码输入 -->
			<view class="form-item">
				<view class="input-wrapper" :class="{ error: errors.confirmPassword }">
					<text class="required-mark">*</text>
					<image class="input-icon" src="/static/icons/lock.png"></image>
					<input
						class="form-input"
						:type="showConfirmPassword ? 'text' : 'password'"
						v-model="formData.confirmPassword"
						placeholder="请再次输入密码"
						maxlength="20"
						@input="clearError('confirmPassword')"
					/>
					<image
						class="eye-icon"
						:src="showConfirmPassword ? '/static/icons/eye-open.png' : '/static/icons/eye-close.png'"
						@click="showConfirmPassword = !showConfirmPassword"
					></image>
				</view>
				<text v-if="errors.confirmPassword" class="error-text">
					<image class="error-icon" src="/static/icons/error.png"></image>
					{{ errors.confirmPassword }}
				</text>
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

		<!-- 注册按钮 -->
		<button
			class="register-btn"
			:class="{ loading: isLoading, disabled: !canSubmit }"
			:disabled="!canSubmit"
			@click="handleRegister"
		>
			<text v-if="isLoading">注册中...</text>
			<text v-else>注册</text>
		</button>

		<!-- 登录入口 -->
		<view class="login-link">
			<text>已有账号?</text>
			<text class="link" @click="goToLogin">立即登录</text>
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
			showPassword: false,
			showConfirmPassword: false,
			agreedToTerms: false,
			isLoading: false,
			emailCodeCountdown: 0,
			formData: {
				nickname: '',
				phone: '',
				email: '',
				emailCode: '',
				password: '',
				confirmPassword: ''
			},
			errors: {
				nickname: '',
				phone: '',
				email: '',
				emailCode: '',
				password: '',
				confirmPassword: ''
			}
		}
	},
	computed: {
		canSubmit() {
			return (
				this.agreedToTerms &&
				this.formData.nickname &&
				this.formData.phone &&
				this.formData.email &&
				this.formData.emailCode &&
				this.formData.password &&
				this.formData.confirmPassword &&
				!this.isLoading
			)
		}
	},
	methods: {
		// 清除单个错误
		clearError(field) {
			this.errors[field] = ''
		},

		// 清除所有错误
		clearAllErrors() {
			this.errors = {
				nickname: '',
				phone: '',
				email: '',
				emailCode: '',
				password: '',
				confirmPassword: ''
			}
		},

		// 表单验证
		validateForm() {
			this.clearAllErrors()
			let isValid = true

			// 验证昵称
			if (!this.formData.nickname) {
				this.errors.nickname = '请输入昵称'
				isValid = false
			} else if (!validator.isNickname(this.formData.nickname)) {
				this.errors.nickname = '昵称长度为2-20个字符'
				isValid = false
			}

			// 验证手机号
			if (!this.formData.phone) {
				this.errors.phone = '请输入手机号'
				isValid = false
			} else if (!validator.isPhone(this.formData.phone)) {
				this.errors.phone = '请输入正确的手机号'
				isValid = false
			}

			// 验证邮箱
			if (!this.formData.email) {
				this.errors.email = '请输入邮箱'
				isValid = false
			} else if (!validator.isEmail(this.formData.email)) {
				this.errors.email = '请输入正确的邮箱地址'
				isValid = false
			}

			// 验证邮箱验证码
			if (!this.formData.emailCode) {
				this.errors.emailCode = '请输入邮箱验证码'
				isValid = false
			} else if (!validator.isCode(this.formData.emailCode)) {
				this.errors.emailCode = '请输入6位数字验证码'
				isValid = false
			}

			// 验证密码
			if (!this.formData.password) {
				this.errors.password = '请输入密码'
				isValid = false
			} else if (!validator.isPassword(this.formData.password)) {
				this.errors.password = '密码为6-20位,需包含字母和数字'
				isValid = false
			}

			// 验证确认密码
			if (!this.formData.confirmPassword) {
				this.errors.confirmPassword = '请再次输入密码'
				isValid = false
			} else if (this.formData.password !== this.formData.confirmPassword) {
				this.errors.confirmPassword = '两次输入的密码不一致'
				isValid = false
			}

			return isValid
		},

		// 发送邮箱验证码
		async sendEmailCode() {
			if (this.emailCodeCountdown > 0) return

			// 验证邮箱
			if (!this.formData.email) {
				this.errors.email = '请输入邮箱'
				return
			}
			if (!validator.isEmail(this.formData.email)) {
				this.errors.email = '请输入正确的邮箱地址'
				return
			}

			try {
				await userApi.sendEmailCode(this.formData.email)
				uni.showToast({
					title: '验证码已发送',
					icon: 'success'
				})

				// 开始倒计时
				this.emailCodeCountdown = 60
				const timer = setInterval(() => {
					this.emailCodeCountdown--
					if (this.emailCodeCountdown <= 0) {
						clearInterval(timer)
					}
				}, 1000)
			} catch (error) {
				console.error('发送验证码失败:', error)
			}
		},

		// 处理注册
		async handleRegister() {
			if (!this.canSubmit) return

			if (!this.validateForm()) return

			this.isLoading = true

			try {
				const res = await userApi.register({
					nickname: this.formData.nickname,
					phone: this.formData.phone,
					email: this.formData.email,
					emailCode: this.formData.emailCode,
					password: this.formData.password
				})

				uni.showToast({
					title: '注册成功',
					icon: 'success'
				})

				// 跳转到登录页
				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/login/login'
					})
				}, 1500)

			} catch (error) {
				console.error('注册失败:', error)
			} finally {
				this.isLoading = false
			}
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

		// 去登录
		goToLogin() {
			uni.navigateBack()
		}
	}
}
</script>

<style scoped>
.register-container {
	min-height: 100vh;
	background-color: #F5F6FA;
	padding: 48rpx 32rpx;
}

/* 顶部标题 */
.header {
	margin-bottom: 60rpx;
	margin-top: 40rpx;
}

.title {
	display: block;
	font-size: 48rpx;
	font-weight: 600;
	color: #17171a;
	margin-bottom: 16rpx;
}

.subtitle {
	display: block;
	font-size: 28rpx;
	color: #656a73;
}

/* 注册表单 */
.register-form {
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
	position: relative;
}

.input-wrapper.error {
	border-color: #f34545;
}

.required-mark {
	color: #f34545;
	font-size: 32rpx;
	margin-right: 8rpx;
	line-height: 1;
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
	display: flex;
	align-items: center;
	margin-top: 8rpx;
	margin-left: 24rpx;
	font-size: 24rpx;
	color: #f34545;
}

.error-icon {
	width: 24rpx;
	height: 24rpx;
	margin-right: 4rpx;
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

/* 注册按钮 */
.register-btn {
	width: 100%;
	height: 112rpx;
	background-color: #4458ff;
	color: #fff;
	font-size: 32rpx;
	font-weight: 500;
	border-radius: 16rpx;
	border: none;
	margin-bottom: 32rpx;
}

.register-btn.loading {
	opacity: 0.8;
}

.register-btn.disabled {
	background-color: #a7abb2;
	opacity: 0.6;
}

.register-btn::after {
	border: none;
}

/* 登录入口 */
.login-link {
	text-align: center;
	font-size: 28rpx;
	color: #656a73;
}

.login-link .link {
	margin-left: 8rpx;
}
</style>
