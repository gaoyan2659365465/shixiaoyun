<template>
	<view class="product-card" @click="handleCardClick">
		<!-- 商品图片 -->
		<image 
			class="product-image" 
			:src="product.image" 
			mode="aspectFill"
		/>
		
		<!-- 商品信息 -->
		<view class="product-info">
			<!-- 商品标题 -->
			<text class="product-title">{{ product.title }}</text>
			
			<!-- 库存信息 -->
			<text class="stock-info">库存：{{ product.stock }}/{{ product.totalStock }}</text>
			
			<!-- 积分和趋势 -->
			<view class="price-row">
				<view class="points-wrapper">
					<text class="points-value">{{ product.points }}积分</text>
					<text 
						class="trend-icon" 
						:class="trendClass"
					>{{ trendIcon }}</text>
				</view>
			</view>
			
			<!-- 兑换按钮 -->
			<view class="exchange-btn" @click.stop="handleExchange">
				<text class="btn-text">兑换</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'PointsProductCard',
	
	props: {
		product: {
			type: Object,
			required: true,
			default: () => ({
				id: 0,
				image: '',
				title: '',
				stock: 0,
				totalStock: 0,
				points: 0,
				trend: 'stable'
			})
		}
	},
	
	computed: {
		// 趋势图标
		trendIcon() {
			const icons = {
				up: '↑',
				down: '↓',
				stable: '→'
			}
			return icons[this.product.trend] || '→'
		},
		
		// 趋势样式类
		trendClass() {
			return `trend-${this.product.trend}`
		}
	},
	
	methods: {
		// 点击卡片
		handleCardClick() {
			this.$emit('click', this.product)
		},
		
		// 点击兑换按钮
		handleExchange() {
			this.$emit('exchange', this.product)
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.product-card {
	display: flex;
	flex-direction: column;
	background-color: $card-bg;
	border-radius: $radius-medium;
	overflow: hidden;
	box-shadow: $shadow-light;
	
	&:active {
		opacity: 0.9;
	}
}

.product-image {
	width: 100%;
	height: 280rpx;
	background-color: $bg-color;
}

.product-info {
	padding: $spacing-3;
	display: flex;
	flex-direction: column;
	gap: $spacing-1;
}

.product-title {
	font-size: $font-t3;
	color: $text-title;
	font-weight: 500;
	line-height: $line-height-t3;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.stock-info {
	font-size: $font-t5;
	color: $text-secondary;
	line-height: $line-height-t5;
}

.price-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: $spacing-1;
}

.points-wrapper {
	display: flex;
	align-items: center;
	gap: $spacing-1;
}

.points-value {
	font-size: $font-t3;
	color: $text-title;
	font-weight: 600;
	line-height: $line-height-t3;
}

.trend-icon {
	font-size: $font-t4;
	line-height: $line-height-t4;
	
	&.trend-up {
		color: $assist-red;
	}
	
	&.trend-down {
		color: $success-green;
	}
	
	&.trend-stable {
		color: $text-secondary;
	}
}

.exchange-btn {
	margin-top: $spacing-2;
	padding: $spacing-2 0;
	background-color: $text-title;
	border-radius: $radius-small;
	text-align: center;
	
	&:active {
		opacity: 0.8;
	}
}

.btn-text {
	font-size: $font-t4;
	color: $card-bg;
	font-weight: 500;
	line-height: $line-height-t4;
}
</style>