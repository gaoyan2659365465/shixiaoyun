<template>
	<view class="cooperation-page">
		<!-- 顶部标题 -->
		<view class="header">
			<text class="title">合作伙伴</text>
		</view>
		
		<!-- 筛选区域 -->
		<view class="filter-section">
			<view class="filter-tags">
				<view 
					v-for="(filter, index) in filters" 
					:key="index"
					class="filter-tag"
					:class="{ active: filter.active }"
					@click="toggleFilter(index)"
				>
					<text class="filter-text">{{ filter.label }}</text>
					<text class="filter-icon">{{ filter.active ? '✓' : '▼' }}</text>
				</view>
				<view class="search-box">
					<input 
						type="text" 
						placeholder="搜索..." 
						v-model="searchKeyword"
						@input="handleSearch"
					/>
				</view>
			</view>
		</view>
		
		<!-- 合作伙伴列表 -->
		<view class="partner-list">
			<view 
				v-for="partner in filteredPartners" 
				:key="partner.id"
				class="partner-item"
			>
				<!-- 左侧Logo -->
				<view class="partner-logo">
					<image 
						v-if="partner.logo" 
						:src="partner.logo" 
						mode="aspectFill"
					></image>
					<view v-else class="logo-placeholder"></view>
				</view>
				
				<!-- 中间信息区域 -->
				<view class="partner-info">
					<text class="partner-name">{{ partner.name }}</text>
					<view class="partner-location">
						<text class="location-label">地址</text>
					</view>
					<view class="partner-tags">
						<view 
							v-for="(tag, tagIndex) in partner.tags" 
							:key="tagIndex"
							class="tag"
						>
							<text class="tag-text">{{ tag }}</text>
						</view>
					</view>
				</view>
				
				<!-- 右侧联系按钮 -->
				<view class="contact-btn" @click="handleContact(partner)">
					<text class="contact-text">联系我们</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getAllPartners, searchPartners, getFilterConfig } from '@/data/partners.js';

