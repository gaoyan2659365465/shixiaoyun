<template>
	<view class="activity-card" @click="handleCardClick">
		<image 
			:src="activity.image" 
			mode="aspectFill"
			class="activity-image"
		></image>
		
		<view class="activity-content">
			<text class="activity-title">{{ activity.title }}</text>
			
			<view class="activity-time">
				<uni-icons type="calendar" size="12" color="#a7abb2"></uni-icons>
				<text class="time-text">
					{{ activity.startDate }}-{{ activity.endDate }}
				</text>
			</view>
			
			<view class="activity-footer">
				<text v-if="activity.participants" class="participants">
					{{ activity.participants }}/{{ activity.maxParticipants }}人
				</text>
				
				<view 
					:class="['action-button', activity.status]"
					@click.stop="handleButtonClick"
				>
					<text class="button-text">{{ buttonText }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'ActivityCard',
	props: {
		activity: {
			type: Object,
			required: true,
			default: () => ({})
		}
	},
	computed: {
		buttonText() {
			const statusMap = {
				'ongoing': '报名参加',
				'upcoming': '即将开始',
				'ended': '已结束'
			}
			return statusMap[this.activity.status] || '报名参加'
		}
	},
	methods: {
		handleCardClick() {
			this.$emit('click-card', this.activity)
		},
		handleButtonClick() {
			if (this.activity.status !== 'ended') {
				this.$emit('click-button', this.activity)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.activity-card {
	background-color: $card-bg;
	border-radius: $radius-medium;
	margin: 0 $spacing-4 $spacing-3;
	overflow: hidden;
	box-shadow: $shadow-light;
	
	&:active {
		opacity: 0.95;
	}
}

.activity-image {
	width: 100%;
	height: 400rpx;
	display: block;
}

.activity-content {
	padding: $spacing-3;
}

.activity-title {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
	font-size: $font-t2;
	font-weight: 500;
	color: $text-title;
	line-height: $line-height-t2;
}

.activity-time {
	display: flex;
	align-items: center;
	margin-top: $spacing-2;
	
	.time-text {
		margin-left: $spacing-1;
		font-size: $font-t5;
		color: $text-secondary;
		line-height: $line-height-t5;
	}
}

.activity-footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: $spacing-3;
}

.participants {
	font-size: $font-t5;
	color: $text-body;
	line-height: $line-height-t5;
}

.action-button {
	height: 64rpx;
	min-width: 160rpx;
	padding: 0 $spacing-4;
	border-radius: $radius-large;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all $transition-duration $transition-timing;
	
	&.ongoing {
		background-color: $text-title;
		
		.button-text {
			color: #FFFFFF;
		}
	}
	
	&.upcoming {
		background-color: $brand-blue;
		
		.button-text {
			color: #FFFFFF;
		}
	}
	
	&.ended {
		background-color: $divider-color;
		
		.button-text {
			color: $text-secondary;
		}
	}
	
	&:active:not(.ended) {
		opacity: 0.8;
	}
}

.button-text {
	font-size: $font-t4;
	font-weight: 500;
	line-height: $line-height-t4;
}
</style>