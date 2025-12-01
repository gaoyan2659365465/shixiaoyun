<template>
	<view class="section-title" @click="handleClick">
		<view class="left">
			<text class="title">{{ title }}</text>
			<text v-if="subtitle" class="subtitle">{{ subtitle }}</text>
		</view>
		<view v-if="showArrow" class="right">
			<uni-icons type="right" size="16" color="#a7abb2"></uni-icons>
		</view>
	</view>
</template>

<script>
export default {
	name: 'SectionTitle',
	props: {
		title: {
			type: String,
			required: true
		},
		subtitle: {
			type: String,
			default: ''
		},
		showArrow: {
			type: Boolean,
			default: true
		}
	},
	methods: {
		handleClick() {
			if (this.showArrow) {
				this.$emit('click')
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.section-title {
	height: 88rpx;
	padding: 0 $spacing-4;
	display: flex;
	align-items: center;
	justify-content: space-between;
	
	&:active {
		opacity: 0.7;
	}
}

.left {
	display: flex;
	align-items: baseline;
	
	.title {
		font-size: $font-t3;
		font-weight: 500;
		color: $text-title;
		line-height: $line-height-t3;
	}
	
	.subtitle {
		margin-left: $spacing-2;
		font-size: $font-t5;
		color: $text-secondary;
		line-height: $line-height-t5;
	}
}

.right {
	display: flex;
	align-items: center;
}
</style>