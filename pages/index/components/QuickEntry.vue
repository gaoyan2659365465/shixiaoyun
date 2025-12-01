<template>
	<view class="quick-entry-container">
		<view class="entry-grid">
			<view 
				v-for="entry in entries" 
				:key="entry.id"
				class="entry-item"
				@click="handleClick(entry)"
			>
				<view class="icon-wrapper">
					<image :src="entry.icon" class="icon" mode="aspectFit"></image>
					<view v-if="entry.badge" class="badge">{{ entry.badge }}</view>
				</view>
				<text class="title">{{ entry.title }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'QuickEntry',
	props: {
		entries: {
			type: Array,
			required: true,
			default: () => []
		}
	},
	methods: {
		handleClick(entry) {
			this.$emit('click', entry)
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.quick-entry-container {
	padding: $spacing-4;
}

.entry-grid {
	display: flex;
	justify-content: space-around;
	align-items: flex-start;
}

.entry-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
	
	&:active {
		opacity: 0.7;
	}
}

.icon-wrapper {
	width: 120rpx;
	height: 120rpx;
	border-radius: $radius-circle;
	background-color: $card-bg;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: $shadow-medium;
	position: relative;
	margin-bottom: $spacing-2;
}

.icon {
	width: 64rpx;
	height: 64rpx;
}

.badge {
	position: absolute;
	top: -4rpx;
	right: -4rpx;
	min-width: 32rpx;
	height: 32rpx;
	padding: 0 $spacing-1;
	background-color: $assist-red;
	color: #FFFFFF;
	font-size: $font-t6;
	line-height: 32rpx;
	text-align: center;
	border-radius: $radius-medium;
	border: 2rpx solid #FFFFFF;
}

.title {
	font-size: $font-t5;
	color: $text-body;
	line-height: $line-height-t5;
	text-align: center;
}
</style>