<template>
  <view class="coupon-tab-bar">
    <view v-for="tab in tabs"
      :key="tab.value"
      class="tab-item"
      :class="{ active: currentTab === tab.value }"
      @click="handleTabClick(tab.value)"
    >
      <text class="tab-text">{{ tab.label }}</text>
      <view v-if="tab.count > 0" class="tab-badge">{{ tab.count }}</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'CouponTabBar',
  props: {
    // 当前选中的Tab
    currentTab: {
      type: String,
      default: 'unused'
    },
    // 各状态的数量统计
    stats: {
      type: Object,
      default: () => ({
        unused: 0,
        used: 0,
        expired: 0
      })
    }
  },
  computed: {
    // Tab配置列表
    tabs() {
      return [
        {
          label: '未使用',
          value: 'unused',
          count: this.stats.unused || 0
        },
        {
          label: '已使用',
          value: 'used',
          count: this.stats.used || 0
        },
        {
          label: '已过期',
          value: 'expired',
          count: this.stats.expired || 0
        }
      ];
    }
  },
  methods: {
    /**
     * 处理Tab点击事件
     * @param {string} value - Tab的值
     */
    handleTabClick(value) {
      if (value !== this.currentTab) {
        this.$emit('change', value);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.coupon-tab-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30rpx;
  background-color: #FFFFFF;
  
  .tab-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 160rpx;
    height: 64rpx;
    padding: 0 32rpx;
    margin: 0 12rpx;
    background-color: #FFFFFF;
    border: 2rpx solid #000000;
    border-radius: 32rpx;
    transition: all 0.3s ease;
    
    .tab-text {
      font-size: 28rpx;
      color: #000000;
      font-weight: 500;
      transition: color 0.3s ease;
    }
    
    .tab-badge {
      position: absolute;
      top: -8rpx;
      right: -8rpx;
      min-width: 32rpx;
      height: 32rpx;
      padding: 0 8rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #FF6B35;
      border-radius: 16rpx;
      font-size: 20rpx;
      color: #FFFFFF;
      font-weight: bold;
      line-height: 1;
    }
    
    // 选中状态
    &.active {
      background-color: #000000;
      border-color: #000000;
      
      .tab-text {
        color: #FFFFFF;
      }
    }
    
    // 点击效果
    &:active {
      opacity: 0.8;
      transform: scale(0.98);
    }
  }
}
</style>