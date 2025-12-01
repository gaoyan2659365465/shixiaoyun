<template>
  <view class="coupon-empty">
    <view class="empty-icon">📭</view>
    <text class="empty-text">{{ emptyText }}</text>
    <button v-if="showRefresh" class="refresh-btn" @click="handleRefresh">
      刷新试试
    </button>
  </view>
</template>

<script>
export default {
  name: 'CouponEmpty',
  props: {
    // 空状态文本
    emptyText: {
      type: String,
      default: '暂无卡券'
    },
    // 是否显示刷新按钮
    showRefresh: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    /**
     * 处理刷新操作
     */
    handleRefresh() {
      this.$emit('refresh');
    }
  }
};
</script>

<style lang="scss" scoped>
.coupon-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 60rpx;
  
  .empty-icon {
    font-size: 120rpx;
    margin-bottom: 32rpx;
    opacity: 0.6;
  }
  
  .empty-text {
    font-size: 28rpx;
    color: #999999;
    margin-bottom: 40rpx;
    text-align: center;
    line-height: 1.6;
  }
  
  .refresh-btn {
    width: 240rpx;
    height: 72rpx;
    line-height: 72rpx;
    background: #FF6B35;
    color: #FFFFFF;
    font-size: 28rpx;
    border-radius: 36rpx;
    border: none;
    
    &::after {
      border: none;
    }
    
    &:active {
      opacity: 0.8;
    }
  }
}
</style>