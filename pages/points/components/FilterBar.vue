<template>
	<view class="filter-bar">
		<!-- Filter 按钮 -->
		<picker
			mode="selector"
			:range="filterOptions"
			range-key="label"
			:value="filterIndex"
			@change="onFilterChange"
		>
			<view class="filter-btn">
				<text class="btn-text">{{ currentFilterLabel }}</text>
				<text class="arrow">▼</text>
			</view>
		</picker>

		<!-- Sort 按钮 -->
		<picker
			mode="selector"
			:range="sortOptions"
			range-key="label"
			:value="sortIndex"
			@change="onSortChange"
		>
			<view class="sort-btn">
				<text class="btn-text">{{ currentSortLabel }}</text>
				<text class="arrow">▼</text>
			</view>
		</picker>

		<!-- 结果数量 -->
		<view class="result-count">
			<text class="count-text">{{ resultCount }} 个结果</text>
		</view>
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

	computed: {
		// 当前筛选项的索引
		filterIndex() {
			const index = this.filterOptions.findIndex(opt => opt.value === this.currentFilter)
			return index >= 0 ? index : 0
		},

		// 当前排序项的索引
		sortIndex() {
			const index = this.sortOptions.findIndex(opt => opt.value === this.currentSort)
			return index >= 0 ? index : 0
		},

		// 当前筛选项的标签
		currentFilterLabel() {
			const option = this.filterOptions.find(opt => opt.value === this.currentFilter)
			return option ? option.label : '筛选'
		},

		// 当前排序项的标签
		currentSortLabel() {
			const option = this.sortOptions.find(opt => opt.value === this.currentSort)
			return option ? option.label : '排序'
		}
	},

	methods: {
		// 筛选项改变
		onFilterChange(e) {
			const index = e.detail.value
			const option = this.filterOptions[index]
			if (option) {
				this.currentFilter = option.value
				this.$emit('filter', option.value)
			}
		},

		// 排序项改变
		onSortChange(e) {
			const index = e.detail.value
			const option = this.sortOptions[index]
			if (option) {
				this.currentSort = option.value
				this.$emit('sort', option.value)
			}
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
		background-color: $bg-color;
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
</style>