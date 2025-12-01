<template>
	<view class="user-points-card">
		<view class="card-content">
			<!-- 左侧用户信息 -->
			<view class="user-info">
				<text class="user-name">{{ userName }}</text>
				<view class="points-info">
					<text class="points-text">积分：{{ points }}分</text>
					<text class="divider">•</text>
					<text class="detail-link" @click="handlePointsDetail">积分明细</text>
				</view>
			</view>

			<!-- 右侧卡券中心按钮 -->
			<view class="coupon-btn" @click="handleCouponCenter">
				<text class="coupon-text">卡券中心</text>
			</view>
		</view>

		<!-- 提现到钱包按钮 -->
		<view class="withdraw-section">
			<button class="withdraw-btn" @click="handleWithdraw">
				<text class="withdraw-text">提现到钱包</text>
			</button>
		</view>
	</view>
</template>

<script>
export default {
	name: 'UserPointsCard',

	props: {
		userName: {
			type: String,
			default: '用户名称'
		},
		points: {
			type: Number,
			default: 0
		}
	},

	methods: {
		// 查看积分明细
		handlePointsDetail() {
			this.$emit('detail')
		},

		// 打开卡券中心
		handleCouponCenter() {
			this.$emit('coupon')
		},

		// 提现到钱包
		handleWithdraw() {
			this.$emit('withdraw')
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.user-points-card {
	margin: $spacing-4;
	background-color: $divider-color;
	border-radius: $radius-medium;
	overflow: hidden;
}

.card-content {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: $spacing-3;
}

.user-info {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: $spacing-1;
}

.user-name {
	font-size: $font-t3;
	color: $text-title;
	font-weight: 500;
	line-height: $line-height-t3;
}

.points-info {
	display: flex;
	align-items: center;
	gap: $spacing-1;
}

.points-text {
	font-size: $font-t4;
	color: $text-body;
	line-height: $line-height-t4;
}

.divider {
	font-size: $font-t4;
	color: $text-secondary;
	line-height: $line-height-t4;
}

.detail-link {
	font-size: $font-t4;
	color: $text-body;
	line-height: $line-height-t4;

	&:active {
		opacity: 0.7;
	}
}

.coupon-btn {
	padding: $spacing-2 $spacing-3;
	background-color: $border-color;
	border-radius: $radius-small;

	&:active {
		opacity: 0.7;
	}
}

.coupon-text {
	font-size: $font-t4;
	color: $text-title;
	line-height: $line-height-t4;
}

// 提现到钱包按钮样式
.withdraw-section {
	padding: 0 $spacing-3 $spacing-3;
}

.withdraw-btn {
	width: 100%;
	height: 80rpx;
	background: linear-gradient(135deg, $brand-blue 0%, $assist-blue 100%);
	border-radius: $radius-medium;
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;

	&:active {
		opacity: 0.8;
	}

	&::after {
		border: none;
	}
}

.withdraw-text {
	font-size: $font-t3;
	color: #FFFFFF;
	font-weight: 600;
	line-height: $line-height-t3;
}
</style>