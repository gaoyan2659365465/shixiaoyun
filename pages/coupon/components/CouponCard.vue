<template>
  <view class="coupon-card" :class="[statusClass]">
    <!-- 左侧金额区域 -->
    <view class="coupon-left">
      <view class="amount-wrapper">
        <text class="currency">¥</text>
        <text class="amount">{{ displayAmount }}</text>
      </view>
      <text v-if="coupon.type === 'discount'" class="discount-label">折扣券</text>
      <text v-else-if="coupon.type === 'exchange'" class="exchange-label">兑换券</text>
    </view>
    
    <!-- 右侧信息区域 -->
    <view class="coupon-right">
      <view class="coupon-info">
        <text class="coupon-name">{{ coupon.name }}</text>
        <text class="coupon-condition">{{ coupon.condition }}</text>
        <text class="coupon-date">有效期：{{ coupon.validDate }}</text>
      </view>
      
      <!-- 卡号密码区域 -->
      <view class="card-info">
        <view class="card-item">
          <text class="card-label">卡号：</text>
          <text class="card-value">{{ coupon.cardNumber }}</text>
          <text class="copy-btn" @click.stop="handleCopy(coupon.cardNumber, '卡号')">复制</text>
        </view>
        <view class="card-item">
          <text class="card-label">密码：</text>
          <text class="card-value">{{ coupon.cardSecret }}</text>
          <text class="copy-btn" @click.stop="handleCopy(coupon.cardSecret, '密码')">复制</text>
        </view>
      </view>
      
      <!-- 操作按钮 -->
      <view class="coupon-action">
        <button 
          v-if="coupon.status === 'unused'" 
          class="use-btn"
          @click.stop="handleUse"
        >
          立即使用
        </button>
        <view v-else-if="coupon.status === 'used'" class="status-tag used">已使用</view>
        <view v-else-if="coupon.status === 'expired'" class="status-tag expired">已过期</view>
      </view>
    </view>
    
    <!-- 状态遮罩 -->
    <view v-if="coupon.status !== 'unused'" class="status-mask"></view>
  </view>
</template>

<script>
export default {
  name: 'CouponCard',
  props: {
    // 卡券数据
    coupon: {
      type: Object,
      required: true
    }
  },
  computed: {
    /**
     * 显示金额
     */
    displayAmount() {
      if (this.coupon.type === 'discount') {
        return this.coupon.amount;
      }
      return this.coupon.amount;
    },
    
    /**
     * 状态样式类
     */
    statusClass() {
      return `status-${this.coupon.status}`;
    }
  },
  methods: {
    /**
     * 复制文本到剪贴板
     * @param {string} text - 要复制的文本
     * @param {string} label - 文本标签（用于提示）
     */
    handleCopy(text, label) {
      uni.setClipboardData({
        data: text,
        success: () => {
          uni.showToast({
            title: `${label}已复制`,
            icon: 'success',
            duration: 2000
          });
        },
        fail: () => {
          uni.showToast({
            title: '复制失败',
            icon: 'none',
            duration: 2000
          });
        }
      });
    },
    
    /**
     * 使用卡券
     */
    handleUse() {
      this.$emit('use', this.coupon);
    }
  }
};
</script>

<style lang="scss" scoped>
.coupon-card {
  position: relative;
  display: flex;
  margin: 0 30rpx 24rpx;
  background: linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%);
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  
  // 未使用状态
  &.status-unused {
    background: linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%);
  }
  
  // 已使用状态
  &.status-used {
    background: linear-gradient(135deg, #CCCCCC 0%, #E5E5E5 100%);
    
    .coupon-name,
    .coupon-condition,
    .coupon-date,
    .card-label,
    .card-value {
      color: #999999;
    }
    
    .amount,
    .currency {
      color: #CCCCCC;
    }
  }
  
  // 已过期状态
  &.status-expired {
    background: linear-gradient(135deg, #999999 0%, #BBBBBB 100%);
    
    .coupon-name,
    .coupon-condition,
    .coupon-date,
    .card-label,
    .card-value {
      color: #CCCCCC;
    }
    
    .amount,
    .currency {
      color: #E5E5E5;
    }
  }
  
  // 左侧金额区域
  .coupon-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 220rpx;
    padding: 30rpx 20rpx;
    background: rgba(255, 255, 255, 0.1);
    
    .amount-wrapper {
      display: flex;
      align-items: baseline;
      margin-bottom: 8rpx;
      
      .currency {
        font-size: 32rpx;
        color: #FFFFFF;
        font-weight: bold;
        margin-right: 4rpx;
      }
      
      .amount {
        font-size: 56rpx;
        color: #FFFFFF;
        font-weight: bold;
        line-height: 1;
      }
    }
    
    .discount-label,
    .exchange-label {
      font-size: 24rpx;
      color: #FFFFFF;
      opacity: 0.9;
    }
  }
  
  // 右侧信息区域
  .coupon-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 30rpx;
    background: #FFFFFF;
    
    .coupon-info {
      flex: 1;
      margin-bottom: 20rpx;
      
      .coupon-name {
        display: block;
        font-size: 32rpx;
        color: #333333;
        font-weight: bold;
        margin-bottom: 12rpx;
        line-height: 1.4;
      }
      
      .coupon-condition {
        display: block;
        font-size: 28rpx;
        color: #666666;
        margin-bottom: 8rpx;
        line-height: 1.4;
      }
      
      .coupon-date {
        display: block;
        font-size: 24rpx;
        color: #999999;
        line-height: 1.4;
      }
    }
    
    // 卡号密码区域
    .card-info {
      margin-bottom: 20rpx;
      padding: 20rpx;
      background: #F5F5F5;
      border-radius: 8rpx;
      
      .card-item {
        display: flex;
        align-items: center;
        margin-bottom: 12rpx;
        
        &:last-child {
          margin-bottom: 0;
        }
        
        .card-label {
          font-size: 24rpx;
          color: #666666;
          min-width: 80rpx;
        }
        
        .card-value {
          flex: 1;
          font-size: 24rpx;
          color: #333333;
          font-family: 'Courier New', monospace;
          letter-spacing: 2rpx;
        }
        
        .copy-btn {
          font-size: 24rpx;
          color: #FF6B35;
          padding: 8rpx 16rpx;
          background: #FFF5F2;
          border-radius: 4rpx;
          margin-left: 16rpx;
        }
      }
    }
    
    // 操作按钮区域
    .coupon-action {
      .use-btn {
        width: 100%;
        height: 72rpx;
        line-height: 72rpx;
        background: #FF6B35;
        color: #FFFFFF;
        font-size: 28rpx;
        font-weight: bold;
        border-radius: 36rpx;
        border: none;
        
        &::after {
          border: none;
        }
        
        &:active {
          opacity: 0.8;
        }
      }
      
      .status-tag {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 72rpx;
        font-size: 28rpx;
        font-weight: bold;
        border-radius: 36rpx;
        
        &.used {
          background: #F5F5F5;
          color: #999999;
        }
        
        &.expired {
          background: #FFF5F5;
          color: #FF4444;
        }
      }
    }
  }
  
  // 状态遮罩
  .status-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.3);
    pointer-events: none;
  }
}
</style>