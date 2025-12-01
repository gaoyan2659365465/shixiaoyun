<template>
	<view class="message-container">
		<view class="tabs">
			<view 
				v-for="(tab, index) in tabs" 
				:key="index"
				class="tab-item"
				:class="{ active: currentTab === index }"
				@tap="switchTab(index)"
			>
				<text class="tab-text">{{ tab.name }}</text>
				<view v-if="tab.badge > 0" class="badge">{{ tab.badge > 99 ? '99+' : tab.badge }}</view>
			</view>
		</view>
		
		<scroll-view 
			class="message-list" 
			scroll-y 
			@scrolltolower="loadMore"
		>
			<view v-if="messages.length === 0" class="empty-state">
				<image class="empty-icon" src="/static/images/empty-message.png" mode="aspectFit"></image>
				<text class="empty-text">暂无消息</text>
				<text class="empty-hint">您还没有收到任何消息</text>
			</view>
			
			<view v-else class="message-items">
				<view 
					v-for="(item, index) in messages" 
					:key="index"
					class="message-item"
					@tap="openMessage(item)"
				>
					<view class="avatar">
						<image :src="item.avatar" mode="aspectFill"></image>
						<view v-if="item.unread" class="unread-dot"></view>
					</view>
					<view class="message-content">
						<view class="message-header">
							<text class="sender-name">{{ item.senderName }}</text>
							<text class="message-time">{{ item.time }}</text>
						</view>
						<view class="message-preview">
							<text class="preview-text" :class="{ unread: item.unread }">{{ item.content }}</text>
							<view v-if="item.unread" class="unread-badge">{{ item.unreadCount }}</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			currentTab: 0,
			tabs: [
				{ name: '全部', badge: 0 },
				{ name: '系统通知', badge: 0 },
				{ name: '活动消息', badge: 0 }
			],
			messages: []
		}
	},
	onLoad() {
		this.loadMessages()
	},
	onPullDownRefresh() {
		this.loadMessages()
		setTimeout(() => {
			uni.stopPullDownRefresh()
		}, 1000)
	},
	methods: {
		switchTab(index) {
			this.currentTab = index
			this.loadMessages()
		},
		loadMessages() {
			// TODO: 实现消息数据加载
			console.log('加载消息数据，当前标签:', this.currentTab)
		},
		loadMore() {
			// TODO: 实现加载更多
			console.log('加载更多消息')
		},
		openMessage(item) {
			// TODO: 打开消息详情
			console.log('打开消息:', item)
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.message-container {
	min-height: 100vh;
	background-color: $bg-color;
	display: flex;
	flex-direction: column;
}

.tabs {
	display: flex;
	background-color: $card-bg;
	padding: 0 $spacing-4;
	border-bottom: 1rpx solid $divider-color;
}

.tab-item {
	position: relative;
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 88rpx;
}

.tab-text {
	font-size: $font-t3;
	color: $text-body;
	transition: all $transition-duration $transition-timing;
}

.tab-item.active .tab-text {
	color: $brand-blue;
	font-weight: 600;
}

.tab-item.active::after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 48rpx;
	height: 4rpx;
	background-color: $brand-blue;
	border-radius: 2rpx;
}

.badge {
	position: absolute;
	top: 16rpx;
	right: 20rpx;
	min-width: 32rpx;
	height: 32rpx;
	padding: 0 8rpx;
	background-color: $assist-red;
	color: #FFFFFF;
	font-size: $font-t6;
	border-radius: 16rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.message-list {
	flex: 1;
	height: calc(100vh - 88rpx);
}

.empty-state {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 120rpx 0;
}

.empty-icon {
	width: 240rpx;
	height: 240rpx;
	margin-bottom: $spacing-4;
	opacity: 0.6;
}

.empty-text {
	font-size: $font-t3;
	color: $text-body;
	margin-bottom: $spacing-2;
}

.empty-hint {
	font-size: $font-t4;
	color: $text-secondary;
}

.message-items {
	background-color: $card-bg;
}

.message-item {
	display: flex;
	padding: $spacing-3 $spacing-4;
	border-bottom: 1rpx solid $divider-color;
	transition: background-color $transition-duration $transition-timing;
}

.message-item:active {
	background-color: $bg-color;
}

.avatar {
	position: relative;
	width: 96rpx;
	height: 96rpx;
	margin-right: $spacing-3;
	flex-shrink: 0;
}

.avatar image {
	width: 100%;
	height: 100%;
	border-radius: $radius-circle;
}

.unread-dot {
	position: absolute;
	top: 0;
	right: 0;
	width: 16rpx;
	height: 16rpx;
	background-color: $assist-red;
	border: 2rpx solid $card-bg;
	border-radius: $radius-circle;
}

.message-content {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-width: 0;
}

.message-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: $spacing-1;
}

.sender-name {
	font-size: $font-t3;
	color: $text-title;
	font-weight: 500;
}

.message-time {
	font-size: $font-t5;
	color: $text-secondary;
	flex-shrink: 0;
	margin-left: $spacing-2;
}

.message-preview {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.preview-text {
	flex: 1;
	font-size: $font-t4;
	color: $text-body;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.preview-text.unread {
	color: $text-title;
	font-weight: 500;
}

.unread-badge {
	min-width: 32rpx;
	height: 32rpx;
	padding: 0 8rpx;
	background-color: $assist-red;
	color: #FFFFFF;
	font-size: $font-t6;
	border-radius: 16rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: $spacing-2;
	flex-shrink: 0;
}
</style>