# 首页实现说明

## 📁 文件结构

```
pages/index/
├── index.vue                    # 首页主文件
├── components/                  # 首页组件
│   ├── SearchBar.vue           # 搜索框组件
│   ├── BannerSwiper.vue        # 轮播横幅组件
│   ├── QuickEntry.vue          # 快捷入口组件
│   ├── SectionTitle.vue        # 区块标题组件
│   └── ActivityCard.vue        # 活动卡片组件
└── README.md                    # 本文件
```

## ✅ 已完成功能

### 1. 搜索框 (SearchBar)
- ✅ 点击跳转搜索页
- ✅ 自定义占位符文本
- ✅ 响应式设计

### 2. 轮播横幅 (BannerSwiper)
- ✅ 自动轮播
- ✅ 指示点显示
- ✅ 点击跳转
- ✅ 标题和副标题显示
- ✅ 渐变遮罩效果

### 3. 快捷入口 (QuickEntry)
- ✅ 3个圆形图标入口
- ✅ 徽标显示（如"NEW"）
- ✅ 点击跳转
- ✅ 阴影效果

### 4. 区块标题 (SectionTitle)
- ✅ 主标题和副标题
- ✅ 右侧箭头
- ✅ 点击查看更多

### 5. 活动卡片 (ActivityCard)
- ✅ 活动图片展示
- ✅ 活动标题（最多2行）
- ✅ 时间信息
- ✅ 参与人数显示
- ✅ 报名按钮（根据状态变化）
- ✅ 点击查看详情

### 6. 首页功能
- ✅ 下拉刷新
- ✅ 上拉加载更多
- ✅ 空状态显示
- ✅ 加载状态显示
- ✅ 本地数据兜底（API失败时）

## 🎨 设计规范

所有组件严格遵循项目UI规范：

- **颜色**: 品牌蓝#4458ff、背景#F5F6FA
- **间距**: W1(8rpx)、W2(16rpx)、W3(24rpx)、W4(32rpx)
- **字体**: T2(36rpx)、T3(32rpx)、T4(28rpx)、T5(24rpx)
- **圆角**: 卡片16rpx、搜索框16rpx、按钮32rpx

## 📊 数据流

```
本地数据 (data/home.js)
    ↓
API接口 (api/activity.js)
    ↓
首页 (index.vue)
    ↓
组件 (components/*.vue)
```

## 🔧 使用说明

### 启动项目

```bash
# 微信小程序
npm run dev:mp-weixin
```

### 测试功能

1. **搜索功能**: 点击顶部搜索框
2. **轮播横幅**: 自动轮播，点击可跳转
3. **快捷入口**: 点击图标跳转对应页面
4. **活动列表**: 
   - 点击卡片查看详情
   - 点击按钮报名活动
   - 下拉刷新数据
   - 上拉加载更多

## ⚠️ 注意事项

### 1. 图片资源

需要准备以下图片资源：

```
static/images/home/
├── banner/
│   ├── banner1.jpg (750×560px)
│   ├── banner2.jpg
│   └── banner3.jpg
├── icons/
│   ├── checkin.png (128×128px)
│   ├── cooperation.png
│   └── points.png
└── activities/
    ├── activity1.jpg (750×800px)
    ├── activity2.jpg
    ├── activity3.jpg
    └── activity4.jpg
```

### 2. API接口

当前使用本地数据兜底，实际使用时需要：

1. 确保后端接口已实现
2. 配置正确的API地址（`utils/request.js`）
3. 处理登录态和权限

### 3. 页面跳转

以下页面需要创建：

- `/pages/search/search` - 搜索页
- `/pages/activity/list` - 活动列表页
- `/pages/activity/detail` - 活动详情页
- `/pages/checkin/checkin` - 签到页
- `/pages/points/points` - 积分商城页

## 🐛 常见问题

### Q: 组件样式不生效？
A: 确保已在 `uni.scss` 中导入样式变量文件

### Q: 图片无法显示？
A: 检查图片路径是否正确，确保图片文件存在

### Q: API请求失败？
A: 当前会自动使用本地数据兜底，检查 `data/home.js`

### Q: 下拉刷新不工作？
A: 确保 `pages.json` 中已配置 `enablePullDownRefresh: true`

## 📝 后续优化

- [ ] 添加骨架屏
- [ ] 优化图片懒加载
- [ ] 添加错误边界处理
- [ ] 性能优化（虚拟列表）
- [ ] 添加埋点统计

## 📚 相关文档

- [需求/首页实现方案.md](../../需求/首页实现方案.md)
- [需求/首页组件实现代码.md](../../需求/首页组件实现代码.md)
- [需求/首页实施指南.md](../../需求/首页实施指南.md)
- [需求/首页组件清单.md](../../需求/首页组件清单.md)