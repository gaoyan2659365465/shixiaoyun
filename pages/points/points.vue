<template>
	<view class="points-page">
		<!-- 用户积分卡片 -->
		<UserPointsCard
			:user-name="userName"
			:points="userPoints"
			@detail="handlePointsDetail"
			@coupon="handleCouponCenter"
		/>
		
		<!-- 筛选排序栏 -->
		<FilterBar
			:filter-options="filterOptions"
			:sort-options="sortOptions"
			:result-count="filteredProducts.length"
			@filter="handleFilter"
			@sort="handleSort"
		/>
		
		<!-- 商品网格 -->
		<view class="products-grid">
			<PointsProductCard
				v-for="product in displayProducts"
				:key="product.id"
				:product="product"
				@click="handleProductDetail"
				@exchange="handleExchange"
			/>
		</view>
		
		<!-- 加载更多 -->
		<view v-if="hasMore && !loading" class="load-more" @click="loadMore">
			<text class="load-more-text">加载更多</text>
		</view>
		
		<!-- 加载中 -->
		<view v-if="loading" class="loading">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		
		<!-- 没有更多 -->
		<view v-else-if="!hasMore && displayProducts.length > 0" class="no-more">
			<text class="no-more-text">没有更多了</text>
		</view>
		
		<!-- 空状态 -->
		<view v-if="!loading && displayProducts.length === 0" class="empty-state">
			<text class="empty-text">暂无商品</text>
		</view>
	</view>
</template>

<script>
import { getUserPoints, getPointsProducts, exchangeProduct } from '@/api/points'
import { pointsData } from '@/data/points'
import UserPointsCard from './components/UserPointsCard.vue'
import FilterBar from './components/FilterBar.vue'
import PointsProductCard from './components/PointsProductCard.vue'

export default {
	components: {
		UserPointsCard,
		FilterBar,
		PointsProductCard
	},
	
	data() {
		return {
			userName: '用户名称',
			userPoints: 0,
			products: [],
			filterOptions: [],
			sortOptions: [],
			currentFilter: 'all',
			currentSort: 'default',
			loading: false,
			hasMore: true,
			page: 1,
			pageSize: 10
		}
	},
	
	computed: {
		// 筛选后的商品列表
		filteredProducts() {
			let result = [...this.products]
			
			// 应用筛选
			if (this.currentFilter !== 'all') {
				result = result.filter(p => p.category === this.currentFilter)
			}
			
			// 应用排序
			switch (this.currentSort) {
				case 'points_asc':
					result.sort((a, b) => a.points - b.points)
					break
				case 'points_desc':
					result.sort((a, b) => b.points - a.points)
					break
				case 'stock_desc':
					result.sort((a, b) => b.stock - a.stock)
					break
				default:
					// 默认排序
					break
			}
			
			return result
		},
		
		// 显示的商品列表
		displayProducts() {
			return this.filteredProducts
		}
	},
	
	onLoad() {
		this.loadData()
	},
	
	onPullDownRefresh() {
		this.page = 1
		this.hasMore = true
		this.loadData().then(() => {
			uni.stopPullDownRefresh()
		})
	},
	
	onReachBottom() {
		if (this.hasMore && !this.loading) {
			this.loadMore()
		}
	},
	
	methods: {
		// 加载数据
		async loadData() {
			try {
				this.loading = true
				
				// 加载用户积分信息
				await this.loadUserPoints()
				
				// 加载商品列表
				await this.loadProducts()
				
				// 加载筛选和排序选项
				this.filterOptions = pointsData.filterOptions
				this.sortOptions = pointsData.sortOptions
			} catch (error) {
				console.error('加载数据失败:', error)
				uni.showToast({
					title: '加载失败',
					icon: 'none'
				})
			} finally {
				this.loading = false
			}
		},
		
		// 加载用户积分
		async loadUserPoints() {
			try {
				const res = await getUserPoints()
				if (res.code === 200) {
					this.userPoints = res.data.points || 0
					this.userName = res.data.userName || '用户名称'
				}
			} catch (error) {
				// 使用本地数据
				console.log('使用本地积分数据:', error)
				this.userPoints = pointsData.userPoints.points
			}
		},
		
		// 加载商品列表
		async loadProducts() {
			try {
				const res = await getPointsProducts({
					page: this.page,
					pageSize: this.pageSize
				})
				
				if (res.code === 200) {
					if (this.page === 1) {
						this.products = res.data.list || []
					} else {
						this.products = [...this.products, ...(res.data.list || [])]
					}
					this.hasMore = res.data.hasMore || false
				}
			} catch (error) {
				// 使用本地数据
				console.log('使用本地商品数据:', error)
				this.products = pointsData.products
				this.hasMore = false
			}
		},
		
		// 加载更多
		async loadMore() {
			if (this.loading || !this.hasMore) return
			
			this.page++
			await this.loadProducts()
		},
		
		// 筛选
		handleFilter(value) {
			this.currentFilter = value
		},
		
		// 排序
		handleSort(value) {
			this.currentSort = value
		},
		
		// 查看积分明细
		handlePointsDetail() {
			uni.navigateTo({
				url: '/pages/points/detail'
			})
		},
		
		// 打开卡券中心
		handleCouponCenter() {
			uni.navigateTo({
				url: '/pages/points/coupon'
			})
		},
		
		// 查看商品详情
		handleProductDetail(product) {
			uni.navigateTo({
				url: `/pages/points/product?id=${product.id}`
			})
		},
		
		// 兑换商品
		async handleExchange(product) {
			// 检查库存
			if (product.stock <= 0) {
				uni.showToast({
					title: '库存不足',
					icon: 'none'
				})
				return
			}
			
			// 检查积分
			if (this.userPoints < product.points) {
				uni.showToast({
					title: '积分不足',
					icon: 'none'
				})
				return
			}
			
			// 确认兑换
			uni.showModal({
				title: '确认兑换',
				content: `确定使用 ${product.points} 积分兑换 ${product.title} 吗？`,
				success: async (res) => {
					if (res.confirm) {
						try {
							const result = await exchangeProduct(product.id, {
								quantity: 1
							})
							
							if (result.code === 200) {
								uni.showToast({
									title: '兑换成功',
									icon: 'success'
								})
								
								// 刷新数据
								this.page = 1
								this.loadData()
							}
						} catch (error) {
							uni.showToast({
								title: error.message || '兑换失败',
								icon: 'none'
							})
						}
					}
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.points-page {
	min-height: 100vh;
	background-color: $bg-color;
	padding-bottom: 100rpx;
}

.products-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: $spacing-3;
	padding: $spacing-3 $spacing-4;
}

.load-more,
.loading,
.no-more {
	padding: $spacing-4;
	text-align: center;
}

.load-more {
	&:active {
		opacity: 0.7;
	}
}

.load-more-text {
	font-size: $font-t4;
	color: $brand-blue;
	line-height: $line-height-t4;
}

.no-more-text {
	font-size: $font-t4;
	color: $text-secondary;
	line-height: $line-height-t4;
}

.empty-state {
	padding: 200rpx $spacing-4;
	text-align: center;
}

.empty-text {
	font-size: $font-t4;
	color: $text-secondary;
	line-height: $line-height-t4;
}
</style>