# 视消云小程序 - 登录/注册模块

## 项目简介

视消云小程序的登录/注册功能模块,包含前端(uni-app)和后端(Spring Boot)完整实现。

## 技术栈

### 前端
- **框架**: uni-app (Vue3)
- **开发工具**: HBuilder X
- **UI规范**: 自定义设计系统(参考UI需求.md)

### 后端
- **核心框架**: Spring Boot 2.7.18
- **数据库**: MySQL 5.6
- **ORM**: MyBatis-Plus
- **构建工具**: Maven
- **API文档**: Springdoc OpenAPI (Swagger)
- **缓存**: Redis
- **消息队列**: RabbitMQ
- **密码加密**: AES可逆加密

## 项目结构

```
shixiaoyun/
├── pages/                    # 前端页面
│   ├── login/               # 登录页面
│   │   └── login.vue
│   ├── register/            # 注册页面
│   │   └── register.vue
│   └── index/               # 首页
├── utils/                   # 前端工具类
│   ├── request.js          # 统一请求封装
│   ├── storage.js          # 本地存储封装
│   └── validator.js        # 表单验证工具
├── api/                     # API接口
│   └── user.js             # 用户相关API
├── backend/                 # 后端项目
│   ├── src/main/java/com/shixiaoyun/
│   │   ├── controller/     # 控制器
│   │   ├── service/        # 业务逻辑
│   │   ├── mapper/         # 数据访问
│   │   ├── entity/         # 实体类
│   │   ├── dto/            # 数据传输对象
│   │   ├── vo/             # 视图对象
│   │   ├── utils/          # 工具类
│   │   ├── common/         # 通用类
│   │   └── config/         # 配置类
│   └── src/main/resources/
│       ├── application.yml # 配置文件
│       └── db/schema.sql   # 数据库表结构
└── 需求/                    # 需求文档
```

## 功能特性

### 1. 登录功能
- ✅ 手机号+密码登录
- ✅ 手机号+验证码登录
- ✅ 微信登录
- ✅ 隐私协议勾选
- ✅ 记住登录状态(Token)

### 2. 注册功能
- ✅ 昵称设置
- ✅ 手机号注册
- ✅ 邮箱验证
- ✅ 邮箱验证码
- ✅ 密码设置(6-20位,包含字母和数字)
- ✅ 隐私协议勾选

### 3. 安全特性
- ✅ 密码AES加密存储(可逆)
- ✅ JWT Token认证
- ✅ 验证码有效期控制(5分钟)
- ✅ 表单数据验证
- ✅ 统一异常处理

## 快速开始

### 前置要求
- Node.js 14+
- HBuilder X
- JDK 1.8
- Maven 3.6+
- MySQL 5.6+
- Redis 5.0+

### 数据库初始化

1. 创建数据库
```bash
mysql -u root -p
```

2. 执行SQL脚本
```sql
source backend/src/main/resources/db/schema.sql
```

### 后端启动

1. 修改配置文件 `backend/src/main/resources/application.yml`,配置数据库和Redis连接信息:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/shixiaoyun?useUnicode=true&characterEncoding=utf8&useSSL=false
    username: root
    password: your_password
  redis:
    host: localhost
    port: 6379
```

2. 编译并启动
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

3. 访问API文档
```
http://localhost:8080/api/swagger-ui.html
```

### 前端启动

1. 使用HBuilder X打开项目根目录

2. 修改API地址 `utils/request.js`:
```javascript
const BASE_URL = 'http://localhost:8080/api'
```

3. 运行到浏览器或微信开发者工具

## API接口

### 用户注册
```
POST /api/user/register
```

请求体:
```json
{
  "nickname": "张三",
  "phone": "13800138000",
  "email": "zhangsan@example.com",
  "emailCode": "123456",
  "password": "password123"
}
```

### 密码登录
```
POST /api/user/login/password
```

请求体:
```json
{
  "phone": "13800138000",
  "password": "password123"
}
```

### 验证码登录
```
POST /api/user/login/code
```

请求体:
```json
{
  "phone": "13800138000",
  "code": "123456"
}
```

### 微信登录
```
POST /api/user/login/wechat
```

请求体:
```json
{
  "code": "wechat_code"
}
```

### 发送邮箱验证码
```
POST /api/user/code/email
```

请求体:
```json
{
  "email": "zhangsan@example.com"
}
```

### 发送短信验证码
```
POST /api/user/code/sms
```

请求体:
```json
{
  "phone": "13800138000"
}
```

## 密码加密说明

### AES加密方案

本项目使用AES对称加密算法对密码进行可逆加密存储,便于后续数据迁移。

**配置文件**: `application.yml`
```yaml
aes:
  secret-key: shixiaoyun-aes-secret-2024-key
```

**加密工具类**: `com.shixiaoyun.utils.AESUtil`

**密码逆向方式**:
```java
// 解密
String password = AESUtil.decrypt(encryptedPassword);
```

**重要提示**:
- 请妥善保管密钥配置 `aes.secret-key`
- 生产环境建议使用环境变量配置密钥
- 密钥不应提交到代码仓库

## UI设计规范

### 颜色系统
- 品牌蓝: `#4458ff`
- 辅助蓝: `#1386ff`
- 辅助红: `#f34545`
- 背景色: `#F5F6FA`
- 标题文字: `#17171a`
- 正文: `#656a73`
- 辅助: `#a7abb2`

### 布局规范
- 设计画板尺寸: 375 × 812
- 栅格基数: 4
- 间距使用4的倍数
- 表单/输入高度: 56px
- 卡片圆角: 8px
- 按钮高度: 56px

详细设计规范请参考 `需求/UI需求.md`

## 开发注意事项

1. **前端开发**
   - 所有API请求统一使用 `utils/request.js` 封装
   - 使用 `utils/validator.js` 进行表单验证
   - Token存储在本地,使用 `utils/storage.js` 管理
   - 遵循UI设计规范,保持视觉一致性

2. **后端开发**
   - 所有接口返回统一使用 `Result` 包装
   - 业务异常抛出 `BusinessException`
   - 敏感信息使用AES加密
   - API接口添加Swagger注解

3. **安全建议**
   - 生产环境修改JWT和AES密钥
   - 启用HTTPS
   - 配置CORS跨域策略
   - 添加接口频率限制

## 测试账号

开发测试时,验证码会输出到后端控制台日志中,方便测试。

生产环境请接入真实的邮件和短信服务。

## 后续开发计划

- [ ] 个人信息页面
- [ ] 安全中心(修改密码)
- [ ] CRM系统绑定
- [ ] 积分系统
- [ ] 任务系统
- [ ] 社区功能
- [ ] 积分商城

## 联系方式

如有问题,请参考需求文档或联系开发团队。

## 许可证

Copyright © 2024 视消云
