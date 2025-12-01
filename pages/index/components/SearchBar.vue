<template>
	<view class="search-bar-container">
		<view class="search-bar" @click="handleClick">
			<uni-icons type="search" size="16" color="#a7abb2"></uni-icons>
			<text class="placeholder">{{ placeholder }}</text>
		</view>
	</view>
</template>

<script>
export default {
	name: 'SearchBar',
	props: {
		placeholder: {
			type: String,
			default: 'Search'
		},
		backgroundColor: {
			type: String,
			default: '#FFFFFF'
		}
	},
	methods: {
		handleClick() {
			this.$emit('click')
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.search-bar-container {
	padding: $spacing-3 $spacing-4;
	background-color: $bg-color;
}

.search-bar {
	height: 56rpx;
	background-color: $card-bg;
	border-radius: $radius-medium;
	padding: 0 $spacing-3;
	display: flex;
	align-items: center;
	transition: all $transition-duration $transition-timing;
	
	&:active {
		opacity: 0.8;
	}
	
	.placeholder {
		margin-left: $spacing-2;
		font-size: $font-t4;
		color: $text-secondary;
		line-height: $line-height-t4;
	}
}
</style>