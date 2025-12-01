<template>
	<view class="points-page">
		<!-- 用户积分卡片 -->
		<UserPointsCard
			:user-name="userName"
			:points="userPoints"
			@detail="handlePointsDetail"
			@coupon="handleCouponCenter"
			@withdraw="handleWithdraw"
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

		<!-- 提现弹窗 -->
		<view v-if="showWithdrawModal" class="withdraw-modal-overlay" @tap="closeWithdrawModal">
			<view class="withdraw-modal-content" @tap.stop>
				<view class="withdraw-modal-header">
					<text class="withdraw-modal-title">提现到钱包</text>
					<text class="withdraw-modal-close" @tap="closeWithdrawModal">×</text>
				</view>

				<view class="withdraw-modal-body">
					<view class="withdraw-info">
						<text class="withdraw-info-label">当前可用积分</text>
						<text class="withdraw-info-value">{{ userPoints }}分</text>
					</view>

					<view class="withdraw-input-section">
						<text class="withdraw-input-label">提现积分</text>
						<input
							class="withdraw-input"
							v-model="withdrawPoints"
							type="number"
							placeholder="请输入要提现的积分数量"
							@input="calculateAmount"
						/>
					</view>

					<view class="withdraw-exchange-rate">
						<text class="exchange-rate-text">兑换比例：100积分 = 1元</text>
					</view>

					<view class="withdraw-amount-section">
						<text class="withdraw-amount-label">到账金额</text>
						<text class="withdraw-amount-value">¥{{ withdrawAmount }}</text>
					</view>
				</view>

				<view class="withdraw-modal-footer">
					<button class="withdraw-modal-btn cancel-btn" @tap="closeWithdrawModal">取消</button>
					<button class="withdraw-modal-btn confirm-btn" @tap="confirmWithdrawStep">确认提现</button>
				</view>
			</view>
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
			pageSize: 10,
			showWithdrawModal: false,
			withdrawPoints: '',
			withdrawAmount: '0.00'
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
				url: '/pages/coupon/coupon'
			})
		},

		// 提现到钱包
		handleWithdraw() {
			// 检查积分
			if (this.userPoints <= 0) {
				uni.showToast({
					title: '当前积分不足，无法提现',
					icon: 'none'
				})
				return
			}

			// 显示自定义提现弹窗
			this.showWithdrawModal = true
			this.withdrawPoints = ''
			this.withdrawAmount = '0.00'
		},

		// 关闭提现弹窗
		closeWithdrawModal() {
			this.showWithdrawModal = false
			this.withdrawPoints = ''
			this.withdrawAmount = '0.00'
		},

		// 计算提现金额
		calculateAmount() {
			const points = parseInt(this.withdrawPoints)
			if (isNaN(points) || points <= 0) {
				this.withdrawAmount = '0.00'
			} else {
				// 积分兑换比例：100积分 = 1元
				this.withdrawAmount = (points / 100).toFixed(2)
			}
		},

		// 确认提现（第一步）
		confirmWithdrawStep() {
			const points = parseInt(this.withdrawPoints)

			// 验证输入
			if (isNaN(points) || points <= 0) {
				uni.showToast({
					title: '请输入有效的积分数量',
					icon: 'none'
				})
				return
			}

			// 检查积分是否足够
			if (points > this.userPoints) {
				uni.showToast({
					title: '积分不足，请重新输入',
					icon: 'none'
				})
				return
			}

			// 关闭输入弹窗
			this.closeWithdrawModal()

			// 显示二次确认弹窗
			const amount = this.withdrawAmount
			uni.showModal({
				title: '确认提现',
				content: `提现积分：${points}分\n到账金额：¥${amount}元\n\n确认提现到钱包吗？`,
				cancelText: '取消',
				confirmText: '确认提现',
				success: (res) => {
					if (res.confirm) {
						this.confirmWithdraw(points, amount)
					}
				}
			})
		},

		// 确认提现
		async confirmWithdraw(points, amount) {
			try {
				uni.showLoading({ title: '提现中...' })

				// TODO: 调用后端API进行提现
				// const result = await withdrawApi.withdraw({ points: points })
				// const arrivalTime = result.data.arrivalTime

				// 模拟提现成功
				await new Promise(resolve => setTimeout(resolve, 1000))

				// 模拟到账时间（实际应从后端获取）
				const arrivalTime = '1-3个工作日'

				uni.hideLoading()

				// 显示提现成功提示
				uni.showModal({
					title: '提现成功',
					content: `提现积分：${points}分\n到账金额：¥${amount}元\n预计到账时间：${arrivalTime}\n\n请注意查收钱包余额`,
					showCancel: false,
					confirmText: '我知道了',
					success: () => {
						// 刷新积分数据
						this.loadUserPoints()
					}
				})
			} catch (error) {
				uni.hideLoading()
				uni.showToast({
					title: error.message || '提现失败，请重试',
					icon: 'none'
				})
			}
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
				content: `本次兑换需消耗 ${product.points} 积分，是否确认兑换？一经兑换不退不换。`,
				cancelText: '取消',
				confirmText: '确认兑换',
				success: async (res) => {
					if (res.confirm) {
						try {
							const result = await exchangeProduct(product.id, {
								quantity: 1
							})
							
							if (result.code === 200) {
								// 刷新数据
								this.page = 1
								await this.loadData()

								// 显示兑换成功弹窗
								uni.showModal({
									title: '兑换成功',
									content: '恭喜您兑换成功！可前往卡券中心查看和使用。',
									cancelText: '稍后再说',
									confirmText: '去使用',
									success: (modalRes) => {
										if (modalRes.confirm) {
											// 跳转到卡券中心
											uni.navigateTo({
												url: '/pages/coupon/coupon'
											})
										}
									}
								})
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

// 提现弹窗样式
.withdraw-modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
}

.withdraw-modal-content {
	width: 640rpx;
	background-color: #FFFFFF;
	border-radius: $radius-large;
	overflow: hidden;
}

.withdraw-modal-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: $spacing-4;
	border-bottom: 1rpx solid $divider-color;
}

.withdraw-modal-title {
	font-size: $font-t2;
	color: $text-title;
	font-weight: 600;
}

.withdraw-modal-close {
	font-size: 48rpx;
	color: $text-secondary;
	line-height: 1;
	padding: 0 $spacing-2;
}

.withdraw-modal-body {
	padding: $spacing-4;
}

.withdraw-info {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: $spacing-3;
	background-color: $bg-color;
	border-radius: $radius-medium;
	margin-bottom: $spacing-4;
}

.withdraw-info-label {
	font-size: $font-t3;
	color: $text-body;
}

.withdraw-info-value {
	font-size: $font-t2;
	color: $brand-blue;
	font-weight: 600;
}

.withdraw-input-section {
	margin-bottom: $spacing-3;
}

.withdraw-input-label {
	display: block;
	font-size: $font-t4;
	color: $text-body;
	margin-bottom: $spacing-2;
}

.withdraw-input {
	width: 100%;
	height: 88rpx;
	padding: 0 $spacing-3;
	font-size: $font-t3;
	border: 1rpx solid $divider-color;
	border-radius: $radius-medium;
	background-color: $bg-color;
}

.withdraw-exchange-rate {
	padding: $spacing-2 0;
	margin-bottom: $spacing-3;
}

.exchange-rate-text {
	font-size: $font-t5;
	color: $text-secondary;
}

.withdraw-amount-section {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: $spacing-3;
	background: linear-gradient(135deg, rgba(68, 88, 255, 0.1) 0%, rgba(19, 134, 255, 0.1) 100%);
	border-radius: $radius-medium;
	margin-top: $spacing-3;
}

.withdraw-amount-label {
	font-size: $font-t3;
	color: $text-body;
}

.withdraw-amount-value {
	font-size: 48rpx;
	color: $brand-blue;
	font-weight: 600;
}

.withdraw-modal-footer {
	display: flex;
	border-top: 1rpx solid $divider-color;
}

.withdraw-modal-btn {
	flex: 1;
	height: 96rpx;
	font-size: $font-t3;
	border: none;
	border-radius: 0;
	background-color: transparent;

	&::after {
		border: none;
	}
}

.cancel-btn {
	color: $text-secondary;
	border-right: 1rpx solid $divider-color;
}

.confirm-btn {
	color: $brand-blue;
	font-weight: 600;
}
</style>