export default {
	data() {
		return {
			// 筛选条件
			filters: [
				{ label: '杭州市', active: false, key: 'city' },
				{ label: '客户类型', active: false, key: 'type' },
				{ label: '门店服务', active: false, key: 'service' }
			],
			// 搜索关键词
			searchKeyword: '',
			// 合作伙伴数据
			partners: [],
			// 加载状态
			loading: false
		};
	},
	
	// 页面加载时获取数据
	onLoad() {
		this.loadPartners();
	},
	computed: {
		// 过滤后的合作伙伴列表
		filteredPartners() {
			let result = this.partners;
			
			// 根据搜索关键词过滤
			if (this.searchKeyword) {
				const keyword = this.searchKeyword.toLowerCase();
				result = result.filter(partner => 
					partner.name.toLowerCase().includes(keyword) ||
					partner.location.toLowerCase().includes(keyword) ||
					partner.tags.some(tag => tag.toLowerCase().includes(keyword))
				);
			}
			
			return result;
		}
	},
	methods: {
		/**
		 * 加载合作伙伴数据
		 */
		async loadPartners() {
			try {
				this.loading = true;
				// 从数据模块获取数据
				const data = await getAllPartners();
				this.partners = data;
			} catch (error) {
				console.error('加载合作伙伴数据失败:', error);
				uni.showToast({
					title: '加载失败',
					icon: 'none'
				});
			} finally {
				this.loading = false;
			}
		},
		
		/**
		 * 切换筛选条件
		 */
		toggleFilter(index) {
			this.filters[index].active = !this.filters[index].active;
			console.log('筛选条件变更:', this.filters[index]);
			// 可以在这里添加实际的筛选逻辑
			// 例如：this.applyFilters();
		},
		
		/**
		 * 处理搜索
		 */
		async handleSearch() {
			if (!this.searchKeyword.trim()) {
				// 如果搜索关键词为空，重新加载所有数据
				await this.loadPartners();
				return;
			}
			
			try {
				this.loading = true;
				// 使用搜索功能
				const results = await searchPartners(this.searchKeyword);
				this.partners = results;
				
				if (results.length === 0) {
					uni.showToast({
						title: '未找到相关合作伙伴',
						icon: 'none'
					});
				}
			} catch (error) {
				console.error('搜索失败:', error);
				uni.showToast({
					title: '搜索失败',
					icon: 'none'
				});
			} finally {
				this.loading = false;
			}
		},
		
		/**
		 * 处理合作伙伴点击
		 */
		handlePartnerClick(partner) {
			console.log('点击合作伙伴:', partner);
			// 可以跳转到详情页
			// uni.navigateTo({
			//     url: `/pages/partner-detail/partner-detail?id=${partner.id}`
			// });
		},
		
		/**
		 * 处理联系按钮点击
		 */
		handleContact(partner) {
			uni.showModal({
				title: '联系我们',
				content: `您正在联系：${partner.name}\n\n电话：${partner.phone || '暂无'}\n邮箱：${partner.email || '暂无'}`,
				confirmText: '拨打电话',
				cancelText: '取消',
				success: (res) => {
					if (res.confirm && partner.phone) {
						// 拨打电话
						uni.makePhoneCall({
							phoneNumber: partner.phone,
							fail: (err) => {
								console.error('拨打电话失败:', err);
								uni.showToast({
									title: '拨打失败',
									icon: 'none'
								});
							}
						});
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.cooperation-page {
	min-height: 100vh;
	background-color: #f5f5f5;
	padding-bottom: 20rpx;
}

/* 顶部标题 */
.header {
	background-color: #ffffff;
	padding: 30rpx 32rpx 20rpx;
	
	.title {
		font-size: 40rpx;
		font-weight: 600;
		color: #000000;
	}
}

/* 筛选区域 */
.filter-section {
	background-color: #ffffff;
	padding: 20rpx 32rpx;
	margin-bottom: 20rpx;
	
	.filter-tags {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 20rpx;
	}
	
	.filter-tag {
		display: flex;
		align-items: center;
		padding: 12rpx 24rpx;
		background-color: #f5f5f5;
		border-radius: 8rpx;
		transition: all 0.3s;
		
		&.active {
			background-color: #333333;
			
			.filter-text {
				color: #ffffff;
			}
			
			.filter-icon {
				color: #ffffff;
			}
		}
		
		.filter-text {
			font-size: 28rpx;
			color: #333333;
			margin-right: 8rpx;
		}
		
		.filter-icon {
			font-size: 20rpx;
			color: #999999;
		}
	}
	
	.search-box {
		flex: 1;
		min-width: 200rpx;
		
		input {
			width: 100%;
			height: 60rpx;
			padding: 0 24rpx;
			background-color: #f5f5f5;
			border-radius: 8rpx;
			font-size: 28rpx;
			color: #333333;
			
			&::placeholder {
				color: #999999;
			}
		}
	}
}

/* 合作伙伴列表 */
.partner-list {
	padding: 0 32rpx;
}

.partner-item {
	display: flex;
	align-items: center;
	background-color: #ffffff;
	border-radius: 16rpx;
	padding: 32rpx;
	margin-bottom: 24rpx;
	transition: all 0.3s;
	
	&:active {
		transform: scale(0.98);
		opacity: 0.9;
	}
}

/* 左侧Logo */
.partner-logo {
	width: 160rpx;
	height: 160rpx;
	margin-right: 24rpx;
	flex-shrink: 0;
	
	image {
		width: 100%;
		height: 100%;
		border-radius: 12rpx;
	}
	
	.logo-placeholder {
		width: 100%;
		height: 100%;
		background-color: #e5e5e5;
		border-radius: 12rpx;
	}
}

/* 中间信息区域 */
.partner-info {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 16rpx;
	min-width: 0;
}

.partner-name {
	font-size: 32rpx;
	font-weight: 600;
	color: #000000;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.partner-location {
	.location-label {
		font-size: 24rpx;
		color: #666666;
	}
}

.partner-tags {
	display: flex;
	gap: 16rpx;
	flex-wrap: wrap;
}

.tag {
	padding: 8rpx 20rpx;
	background-color: #f5f5f5;
	border-radius: 6rpx;
	
	.tag-text {
		font-size: 24rpx;
		color: #666666;
	}
}

/* 右侧联系按钮 */
.contact-btn {
	padding: 20rpx 32rpx;
	background-color: #333333;
	border-radius: 8rpx;
	margin-left: 24rpx;
	flex-shrink: 0;
	transition: all 0.3s;
	
	&:active {
		background-color: #000000;
		transform: scale(0.95);
	}
	
	.contact-text {
		font-size: 28rpx;
		color: #ffffff;
		white-space: nowrap;
	}
}

/* 响应式适配 */
@media screen and (max-width: 750rpx) {
	.partner-item {
		flex-wrap: wrap;
	}
	
	.contact-btn {
		margin-left: 0;
		margin-top: 20rpx;
		width: 100%;
		text-align: center;
	}
}
</style>