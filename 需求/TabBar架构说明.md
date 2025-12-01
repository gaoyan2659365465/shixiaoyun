# uni-app 底部 Tab 栏架构说明

## 概述

本文档说明视消云小程序的底部导航栏（TabBar）架构实现，包括配置方法、页面结构和使用指南。

## 架构组成

### 1. TabBar 配置

在 [`pages.json`](../pages.json) 中配置了完整的 tabBar：

```json
{
  "tabBar": {
    "color": "#a7abb2",           // 未选中文字颜色（灰色）
    "selectedColor": "#4458ff",    // 选中文字颜色（品牌蓝）
    "backgroundColor": "#FFFFFF",  // 背景色（白色）
    "borderStyle": "black",        // 边框样式
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "static/images/tabbar/home.png",
        "selectedIconPath": "static/images/tabbar/home-active.png"
      },
      {
        "pagePath": "pages/venue/venue",
        "text": "场所",
        "iconPath": "static/images/tabbar/venue.png",
        "selectedIconPath": "static/images/tabbar/venue-active.png"
      },
      {
        "pagePath": "pages/message/message",
        "text": "消息",
        "iconPath": "static/images/tabbar/message.png",
        "selectedIconPath": "static/images/tabbar/message-active.png"
      },
      {
        "pagePath": "pages/profile/profile",
        "text": "我的",
        "iconPath": "static/images/tabbar/profile.png",
        "selectedIconPath": "static/images/tabbar/profile-active.png"
      }
    ]
  }
}
```

### 2. 颜色规范

| 元素 | 颜色值 | 说明 |
|------|--------|------|
| 未选中文字 | `#a7abb2` | 对应 `$text-secondary` |
| 选中文字 | `#4458ff` | 对应 `$brand-blue` |
| 背景色 | `#FFFFFF` | 白色背景 |
| 边框 | `black` | 黑色边框样式 |

### 3. Tab 页面列表

#### 3.1 首页 - [`pages/index/index.vue`](../pages/index/index.vue)
- **功能**: 应用主页，展示轮播图、快捷入口、活动列表等
- **特性**: 
  - 支持下拉刷新
  - 支持上拉加载更多
  - 已实现完整的首页组件

#### 3.2 场所 - [`pages/venue/venue.vue`](../pages/venue/venue.vue)
- **功能**: 场所列表和搜索
- **特性**:
  - 搜索框
  - 场所列表展示
  - 空状态提示
  - 支持下拉刷新

#### 3.3 消息 - [`pages/message/message.vue`](../pages/message/message.vue)
- **功能**: 消息中心，展示系统通知和活动消息
- **特性**:
  - 多标签切换（全部、系统通知、活动消息）
  - 消息列表
  - 未读消息标记
  - 消息角标显示
  - 支持下拉刷新和上拉加载

#### 3.4 我的 - [`pages/profile/profile.vue`](../pages/profile/profile.vue)
- **功能**: 个人中心，用户信息和功能入口
- **特性**:
  - 用户信息展示（头像、昵称、ID）
  - 用户统计（积分、等级、优惠券）
  - 订单快捷入口（待付款、待使用、已完成、退款/售后）
  - 功能菜单（收藏、足迹、地址、设置、客服、关于）
  - 退出登录功能

## 图标资源

### 图标位置
所有 TabBar 图标存放在 [`static/images/tabbar/`](../static/images/tabbar/) 目录下。

### 图标规格
- **推荐尺寸**: 81px × 81px
- **格式**: PNG（透明背景）
- **颜色**: 
  - 未选中: `#a7abb2`
  - 选中: `#4458ff`

### 需要的图标文件

| 功能 | 未选中图标 | 选中图标 |
|------|-----------|---------|
| 首页 | `home.png` | `home-active.png` |
| 场所 | `venue.png` | `venue-active.png` |
| 消息 | `message.png` | `message-active.png` |
| 我的 | `profile.png` | `profile-active.png` |

详细的图标准备指南请参考 [`static/images/tabbar/README.md`](../static/images/tabbar/README.md)。

## 页面跳转规范

### TabBar 页面跳转

跳转到 TabBar 页面必须使用 `uni.switchTab()`：

```javascript
// ✅ 正确 - 跳转到 TabBar 页面
uni.switchTab({
  url: '/pages/index/index'
})

// ❌ 错误 - 不能使用其他跳转方法
uni.navigateTo({ url: '/pages/index/index' })  // 会报错
uni.redirectTo({ url: '/pages/index/index' })  // 会报错
uni.reLaunch({ url: '/pages/index/index' })    // 可以但不推荐
```

### 非 TabBar 页面跳转

跳转到非 TabBar 页面使用其他方法：

```javascript
// 保留当前页面，跳转到应用内的某个页面
uni.navigateTo({
  url: '/pages/login/login'
})

// 关闭当前页面，跳转到应用内的某个页面
uni.redirectTo({
  url: '/pages/login/login'
})

// 关闭所有页面，打开到应用内的某个页面
uni.reLaunch({
  url: '/pages/login/login'
})
```

