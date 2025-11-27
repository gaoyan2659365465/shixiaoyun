# 业务合作页面 (Business Cooperation Page)

## 📋 概述

这是一个动态生成的业务合作伙伴展示页面，基于参考UI设计实现，支持搜索、筛选和联系功能。

## 🎯 功能特性

- ✅ 动态渲染合作伙伴列表
- ✅ 实时搜索功能
- ✅ 多条件筛选（城市、客户类型、服务类型）
- ✅ 响应式布局，适配不同屏幕尺寸
- ✅ 点击联系功能（支持拨打电话）
- ✅ 模块化数据管理
- ✅ 易于替换为真实API数据

## 📁 文件结构

```
pages/cooperation/
├── cooperation.vue          # 主页面组件
└── README.md               # 说明文档

data/
└── partners.js             # 数据管理模块
```

## 🔧 技术实现

### 1. 数据层 (`data/partners.js`)

数据管理模块提供以下功能：

- `getAllPartners()` - 获取所有合作伙伴
- `getPartnerById(id)` - 根据ID获取详情
- `searchPartners(keyword)` - 搜索合作伙伴
- `filterPartners(filters)` - 根据条件筛选
- `getFilterConfig()` - 获取筛选配置

### 2. 展示层 (`cooperation.vue`)

页面组件包含：

- **顶部标题区域** - 显示"合作伙伴"标题
- **筛选区域** - 城市、类型、服务筛选标签 + 搜索框
- **合作伙伴列表** - 动态渲染的卡片列表
  - 左侧：Logo占位图
  - 中间：名称、地址、标签
  - 右侧：联系按钮

### 3. 样式设计

- 使用 SCSS 预处理器
- 响应式布局（支持移动端和桌面端）
- 平滑过渡动画效果
- 符合参考UI的视觉规范

## 📊 数据结构

每个合作伙伴对象包含以下字段：

```javascript
{
  id: 1,                              // 唯一标识
  name: '晋城运营服务中心',            // 名称
  logo: '',                           // Logo URL
  location: '浙江省杭州市西湖区',      // 位置
  address: '西湖区文三路123号',        // 详细地址
  tags: ['电讯学院', '酒店工程'],      // 标签数组
  type: '客户类型A',                   // 客户类型
  service: '门店服务',                 // 服务类型
  city: '杭州市',                      // 城市
  phone: '0571-12345678',             // 联系电话
  email: 'jincheng@example.com',      // 邮箱
  description: '专业的运营服务中心...' // 描述
}
```

## 🔄 替换为真实API

### 方法1：修改数据模块

在 `data/partners.js` 中，将模拟数据替换为API调用：

```javascript
// 修改前（测试数据）
export function getAllPartners() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...partnersData]);
    }, 100);
  });
}

// 修改后（真实API）
export function getAllPartners() {
  return uni.request({
    url: 'https://api.example.com/partners',
    method: 'GET'
  }).then(res => res.data);
}
```

### 方法2：使用API服务层

创建 `api/partners.js`：

```javascript
import request from '@/utils/request.js';

export function getPartnerList(params) {
  return request({
    url: '/api/partners',
    method: 'GET',
    data: params
  });
}

export function getPartnerDetail(id) {
  return request({
    url: `/api/partners/${id}`,
    method: 'GET'
  });
}
```

然后在 `cooperation.vue` 中导入使用：

```javascript
import { getPartnerList } from '@/api/partners.js';

async loadPartners() {
  try {
    this.loading = true;
    const data = await getPartnerList();
    this.partners = data;
  } catch (error) {
    console.error('加载失败:', error);
  } finally {
    this.loading = false;
  }
}
```

## 🎨 样式定制

### 修改主题色

在 `cooperation.vue` 的 `<style>` 部分修改：

```scss
// 主色调
$primary-color: #333333;      // 按钮背景色
$text-color: #000000;         // 主文本颜色
$secondary-text: #666666;     // 次要文本颜色
$border-color: #e5e5e5;       // 边框颜色
$bg-color: #f5f5f5;          // 背景色
```

### 调整间距

```scss
.partner-item {
  padding: 32rpx;           // 卡片内边距
  margin-bottom: 24rpx;     // 卡片间距
  border-radius: 16rpx;     // 圆角大小
}
```

## 📱 响应式适配

页面已针对不同屏幕尺寸进行优化：

- **移动端** (< 750rpx)：垂直布局，联系按钮全宽
- **平板/桌面端** (≥ 750rpx)：水平布局，紧凑排列

## 🚀 使用方法

### 1. 页面跳转

```javascript
// 从其他页面跳转到合作伙伴页面
uni.navigateTo({
  url: '/pages/cooperation/cooperation'
});
```

### 2. 传递参数

```javascript
// 跳转并传递筛选参数
uni.navigateTo({
  url: '/pages/cooperation/cooperation?city=杭州市'
});

// 在 cooperation.vue 的 onLoad 中接收
onLoad(options) {
  if (options.city) {
    // 应用筛选条件
    this.applyFilter('city', options.city);
  }
  this.loadPartners();
}
```

## 🔍 搜索功能

搜索支持以下字段：
- 合作伙伴名称
- 位置信息
- 详细地址
- 标签内容
- 描述信息

## 📞 联系功能

点击"联系我们"按钮会：
1. 显示合作伙伴的联系信息（电话、邮箱）
2. 提供拨打电话选项
3. 调用系统电话功能

## ⚠️ 注意事项

1. **Logo图片**：当前使用灰色占位图，需要替换为实际Logo URL
2. **权限配置**：拨打电话功能需要在 `manifest.json` 中配置权限
3. **数据验证**：接入真实API时，需要添加数据验证和错误处理
4. **性能优化**：大量数据时建议添加分页或虚拟列表

## 🛠️ 扩展建议

### 1. 添加详情页

创建 `pages/partner-detail/partner-detail.vue` 展示详细信息

### 2. 添加收藏功能

```javascript
// 在 cooperation.vue 中添加
toggleFavorite(partner) {
  partner.isFavorite = !partner.isFavorite;
  // 保存到本地存储或同步到服务器
}
```

### 3. 添加地图定位

集成地图组件显示合作伙伴位置

### 4. 添加分享功能

```javascript
sharePartner(partner) {
  uni.share({
    provider: 'weixin',
    type: 0,
    title: partner.name,
    summary: partner.description,
    href: `https://example.com/partner/${partner.id}`
  });
}
```

## 📝 更新日志

- **v1.0.0** (2025-11-25)
  - ✅ 初始版本发布
  - ✅ 实现基础展示功能
  - ✅ 添加搜索和筛选
  - ✅ 集成联系功能
  - ✅ 模块化数据管理

## 📄 许可证

本项目代码仅供学习和参考使用。