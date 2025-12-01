# 卡券中心页面

## 页面概述

卡券中心是用户管理和使用各类卡券的核心页面，提供卡券查看、筛选、使用等功能。

## 功能特性

### 核心功能
- ✅ 卡券列表展示（未使用/已使用/已过期）
- ✅ Tab切换筛选
- ✅ 卡券详情展示（金额、名称、使用条件、有效期）
- ✅ 卡号密码复制功能
- ✅ 卡券使用功能
- ✅ 下拉刷新
- ✅ 上拉加载更多
- ✅ 空状态提示

### 交互特性
- 黑色胶囊样式Tab切换
- 数量徽标显示
- 渐变卡券背景
- 不同状态的视觉区分
- 一键复制卡号密码
- 确认对话框

## 文件结构

```
pages/coupon/
├── coupon.vue                    # 主页面
├── components/                   # 组件目录
│   ├── CouponTabBar.vue         # Tab切换组件
│   ├── CouponCard.vue           # 卡券卡片组件
│   └── CouponEmpty.vue          # 空状态组件
└── README.md                     # 页面文档
```

## 组件说明

### 1. CouponTabBar.vue - Tab切换组件

**功能：**
- 显示未使用/已使用/已过期三个Tab
- 显示每个Tab的数量徽标
- 支持Tab切换

**Props：**
- `currentTab` (String): 当前选中的Tab
- `stats` (Object): 各状态的数量统计

**Events：**
- `change`: Tab切换事件

**样式特点：**
- 黑色胶囊样式
- 选中状态：黑底白字
- 未选中状态：白底黑字
- 橙色数量徽标

### 2. CouponCard.vue - 卡券卡片组件

**功能：**
- 展示卡券详细信息
- 显示卡号和密码
- 支持复制功能
- 支持使用功能

**Props：**
- `coupon` (Object): 卡券数据对象

**Events：**
- `use`: 使用卡券事件

**卡券数据结构：**
```javascript
{
  id: String,           // 卡券ID
  type: String,         // 类型：coupon/exchange/discount
  name: String,         // 卡券名称
  amount: Number,       // 金额或折扣
  condition: String,    // 使用条件
  validDate: String,    // 有效期
  status: String,       // 状态：unused/used/expired
  cardNumber: String,   // 卡号
  cardSecret: String    // 密码
}
```

**样式特点：**
- 左侧：大字号金额展示
- 右侧：卡券信息、卡号密码、操作按钮
- 渐变背景（根据状态变化）
- 圆角卡片设计
- 阴影效果

### 3. CouponEmpty.vue - 空状态组件

**功能：**
- 显示空状态提示
- 提供刷新操作

**Props：**
- `emptyText` (String): 空状态文本
- `showRefresh` (Boolean): 是否显示刷新按钮

**Events：**
- `refresh`: 刷新事件

## 数据流

### Mock数据
- 文件：[`data/coupon.js`](../../data/coupon.js)
- 使用Mock.js生成20-30条模拟数据
- 包含不同类型、状态的卡券

### API接口
- 文件：[`api/coupon.js`](../../api/coupon.js)
- `getCouponList()`: 获取卡券列表（支持状态筛选、分页）
- `useCoupon()`: 使用卡券
- `getCouponStats()`: 获取统计数据

## UI设计规范

### 颜色方案
- 主色：`#FF6B35`（橙红色）
- 未使用卡券：渐变橙色背景
- 已使用卡券：灰色调
- 已过期卡券：深灰色调
- Tab选中：黑色背景 `#000000`
- Tab未选中：白色背景

### 字体大小
- 金额：56rpx（加粗）
- 卡券名称：32rpx（加粗）
- 使用条件：28rpx
- 有效期：24rpx
- 卡号密码：24rpx

### 间距布局
- 页面左右边距：30rpx
- 卡片间距：24rpx
- 卡片内边距：30rpx
- 圆角：16rpx
- 阴影：0 4rpx 12rpx rgba(0,0,0,0.08)

## 使用方法

### 页面跳转

```javascript
// 从其他页面跳转到卡券中心
uni.navigateTo({
  url: '/pages/coupon/coupon'
});
```

### 组件使用示例

```vue
<template>
  <view>
    <!-- Tab切换 -->
    <coupon-tab-bar 
      :current-tab="currentTab" 
      :stats="stats"
      @change="handleTabChange"
    />
    
    <!-- 卡券卡片 -->
    <coupon-card
      v-for="coupon in couponList"
      :key="coupon.id"
      :coupon="coupon"
      @use="handleUseCoupon"
    />
    
    <!-- 空状态 -->
    <coupon-empty
      v-if="couponList.length === 0"
      empty-text="暂无卡券"
      @refresh="handleRefresh"
    />
  </view>
</template>
```

## 功能实现要点

### 1. Tab切换
- 切换Tab时重置页码
- 清空当前列表
- 重新加载数据

### 2. 分页加载
- 初始加载第一页
- 上拉加载更多
- 判断是否还有更多数据

### 3. 下拉刷新
- 重置页码为1
- 清空列表
- 重新加载数据和统计

### 4. 卡券使用
- 显示确认对话框
- 调用使用接口
- 刷新列表和统计

### 5. 复制功能
- 使用 `uni.setClipboardData()`
- 显示成功提示

## 路由配置

在 [`pages.json`](../../pages.json) 中的配置：

```json
{
  "path": "pages/coupon/coupon",
  "style": {
    "navigationBarTitleText": "卡券中心",
    "navigationStyle": "custom",
    "enablePullDownRefresh": false,
    "backgroundTextStyle": "dark"
  }
}
```

## 注意事项

1. **自定义导航栏**：使用 `navigationStyle: "custom"` 实现自定义顶部导航
2. **状态管理**：正确处理加载、刷新、空状态
3. **错误处理**：网络请求失败时显示友好提示
4. **性能优化**：使用虚拟列表（如数据量大）
5. **用户体验**：加载状态、空状态、错误提示要清晰

## 后续优化建议

1. 添加卡券搜索功能
2. 添加卡券分类筛选
3. 支持卡券分享
4. 添加使用记录
5. 支持卡券收藏
6. 添加过期提醒
7. 优化加载动画
8. 添加骨架屏

## 相关文件

- Mock数据：[`data/coupon.js`](../../data/coupon.js)
- API接口：[`api/coupon.js`](../../api/coupon.js)
- 实施方案：[`需求/卡券中心实施方案.md`](../../需求/卡券中心实施方案.md)
- UI参考：[`需求/UI需求参考图/卡券中心参考.jpg`](../../需求/UI需求参考图/卡券中心参考.jpg)