### 登录页面跳转更新

已将 [`pages/login/login.vue`](../pages/login/login.vue) 中的跳转方法从 `uni.reLaunch()` 更新为 `uni.switchTab()`：

```javascript
// 登录成功后跳转
uni.switchTab({ url: '/pages/index/index' })

// 跳过登录
uni.switchTab({ url: '/pages/index/index' })
```

## 使用方法

### 1. 基本使用

TabBar 配置完成后，会自动在应用底部显示导航栏。用户点击不同的 Tab 即可切换页面。

### 2. 动态显示/隐藏 TabBar

```javascript
// 隐藏 TabBar
uni.hideTabBar()

// 显示 TabBar
uni.showTabBar()
```

### 3. 设置 TabBar 角标

```javascript
// 设置角标
uni.setTabBarBadge({
  index: 2,  // 消息 Tab 的索引
  text: '5'  // 角标文字
})

// 移除角标
uni.removeTabBarBadge({
  index: 2
})

// 显示红点
uni.showTabBarRedDot({
  index: 2
})

// 隐藏红点
uni.hideTabBarRedDot({
  index: 2
})
```

### 4. 动态设置 TabBar 样式

```javascript
// 设置 TabBar 某一项的内容
uni.setTabBarItem({
  index: 0,
  text: '首页',
  iconPath: '/static/images/tabbar/home.png',
  selectedIconPath: '/static/images/tabbar/home-active.png'
})

// 设置 TabBar 整体样式
uni.setTabBarStyle({
  color: '#a7abb2',
  selectedColor: '#4458ff',
  backgroundColor: '#FFFFFF',
  borderStyle: 'black'
})
```

## 注意事项

### 1. TabBar 页面限制
- TabBar 页面最多 5 个
- TabBar 页面必须在 `pages.json` 的 `pages` 数组中注册
- TabBar 页面的路径必须是相对路径

### 2. 页面顺序
- `pages.json` 中 `pages` 数组的第一项默认为应用的首页
- TabBar 的 `list` 数组顺序决定了 Tab 的显示顺序

### 3. 图标要求
- 图标必须是本地路径，不支持网络图片
- 建议使用 PNG 格式，支持透明背景
- 图标尺寸建议 81px × 81px

### 4. 跳转限制
- 不能在 TabBar 页面使用 `uni.navigateTo()` 跳转到其他 TabBar 页面
- 必须使用 `uni.switchTab()` 在 TabBar 页面间切换
- 从非 TabBar 页面跳转到 TabBar 页面也必须使用 `uni.switchTab()`

### 5. 生命周期
- TabBar 页面切换时，页面不会销毁，只是隐藏
- 首次进入 TabBar 页面会触发 `onLoad` 和 `onShow`
- 再次切换回来只会触发 `onShow`

## 开发建议

### 1. 页面状态管理
由于 TabBar 页面不会销毁，建议：
- 在 `onShow` 中刷新数据
- 使用 Vuex 或其他状态管理工具管理全局状态
- 注意内存管理，避免数据累积

### 2. 性能优化
- 使用懒加载加载列表数据
- 合理使用缓存减少网络请求
- 图片使用适当的压缩和懒加载

### 3. 用户体验
- 提供下拉刷新功能
- 显示加载状态
- 处理空状态和错误状态
- 合理使用角标提示用户

## 扩展功能

### 1. 自定义 TabBar
如需更复杂的 TabBar 样式，可以使用自定义 TabBar：
- 在 `pages.json` 中设置 `"custom": true`
- 创建自定义 TabBar 组件
- 参考 [uni-app 自定义 TabBar 文档](https://uniapp.dcloud.net.cn/api/ui/tabbar.html#settabbaritem)

### 2. 中间凸起按钮
可以通过自定义 TabBar 实现中间凸起的特殊按钮效果。

## 相关文档

- [uni-app TabBar 官方文档](https://uniapp.dcloud.net.cn/collocation/pages.html#tabbar)
- [uni-app TabBar API](https://uniapp.dcloud.net.cn/api/ui/tabbar.html)
- [图标准备指南](../static/images/tabbar/README.md)
- [首页实施指南](./首页实施指南.md)

## 更新日志

- **2024-01-27**: 初始版本，创建 TabBar 架构
  - 配置 4 个 Tab 页面（首页、场所、消息、我的）
  - 创建对应的页面文件
  - 更新登录页面跳转方式
  - 添加图标准备指南

## 后续计划

1. **图标资源**: 准备正式的 TabBar 图标
2. **功能完善**: 
   - 场所页面的数据加载和展示
   - 消息页面的消息推送集成
   - 我的页面的订单管理功能
3. **性能优化**: 优化页面加载速度和用户体验
4. **测试**: 在不同设备和平台上测试 TabBar 功能