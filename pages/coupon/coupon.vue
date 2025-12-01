<template>
  <view class="coupon-page">
    <!-- 顶部导航栏 -->
    <view class="navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="navbar-content">
        <view class="navbar-left" @click="handleBack">
          <text class="back-icon">←</text>
        </view>
        <view class="navbar-title">卡券中心</view>
        <view class="navbar-right" @click="handleProfile">
          <image class="avatar" :src="userAvatar" mode="aspectFill"></image>
        </view>
      </view>
    </view>
    
    <!-- Tab切换栏 -->
    <coupon-tab-bar 
      :current-tab="currentTab" 
      :stats="stats"
      @change="handleTabChange"
    />
    
    <!-- 卡券列表 -->
    <scroll-view 
      class="coupon-list"
      scroll-y
      :refresher-enabled="true"
      :refresher-triggered="refreshing"
      @refresherrefresh="handleRefresh"
      @scrolltolower="handleLoadMore"
    >
      <!-- 卡券卡片列表 -->
      <view v-if="couponList.length > 0" class="list-content">
        <coupon-card
          v-for="coupon in couponList"
          :key="coupon.id"
          :coupon="coupon"
          @use="handleUseCoupon"
        />
        
        <!-- 加载更多提示 -->
        <view v-if="hasMore" class="load-more">
          <text v-if="loading" class="loading-text">加载中...</text>
          <text v-else class="load-text">上拉加载更多</text>
        </view>
        <view v-else class="no-more">
          <text class="no-more-text">没有更多了</text>
        </view>
      </view>
      
      <!-- 空状态 -->
      <coupon-empty
        v-else-if="!loading"
        :empty-text="emptyText"
        @refresh="handleRefresh"
      />
      
      <!-- 首次加载 -->
      <view v-if="loading && couponList.length === 0" class="loading-wrapper">
        <text class="loading-text">加载中...</text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import CouponTabBar from './components/CouponTabBar.vue';
import CouponCard from './components/CouponCard.vue';
import CouponEmpty from './components/CouponEmpty.vue';
import { getCouponList, useCoupon, getCouponStats } from '@/api/coupon.js';

