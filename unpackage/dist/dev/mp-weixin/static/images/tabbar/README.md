# TabBar 图标资源说明

本目录用于存放底部导航栏（TabBar）的图标资源。

## 图标规格要求

### 尺寸规范
- **推荐尺寸**: 81px × 81px（@3x）
- **最小尺寸**: 40px × 40px
- **最大尺寸**: 120px × 120px
- 建议使用 PNG 格式，支持透明背景

### 图标设计要求
1. **简洁明了**: 图标应简洁清晰，易于识别
2. **风格统一**: 所有图标保持统一的设计风格
3. **颜色规范**:
   - 未选中状态: #a7abb2（灰色）
   - 选中状态: #4458ff（品牌蓝）
4. **透明背景**: 使用 PNG 格式，背景透明

## 需要准备的图标文件

### 1. 首页图标
- `home.png` - 未选中状态（灰色）
- `home-active.png` - 选中状态（蓝色）
- 建议图标: 房子/主页图标

### 2. 场所图标
- `venue.png` - 未选中状态（灰色）
- `venue-active.png` - 选中状态（蓝色）
- 建议图标: 位置/地图标记图标

### 3. 消息图标
- `message.png` - 未选中状态（灰色）
- `message-active.png` - 选中状态（蓝色）
- 建议图标: 消息/聊天气泡图标

### 4. 我的图标
- `profile.png` - 未选中状态（灰色）
- `profile-active.png` - 选中状态（蓝色）
- 建议图标: 用户/个人中心图标

## 图标制作建议

### 方式一：使用图标库
推荐使用以下图标库：
- [Iconfont](https://www.iconfont.cn/) - 阿里巴巴矢量图标库
- [IconPark](https://iconpark.oceanengine.com/) - 字节跳动图标库
- [Remix Icon](https://remixicon.com/) - 开源图标库

### 方式二：设计工具制作
使用 Figma、Sketch 或 Adobe Illustrator 等设计工具：
1. 创建 81px × 81px 的画布
2. 设计图标，保持线条粗细一致（建议 2-3px）
3. 导出两个版本：
   - 灰色版本（#a7abb2）
   - 蓝色版本（#4458ff）
4. 导出为 PNG 格式，背景透明

### 方式三：临时占位图标
在正式图标准备好之前，可以使用纯色方块作为占位：
1. 创建 81px × 81px 的图片
2. 填充对应颜色
3. 添加文字标识（如"首页"、"场所"等）

## 图标命名规范

- 使用小写字母和连字符
- 未选中状态: `[功能名].png`
- 选中状态: `[功能名]-active.png`
- 示例: `home.png`, `home-active.png`

## 当前配置

在 `pages.json` 中的 tabBar 配置：

```json
{
  "tabBar": {
    "color": "#a7abb2",
    "selectedColor": "#4458ff",
    "backgroundColor": "#FFFFFF",
    "borderStyle": "black",
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

## 注意事项

1. **文件路径**: 确保图标文件放在 `static/images/tabbar/` 目录下
2. **文件大小**: 建议每个图标文件不超过 50KB
3. **兼容性**: PNG 格式在所有平台都有良好支持
4. **测试**: 准备好图标后，在不同设备上测试显示效果
5. **备份**: 保留源文件（如 SVG、AI 等），便于后续修改

## 快速开始

如果您暂时没有准备图标，可以：
1. 使用纯色占位图标进行开发测试
2. 或者暂时注释掉 tabBar 配置中的 `iconPath` 和 `selectedIconPath`
3. 仅使用文字导航（uni-app 支持纯文字 tabBar）

准备好图标后，将文件放入本目录即可自动生效。