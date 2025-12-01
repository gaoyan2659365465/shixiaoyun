<template>
	<view class="filter-bar">
		<!-- Filter 按钮 -->
		<view class="filter-btn" @click="handleFilter">
			<text class="btn-text">Filter</text>
			<text class="arrow">▼</text>
		</view>
		
		<!-- Sort 按钮 -->
		<view class="sort-btn" @click="handleSort">
			<text class="btn-text">Sort</text>
			<text class="arrow">▼</text>
		</view>
		
		<!-- 结果数量 -->
		<view class="result-count">
			<text class="count-text">{{ resultCount }} results</text>
		</view>
		
		<!-- Filter 弹窗 -->
		<uni-popup ref="filterPopup" type="bottom">
			<view class="popup-content">
				<view class="popup-header">
					<text class="popup-title">筛选</text>
					<text class="popup-close" @click="closeFilter">✕</text>
				</view>
				<view class="option-list">
					<view 
						v-for="option in filterOptions" 
						:key="option.id"
						class="option-item"
						:class="{ active: currentFilter === option.value }"
						@click="selectFilter(option.value)"
					>
						<text class="option-text">{{ option.label }}</text>
						<text v-if="currentFilter === option.value" class="check-icon">✓</text>
					</view>
				</view>
			</view>
		</uni-popup>
		
		<!-- Sort 弹窗 -->
		<uni-popup ref="sortPopup" type="bottom">
			<view class="popup-content">
				<view class="popup-header">
					<text class="popup-title">排序</text>
					<text class="popup-close" @click="closeSort">✕</text>
				</view>
				<view class="option-list">
					<view 
						v-for="option in sortOptions" 
						:key="option.id"
						class="option-item"
						:class="{ active: currentSort === option.value }"
						@click="selectSort(option.value)"
					>
						<text class="option-text">{{ option.label }}</text>
						<text v-if="currentSort === option.value" class="check-icon">✓</text>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
export default {
	name: 'FilterBar',
	
	props: {
		filterOptions: {
			type: Array,
			default: () => []
		},
		sortOptions: {
			type: Array,
			default: () => []
		},
		resultCount: {
			type: Number,
			default: 0
		},
		defaultFilter: {
			type: String,
			default: 'all'
		},
		defaultSort: {
			type: String,
			default: 'default'
		}
	},
	
	data() {
		return {
			currentFilter: this.defaultFilter,
			currentSort: this.defaultSort
		}
	},
	
	methods: {
		// 打开筛选弹窗
		handleFilter() {
			this.$refs.filterPopup.open()
		},
		
		// 关闭筛选弹窗
		closeFilter() {
			this.$refs.filterPopup.close()
		},
		
		// 选择筛选项
		selectFilter(value) {
			this.currentFilter = value
			this.$emit('filter', value)
			this.closeFilter()
		},
		
		// 打开排序弹窗
		handleSort() {
			this.$refs.sortPopup.open()
		},
		
		// 关闭排序弹窗
		closeSort() {
			this.$refs.sortPopup.close()
		},
		
		// 选择排序项
		selectSort(value) {
			this.currentSort = value
			this.$emit('sort', value)
			this.closeSort()
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.filter-bar {
	display: flex;
	align-items: center;
	gap: $spacing-2;
	padding: $spacing-3 $spacing-4;
	background-color: $card-bg;
}

.filter-btn,
.sort-btn {
	display: flex;
	align-items: center;
	gap: $spacing-1;
	padding: $spacing-1 $spacing-2;
	border: 1px solid $border-color;
	border-radius: $radius-small;
	
	&:active {
		opacity: 0.7;
	}
}

.btn-text {
	font-size: $font-t4;
	color: $text-title;
	line-height: $line-height-t4;
}

.arrow {
	font-size: $font-t5;
	color: $text-secondary;
	line-height: $line-height-t5;
}

.result-count {
	flex: 1;
	text-align: right;
}

.count-text {
	font-size: $font-t4;
	color: $text-secondary;
	line-height: $line-height-t4;
}

.popup-content {
	background-color: $card-bg;
	border-radius: $radius-medium $radius-medium 0 0;
	padding-bottom: env(safe-area-inset-bottom);
}

.popup-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: $spacing-3 $spacing-4;
	border-bottom: 1px solid $divider-color;
}

.popup-title {
	font-size: $font-t3;
	color: $text-title;
	font-weight: 500;
	line-height: $line-height-t3;
}

.popup-close {
	font-size: $font-t2;
	color: $text-secondary;
	line-height: $line-height-t2;
	padding: 0 $spacing-1;
	
	&:active {
		opacity: 0.7;
	}
}

.option-list {
	max-height: 60vh;
	overflow-y: auto;
}

.option-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: $spacing-3 $spacing-4;
	border-bottom: 1px solid $divider-color;
	
	&:last-child {
		border-bottom: none;
	}
	
	&:active {
		background-color: $bg-color;
	}
	
	&.active {
		.option-text {
			color: $brand-blue;
			font-weight: 500;
		}
	}
}

.option-text {
	font-size: $font-t3;
	color: $text-title;
	line-height: $line-height-t3;
}

.check-icon {
	font-size: $font-t3;
	color: $brand-blue;
	line-height: $line-height-t3;
}
</style>