export default {
  name: 'CouponPage',
  components: {
    CouponTabBar,
    CouponCard,
    CouponEmpty
  },
  data() {
    return {
      // 当前Tab
      currentTab: 'unused',
      // 卡券列表
      couponList: [],
      // 统计数据
      stats: {
        unused: 0,
        used: 0,
        expired: 0
      },
      // 分页参数
      page: 1,
      pageSize: 10,
      hasMore: true,
      // 加载状态
      loading: false,
      refreshing: false,
      // 用户头像
      userAvatar: '/static/logo.png',
      // 状态栏高度
      statusBarHeight: 0
    };
  },
  computed: {
    /**
     * 空状态文本
     */
    emptyText() {
      const textMap = {
        unused: '暂无未使用的卡券',
        used: '暂无已使用的卡券',
        expired: '暂无已过期的卡券'
      };
      return textMap[this.currentTab] || '暂无卡券';
    }
  },
  onLoad() {
    // 获取系统信息（状态栏高度）
    const systemInfo = uni.getSystemInfoSync();
    this.statusBarHeight = systemInfo.statusBarHeight || 0;

    // 页面加载时获取数据
    this.loadStats();
    this.loadCouponList();
  },
  methods: {
    /**
     * 加载统计数据
     */
    async loadStats() {
      try {
        const res = await getCouponStats();
        if (res.code === 200) {
          this.stats = res.data;
        }
      } catch (error) {
        console.error('加载统计数据失败:', error);
      }
    },
    
    /**
     * 加载卡券列表
     * @param {boolean} isRefresh - 是否为刷新操作
     */
    async loadCouponList(isRefresh = false) {
      if (this.loading) return;
      
      this.loading = true;
      
      try {
        const res = await getCouponList({
          status: this.currentTab,
          page: this.page,
          pageSize: this.pageSize
        });
        
        if (res.code === 200) {
          const { list, hasMore } = res.data;
          
          if (isRefresh) {
            this.couponList = list;
          } else {
            this.couponList = [...this.couponList, ...list];
          }
          
          this.hasMore = hasMore;
        }
      } catch (error) {
        console.error('加载卡券列表失败:', error);
        uni.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 2000
        });
      } finally {
        this.loading = false;
        this.refreshing = false;
      }
    },
    
    /**
     * 处理Tab切换
     * @param {string} tab - 新的Tab值
     */
    handleTabChange(tab) {
      this.currentTab = tab;
      this.page = 1;
      this.couponList = [];
      this.hasMore = true;
      this.loadCouponList(true);
    },
    
    /**
     * 处理下拉刷新
     */
    handleRefresh() {
      this.refreshing = true;
      this.page = 1;
      this.hasMore = true;
      this.loadStats();
      this.loadCouponList(true);
    },
    
    /**
     * 处理上拉加载更多
     */
    handleLoadMore() {
      if (!this.hasMore || this.loading) return;
      
      this.page += 1;
      this.loadCouponList();
    },
    
    /**
     * 处理使用卡券
     * @param {Object} coupon - 卡券对象
     */
    async handleUseCoupon(coupon) {
      // 显示确认对话框
      uni.showModal({
        title: '确认使用',
        content: `确定要使用"${coupon.name}"吗？`,
        success: async (res) => {
          if (res.confirm) {
            try {
              uni.showLoading({
                title: '使用中...',
                mask: true
              });
              
              const result = await useCoupon(coupon.id);
              
              uni.hideLoading();
              
              if (result.code === 200) {
                uni.showToast({
                  title: '使用成功',
                  icon: 'success',
                  duration: 2000
                });
                
                // 刷新列表和统计
                this.handleRefresh();
              }
            } catch (error) {
              uni.hideLoading();
              uni.showToast({
                title: error.message || '使用失败',
                icon: 'none',
                duration: 2000
              });
            }
          }
        }
      });
    },
    
    /**
     * 返回上一页
     */
    handleBack() {
      uni.navigateBack({
        delta: 1
      });
    },
    
    /**
     * 跳转到个人中心
     */
    handleProfile() {
      uni.switchTab({
        url: '/pages/profile/profile'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.coupon-page {
  min-height: 100vh;
  background-color: #F5F5F5;
  display: flex;
  flex-direction: column;
  
  // 顶部导航栏
  .navbar {
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: #FFFFFF;
    border-bottom: 1rpx solid #E5E5E5;

    .navbar-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 88rpx;
      padding: 0 30rpx;
    }

    .navbar-left,
    .navbar-right {
      width: 80rpx;
      display: flex;
      align-items: center;
    }

    .navbar-left {
      justify-content: flex-start;

      .back-icon {
        font-size: 40rpx;
        color: #333333;
        font-weight: bold;
      }
    }

    .navbar-title {
      flex: 1;
      text-align: center;
      font-size: 32rpx;
      color: #333333;
      font-weight: bold;
    }

    .navbar-right {
      justify-content: flex-end;

      .avatar {
        width: 56rpx;
        height: 56rpx;
        border-radius: 50%;
        border: 2rpx solid #E5E5E5;
      }
    }
  }
  
  // 卡券列表
  .coupon-list {
    flex: 1;
    height: calc(100vh - 88rpx - 124rpx);
    
    .list-content {
      padding: 24rpx 0;
    }
    
    // 加载更多
    .load-more,
    .no-more {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40rpx 0;
      
      .loading-text,
      .load-text,
      .no-more-text {
        font-size: 24rpx;
        color: #999999;
      }
    }
    
    // 首次加载
    .loading-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 120rpx 0;
      
      .loading-text {
        font-size: 28rpx;
        color: #999999;
      }
    }
  }
}
</style>