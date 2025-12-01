<template>
	<view class="personal-center">
		<view class="header">
			<text class="title">个人中心</text>
		</view>

		<view class="content">
			<view class="info-section">
				<view class="info-item" @tap="handleEdit('name')">
					<text class="label">姓名</text>
					<view class="value-wrapper">
						<text class="value">{{ userInfo.name || '未设置' }}</text>
						<text class="arrow">›</text>
					</view>
				</view>
				<view class="info-item" @tap="handleEdit('companyName')">
					<text class="label">公司名</text>
					<view class="value-wrapper">
						<text class="value">{{ userInfo.companyName || '未设置' }}</text>
						<text class="arrow">›</text>
					</view>
				</view>
				<view class="info-item" @tap="handleEdit('contact')">
					<text class="label">联系方式</text>
					<view class="value-wrapper">
						<text class="value">{{ userInfo.contact || '未设置' }}</text>
						<text class="arrow">›</text>
					</view>
				</view>
				<view class="info-item" @tap="handleEdit('crmCode')">
					<text class="label">CRM编码</text>
					<view class="value-wrapper">
						<text class="value">{{ userInfo.crmCode || '未设置' }}</text>
						<text class="arrow">›</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 编辑弹窗 -->
		<view v-if="showEditModal" class="modal-overlay" @tap="closeModal">
			<view class="modal-content" @tap.stop>
				<view class="modal-header">
					<text class="modal-title">编辑{{ editFieldLabel }}</text>
					<text class="modal-close" @tap="closeModal">×</text>
				</view>
				<view class="modal-body">
					<input
						class="modal-input"
						v-model="editValue"
						:placeholder="'请输入' + editFieldLabel"
						:maxlength="editField === 'crmCode' ? 200 : (editField === 'companyName' ? 100 : 50)"
					/>
				</view>
				<view class="modal-footer">
					<button class="modal-btn cancel-btn" @tap="closeModal">取消</button>
					<button class="modal-btn confirm-btn" @tap="saveEdit">保存</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { storage } from '@/utils/storage.js'

export default {
	data() {
		return {
			userInfo: {},
			showEditModal: false,
			editField: '',
			editFieldLabel: '',
			editValue: ''
		}
	},
	onLoad() {
		this.loadUserInfo()
	},
	onShow() {
		this.loadUserInfo()
	},
	methods: {
		loadUserInfo() {
			// 从本地存储获取用户信息
			const cachedUserInfo = storage.get('userInfo')
			if (cachedUserInfo) {
				this.userInfo = cachedUserInfo
			}
		},

		handleEdit(field) {
			const fieldLabels = {
				name: '姓名',
				companyName: '公司名',
				contact: '联系方式',
				crmCode: 'CRM编码'
			}

			this.editField = field
			this.editFieldLabel = fieldLabels[field]
			this.editValue = this.userInfo[field] || ''
			this.showEditModal = true
		},

		closeModal() {
			this.showEditModal = false
			this.editField = ''
			this.editFieldLabel = ''
			this.editValue = ''
		},

		saveEdit() {
			// 验证输入
			if (!this.editValue.trim()) {
				uni.showToast({
					title: `请输入${this.editFieldLabel}`,
					icon: 'none'
				})
				return
			}

			// 更新用户信息
			this.userInfo[this.editField] = this.editValue.trim()

			// 保存到本地存储
			storage.set('userInfo', this.userInfo)

			// TODO: 调用后端API保存到服务器
			// await userApi.updateProfile(this.userInfo)

			uni.showToast({
				title: '保存成功',
				icon: 'success'
			})

			this.closeModal()
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.personal-center {
	min-height: 100vh;
	background-color: $bg-color;
}

.header {
	background-color: $card-bg;
	padding: $spacing-3 $spacing-4;
	border-bottom: 1rpx solid $divider-color;
}

.title {
	font-size: $font-t2;
	color: $text-title;
	font-weight: 600;
}

.content {
	padding: $spacing-4;
}

.info-section {
	background-color: $card-bg;
	border-radius: $radius-medium;
	padding: 0 $spacing-4;
}

.info-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: $spacing-3 0;
	border-bottom: 1rpx solid $divider-color;
	cursor: pointer;
}

.info-item:last-child {
	border-bottom: none;
}

.info-item:active {
	background-color: rgba(0, 0, 0, 0.05);
}

.label {
	font-size: $font-t3;
	color: $text-body;
}

.value-wrapper {
	display: flex;
	align-items: center;
}

.value {
	font-size: $font-t3;
	color: $text-title;
	font-weight: 500;
	margin-right: $spacing-2;
}

.arrow {
	font-size: 40rpx;
	color: $text-secondary;
}

// 编辑弹窗样式
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
}

.modal-content {
	width: 600rpx;
	background-color: #FFFFFF;
	border-radius: $radius-large;
	overflow: hidden;
}

.modal-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: $spacing-4;
	border-bottom: 1rpx solid $divider-color;
}

.modal-title {
	font-size: $font-t2;
	color: $text-title;
	font-weight: 600;
}

.modal-close {
	font-size: 48rpx;
	color: $text-secondary;
	line-height: 1;
	padding: 0 $spacing-2;
}

.modal-body {
	padding: $spacing-4;
}

.modal-input {
	width: 100%;
	height: 88rpx;
	padding: 0 $spacing-3;
	font-size: $font-t3;
	border: 1rpx solid $divider-color;
	border-radius: $radius-small;
	background-color: $bg-color;
}

.modal-footer {
	display: flex;
	border-top: 1rpx solid $divider-color;
}

.modal-btn {
	flex: 1;
	height: 96rpx;
	font-size: $font-t3;
	border: none;
	border-radius: 0;
	background-color: transparent;
}

.cancel-btn {
	color: $text-secondary;
	border-right: 1rpx solid $divider-color;
}

.confirm-btn {
	color: $brand-blue;
	font-weight: 600;
}
</style>
