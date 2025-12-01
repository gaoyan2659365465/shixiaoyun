<template>
	<view class="banner-swiper-container">
		<swiper 
			class="banner-swiper"
			:autoplay="autoplay"
			:interval="interval"
			:duration="duration"
			:indicator-dots="true"
			indicator-color="rgba(255,255,255,0.5)"
			indicator-active-color="#FFFFFF"
			@change="handleChange"
		>
			<swiper-item 
				v-for="(banner, index) in banners" 
				:key="banner.id"
				@click="handleClick(banner, index)"
			>
				<view class="banner-item">
					<image 
						:src="banner.image" 
						mode="aspectFill"
						class="banner-image"
					></image>
					<view class="banner-content">
						<text class="banner-title">{{ banner.title }}</text>
						<text class="banner-subtitle">{{ banner.subtitle }}</text>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	name: 'BannerSwiper',
	props: {
		banners: {
			type: Array,
			required: true,
			default: () => []
		},
		autoplay: {
			type: Boolean,
			default: true
		},
		interval: {
			type: Number,
			default: 3000
		},
		duration: {
			type: Number,
			default: 500
		}
	},
	data() {
		return {
			currentIndex: 0
		}
	},
	methods: {
		handleChange(e) {
			this.currentIndex = e.detail.current
		},
		handleClick(banner, index) {
			this.$emit('click', { banner, index })
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.banner-swiper-container {
	padding: 0 $spacing-4 $spacing-3;
}

.banner-swiper {
	height: 280rpx;
	border-radius: $radius-medium;
	overflow: hidden;
}

.banner-item {
	width: 100%;
	height: 100%;
	position: relative;
}

.banner-image {
	width: 100%;
	height: 100%;
	display: block;
}

.banner-content {
	position: absolute;
	left: 0;
	bottom: 0;
	right: 0;
	padding: $spacing-3;
	background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
	
	.banner-title {
		display: block;
		font-size: $font-t2;
		font-weight: 600;
		color: #FFFFFF;
		line-height: $line-height-t2;
		margin-bottom: $spacing-1;
	}
	
	.banner-subtitle {
		display: block;
		font-size: $font-t5;
		color: rgba(255,255,255,0.8);
		line-height: $line-height-t5;
	}
}
</style>