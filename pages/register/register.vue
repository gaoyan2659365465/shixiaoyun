<template>
	<view class="register-container">
		<!-- 自定义导航栏 -->
		<view class="custom-navbar">
			<view class="back-btn" @tap="goBack">
				<text class="back-icon">‹</text>
			</view>
			<view class="navbar-title">新用户注册</view>
		</view>
		
		<!-- 表单容器 -->
		<view class="form-container">
			<!-- 姓名 -->
			<view class="form-item">
				<text class="form-label">姓名</text>
				<input 
					class="form-input" 
					v-model="formData.name" 
					placeholder="Value"
					placeholder-class="input-placeholder"
				/>
			</view>
			
			<!-- 公司名称 -->
			<view class="form-item">
				<text class="form-label">公司名称</text>
				<input 
					class="form-input" 
					v-model="formData.companyName" 
					placeholder="Value"
					placeholder-class="input-placeholder"
				/>
			</view>
			
			<!-- 联系方式 -->
			<view class="form-item">
				<text class="form-label">联系方式</text>
				<input 
					class="form-input" 
					v-model="formData.contact" 
					placeholder="Value"
					placeholder-class="input-placeholder"
				/>
			</view>
			
			<!-- CRM编码 -->
			<view class="form-item">
				<text class="form-label">CRM编码</text>
				<textarea 
					class="form-textarea" 
					v-model="formData.crmCode" 
					placeholder="Value"
					placeholder-class="input-placeholder"
					:maxlength="-1"
				/>
			</view>
			
			<!-- 隐私条款 -->
			<view class="agreement">
				<checkbox 
					:checked="agreed" 
					@tap="agreed = !agreed" 
					color="#000"
					class="agreement-checkbox"
				/>
				<text class="agreement-text">隐私条款</text>
			</view>
			
			<!-- 提交按钮 -->
			<button class="submit-btn" @tap="handleSubmit">报名参加</button>
		</view>
	</view>
</template>

<script>
import { userApi } from '@/api/user.js'

export default {
	data() {
		return {
			formData: {
				name: '',
				companyName: '',
				contact: '',
				crmCode: ''
			},
			agreed: false
		}
	},
	methods: {
		goBack() {
			uni.navigateBack()
		},
		
		validateForm() {
			if (!this.formData.name.trim()) {
				uni.showToast({ title: '请输入姓名', icon: 'none' })
				return false
			}
			if (!this.formData.companyName.trim()) {
				uni.showToast({ title: '请输入公司名称', icon: 'none' })
				return false
			}
			if (!this.formData.contact.trim()) {
				uni.showToast({ title: '请输入联系方式', icon: 'none' })
				return false
			}
			if (!this.formData.crmCode.trim()) {
				uni.showToast({ title: '请输入CRM编码', icon: 'none' })
				return false
			}
			if (!this.agreed) {
				uni.showToast({ title: '请先同意隐私条款', icon: 'none' })
				return false
			}
			return true
		},
		
		async handleSubmit() {
			if (!this.validateForm()) {
				return
			}
			
			try {
				uni.showLoading({ title: '提交中...' })
				
				const res = await userApi.register({
					name: this.formData.name,
					companyName: this.formData.companyName,
					contact: this.formData.contact,
					crmCode: this.formData.crmCode
				})
				
				uni.showToast({ 
					title: '注册成功', 
					icon: 'success',
					duration: 2000
				})
				
				setTimeout(() => {
					uni.navigateBack()
				}, 2000)
				
			} catch (e) {
				console.error('注册失败:', e)
				uni.showToast({ 
					title: e.message || '注册失败，请重试', 
					icon: 'none' 
				})
			} finally {
				uni.hideLoading()
			}
		}
	}
}
</script>

<style scoped>
.register-container {
	min-height: 100vh;
	background-color: #F5F5F5;
}

/* 自定义导航栏 */
.custom-navbar {
	position: relative;
	height: 88rpx;
	background-color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
	border-bottom: 1rpx solid #E5E5E5;
}

.back-btn {
	position: absolute;
	left: 32rpx;
	width: 48rpx;
	height: 48rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.back-icon {
	font-size: 48rpx;
	color: #000;
	font-weight: 300;
	line-height: 1;
}

.navbar-title {
	font-size: 34rpx;
	font-weight: 500;
	color: #000;
}

/* 表单容器 */
.form-container {
	margin: 32rpx 32rpx 0;
	background-color: #FFFFFF;
	border-radius: 16rpx;
	padding: 48rpx 32rpx;
}

/* 表单项 */
.form-item {
	margin-bottom: 48rpx;
}

.form-label {
	display: block;
	font-size: 28rpx;
	color: #000;
	margin-bottom: 16rpx;
	font-weight: 400;
}

.form-input {
	width: 100%;
	height: 80rpx;
	background-color: #F5F5F5;
	border-radius: 8rpx;
	padding: 0 24rpx;
	font-size: 28rpx;
	color: #000;
	border: none;
}

.form-textarea {
	width: 100%;
	min-height: 160rpx;
	background-color: #F5F5F5;
	border-radius: 8rpx;
	padding: 20rpx 24rpx;
	font-size: 28rpx;
	color: #000;
	border: none;
	box-sizing: border-box;
}

.input-placeholder {
	color: #C0C0C0;
	font-size: 28rpx;
}

/* 隐私条款 */
.agreement {
	display: flex;
	align-items: center;
	margin-top: 80rpx;
	margin-bottom: 48rpx;
}

.agreement-checkbox {
	margin-right: 16rpx;
	transform: scale(1);
}

.agreement-text {
	font-size: 28rpx;
	color: #000;
	font-weight: 400;
}

/* 提交按钮 */
.submit-btn {
	width: 100%;
	height: 88rpx;
	background-color: #000;
	color: #FFF;
	font-size: 32rpx;
	font-weight: 500;
	border-radius: 44rpx;
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
}

.submit-btn::after {
	border: none;
}
</style>