<template>
	<view class="home-page">
		<!-- 搜索框 -->
		<SearchBar 
			placeholder="Search" 
			@click="handleSearch" 
		/>
		
		<!-- 轮播横幅 -->
		<BannerSwiper 
			v-if="banners.length > 0"
			:banners="banners" 
			@click="handleBannerClick" 
		/>
		
		<!-- 快捷入口 -->
		<QuickEntry 
			v-if="quickEntries.length > 0"
			:entries="quickEntries" 
			@click="handleEntryClick" 
		/>
		
		<!-- 活动列表 -->
		<view class="activity-section">
			<SectionTitle 
				title="活动" 
				subtitle="再想个名字"
				:show-arrow="true"
				@click="handleMoreActivities"
			/>
			
			<view class="activity-list">
				<ActivityCard
					v-for="activity in activities"
					:key="activity.id"
					:activity="activity"
					@click-card="handleActivityDetail"
					@click-button="handleJoinActivity"
				/>
			</view>
			
			<!-- 加载更多 -->
			<view v-if="hasMore && !loading" class="load-more" @click="loadMoreActivities">
				<text class="load-more-text">加载更多</text>
			</view>
			
			<!-- 加载中 -->
			<view v-if="loading" class="loading">
				<uni-load-more status="loading"></uni-load-more>
			</view>
			
			<!-- 没有更多 -->
			<view v-else-if="!hasMore && activities.length > 0" class="no-more">
				<text class="no-more-text">没有更多了</text>
			</view>
		</view>
		
		<!-- 空状态 -->
		<view v-if="!loading && activities.length === 0" class="empty-state">
			<text class="empty-text">暂无活动</text>
		</view>
	</view>
</template>

<script>
import { getHomeData, getActivities, joinActivity } from '@/api/activity'
import { homeData } from '@/data/home'
import SearchBar from './components/SearchBar.vue'
import BannerSwiper from './components/BannerSwiper.vue'
import QuickEntry from './components/QuickEntry.vue'
import SectionTitle from './components/SectionTitle.vue'
import ActivityCard from './components/ActivityCard.vue'

export default {
	components: {
		SearchBar,
		BannerSwiper,
		QuickEntry,
		SectionTitle,
		ActivityCard
	},
	
	data() {
		return {
			banners: [],
			quickEntries: [],
			activities: [],
			loading: false,
			hasMore: true,
			page: 1,
			pageSize: 10
		}
	},
	
	onLoad() {
		this.loadHomeData()
	},
	
	onPullDownRefresh() {
		this.page = 1
		this.hasMore = true
		this.loadHomeData().then(() => {
			uni.stopPullDownRefresh()
		})
	},
	
	onReachBottom() {
		if (this.hasMore && !this.loading) {
			this.loadMoreActivities()
		}
	},
	
	methods: {
		// 加载首页数据
		async loadHomeData() {
			try {
				this.loading = true
				
				// 尝试从API获取数据
				try {
					const res = await getHomeData()
					
					if (res.code === 200) {
						this.banners = res.data.banners || []
						this.quickEntries = res.data.quickEntries || []
						this.activities = res.data.activities || []
						this.hasMore = res.data.hasMore || false
					}
				} catch (apiError) {
					// API失败时使用本地数据
					console.log('使用本地数据:', apiError)
					this.banners = homeData.banners
					this.quickEntries = homeData.quickEntries
					this.activities = homeData.activities
					this.hasMore = homeData.hasMore
				}
			} catch (error) {
				console.error('加载首页数据失败:', error)
				uni.showToast({
					title: '加载失败',
					icon: 'none'
				})
			} finally {
				this.loading = false
			}
		},
		
		// 加载更多活动
		async loadMoreActivities() {
			if (this.loading || !this.hasMore) return
			
			try {
				this.loading = true
				this.page++
				
				const res = await getActivities({
					page: this.page,
					pageSize: this.pageSize
				})
				
				if (res.code === 200) {
					this.activities = [...this.activities, ...res.data.list]
					this.hasMore = res.data.hasMore
				}
			} catch (error) {
				console.error('加载更多失败:', error)
				this.page--
				uni.showToast({
					title: '加载失败',
					icon: 'none'
				})
			} finally {
				this.loading = false
			}
		},
		
		// 搜索
		handleSearch() {
			uni.navigateTo({
				url: '/pages/search/search'
			})
		},
		
		// 横幅点击
		handleBannerClick({ banner }) {
			if (banner.link) {
				uni.navigateTo({
					url: banner.link
				})
			}
		},
		
		// 快捷入口点击
		handleEntryClick(entry) {
			if (entry.path) {
				uni.navigateTo({
					url: entry.path
				})
			}
		},
		
		// 查看更多活动
		handleMoreActivities() {
			uni.navigateTo({
				url: '/pages/activity/list'
			})
		},
		
		// 活动详情
		handleActivityDetail(activity) {
			uni.navigateTo({
				url: `/pages/activity/detail?id=${activity.id}`
			})
		},
		
		// 报名活动
		async handleJoinActivity(activity) {
			if (activity.status === 'ended') {
				uni.showToast({
					title: '活动已结束',
					icon: 'none'
				})
				return
			}
			
			try {
				const res = await joinActivity(activity.id)
				
				if (res.code === 200) {
					uni.showToast({
						title: '报名成功',
						icon: 'success'
					})
					// 刷新数据
					this.loadHomeData()
				}
			} catch (error) {
				uni.showToast({
					title: error.message || '报名失败',
					icon: 'none'
				})
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.home-page {
	min-height: 100vh;
	background-color: $bg-color;
	padding-bottom: 100rpx;
}

.activity-section {
	margin-top: $spacing-4;
}

.activity-list {
	display: flex;
	flex-direction: column;
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
