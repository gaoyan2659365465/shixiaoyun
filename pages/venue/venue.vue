<template>
	<view class="venue-container">
		<view class="search-section">
			<view class="search-box">
				<image class="search-icon" src="/static/images/icon-search.png" mode="aspectFit"></image>
				<input class="search-input" placeholder="搜索场所" placeholder-style="color: #a7abb2" />
			</view>
		</view>
		
		<view class="content">
			<view class="empty-state">
				<image class="empty-icon" src="/static/images/empty-venue.png" mode="aspectFit"></image>
				<text class="empty-text">暂无场所信息</text>
				<text class="empty-hint">敬请期待更多精彩内容</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			venues: []
		}
	},
	onLoad() {
		// 加载场所数据
		this.loadVenues()
	},
	onPullDownRefresh() {
		this.loadVenues()
		setTimeout(() => {
			uni.stopPullDownRefresh()
		}, 1000)
	},
	methods: {
		loadVenues() {
			// TODO: 实现场所数据加载
			console.log('加载场所数据')
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.venue-container {
	min-height: 100vh;
	background-color: $bg-color;
}

.search-section {
	padding: $spacing-4;
	background-color: $card-bg;
}

.search-box {
	display: flex;
	align-items: center;
	height: 72rpx;
	background-color: $bg-color;
	border-radius: 36rpx;
	padding: 0 $spacing-3;
}

.search-icon {
	width: 32rpx;
	height: 32rpx;
	margin-right: $spacing-2;
}

.search-input {
	flex: 1;
	font-size: $font-t3;
	color: $text-title;
}

.content {
	padding: $spacing-4;
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
</style>