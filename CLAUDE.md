# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

视消云 (Shixiaoyun) is a uni-app based WeChat mini-program with a Spring Boot backend. The project implements user authentication (login/register), points mall, coupon center, cooperation partner page, and a tabbed navigation structure.

## Technology Stack

**Frontend**: uni-app (Vue 3) targeting WeChat mini-program (mp-weixin)
**Backend**: Spring Boot 2.7.18, MyBatis-Plus, MySQL 5.6, Redis, RabbitMQ
**Build Tools**: HBuilder X (frontend), Maven (backend)

## Development Commands

### Backend

```bash
# Navigate to backend directory
cd backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run

# Run tests
mvn test
```

Backend runs on `http://localhost:8080/api`
Swagger UI: `http://localhost:8080/api/swagger-ui.html`

### Frontend

Frontend development is done through HBuilder X IDE:
1. Open project root in HBuilder X
2. Run to browser or WeChat DevTools via IDE menu
3. No separate build commands needed - HBuilder X handles compilation

Build output: `unpackage/dist/dev/mp-weixin/` (development) or `unpackage/dist/build/mp-weixin/` (production)

### Database Setup

```bash
# Create database
mysql -u root -p
CREATE DATABASE shixiaoyun;

# Run schema
mysql -u root -p shixiaoyun < backend/src/main/resources/db/schema.sql
```

## Architecture

### Frontend Architecture

**Request Flow**: Vue Component → API Layer (`api/user.js`) → Request Util (`utils/request.js`) → Backend

**Key Utilities**:
- `utils/request.js`: Unified HTTP client with JWT token injection and error handling
- `utils/storage.js`: Local storage wrapper for uni.setStorageSync/getStorageSync
- `utils/validator.js`: Form validation (phone, email, password, verification codes)

**API Modules**:
- `api/user.js`: User authentication and profile APIs
- `api/activity.js`: Activity related APIs
- `api/points.js`: Points mall and coupon APIs (backend integration)
- `api/coupon.js`: Coupon center APIs (currently mock data implementation)

**Mock Data**:
- `data/coupon.js`: Mock coupon data for development (coupon center uses this instead of backend)

**API Base URL**: Configured in `utils/request.js:2` as `http://localhost:8080/api`

**Authentication**: JWT token stored in local storage, automatically attached to requests via Authorization header

### Backend Architecture

**Package Structure**: `com.shixiaoyun.*`
- `controller/`: REST endpoints
- `service/` + `service/impl/`: Business logic
- `mapper/`: MyBatis-Plus data access
- `entity/`: Database entities
- `dto/`: Request data transfer objects
- `vo/`: Response view objects
- `common/`: Shared utilities (Result, GlobalExceptionHandler, BusinessException)
- `utils/`: AESUtil (password encryption), JwtUtil (token generation)

**Response Format**: All endpoints return `Result<T>` wrapper with `code`, `message`, `data` fields

**Security**:
- Passwords encrypted with AES (reversible) - key in `application.yml:80`
- JWT authentication - secret in `application.yml:75`, 7-day expiration
- Verification codes stored in Redis with 5-minute TTL

**Database**: MyBatis-Plus with automatic camelCase mapping, logical deletion enabled (deleted field)

### Configuration

Backend configuration in `backend/src/main/resources/application.yml`:
- Server context path: `/api`
- Database connection: lines 11-27
- Redis: lines 30-41
- RabbitMQ: lines 44-49
- JWT secret: line 75
- AES secret: line 80

**Important**: Update database password (line 16), JWT secret, and AES secret before production deployment.

## Pages and Routes

Configured in `pages.json`:

**Main Pages (TabBar)**:
- `/pages/index/index` - Home page (tab 1)
- `/pages/venue/venue` - Venue page (tab 2)
- `/pages/message/message` - Message page (tab 3)
- `/pages/profile/profile` - Profile/My page (tab 4)

**Secondary Pages**:
- `/pages/login/login` - Login page
- `/pages/register/register` - Registration page (custom navigation)
- `/pages/cooperation/cooperation` - Partner cooperation page
- `/pages/points/points` - Points mall page (with pull-to-refresh)
- `/pages/coupon/coupon` - Coupon center page (custom navigation, uses mock data)

**TabBar Configuration**:
- 4 tabs with custom icons (home, venue, message, profile)
- Active color: `#4458ff` (brand blue)
- Inactive color: `#a7abb2` (auxiliary text)

## API Endpoints

All endpoints prefixed with `/api`:

**Authentication**:
- `POST /user/register` - User registration
- `POST /user/login/password` - Password login
- `POST /user/login/code` - SMS code login
- `POST /user/login/wechat` - WeChat login
- `GET /user/info` - Get user info (requires auth)

**Verification Codes**:
- `POST /user/code/email` - Send email verification code
- `POST /user/code/sms` - Send SMS verification code

**Points Mall** (from `api/points.js`):
- `GET /points/user` - Get user points information
- `GET /points/history` - Get points transaction history (paginated)
- `GET /points/products` - Get points mall product list (with category/sort filters)
- `GET /points/products/:id` - Get product detail
- `POST /points/products/:id/exchange` - Exchange product with points
- `GET /points/exchanges` - Get my exchange orders (paginated)
- `GET /points/exchanges/:id` - Get exchange order detail
- `GET /points/coupons` - Get my coupons list
- `POST /points/coupons/:id/use` - Use a coupon

**Coupon Center** (from `api/coupon.js` - **Mock Implementation**):
- `getCouponList(params)` - Get coupon list by status (unused/used/expired/all)
- `useCoupon(couponId)` - Mark coupon as used
- `getCouponStats()` - Get coupon statistics (counts by status)

Note:
- In development, verification codes are logged to backend console instead of being sent.
- Coupon center currently uses mock data from `data/coupon.js` with simulated network delays (200-500ms).

## UI Design System

Colors defined in README.md:
- Brand blue: `#4458ff`
- Auxiliary blue: `#1386ff`
- Auxiliary red: `#f34545`
- Background: `#F5F6FA`
- Title text: `#17171a`
- Body text: `#656a73`
- Auxiliary text: `#a7abb2`

Layout: 375×812 design canvas, 4px grid system, 56px form/button height, 8px card radius

## Development Notes

### General Guidelines

- Frontend API calls must use `utils/request.js` wrapper, not raw uni.request
- Form validation must use `utils/validator.js` before submission
- Backend exceptions should throw `BusinessException` for business logic errors
- All backend endpoints must return `Result<T>` wrapper
- Password validation: 6-20 characters, must contain letters and numbers
- Phone validation: Chinese mobile format (1[3-9]xxxxxxxxx)
- Verification codes: 6 digits, 5-minute expiration

### Mock Data vs Backend APIs

The project uses a hybrid approach:
- **User authentication, points mall**: Use backend APIs via `utils/request.js`
- **Coupon center**: Currently uses mock data from `data/coupon.js` via `api/coupon.js`

When implementing new features:
1. Start with mock data in `data/` directory for rapid prototyping
2. Create API wrapper in `api/` directory (can return mock data initially)
3. Replace with real backend integration when backend is ready
4. Keep the same API interface to minimize frontend changes

### Page Navigation Patterns

- **TabBar pages**: Use `uni.switchTab()` for navigation between main tabs
- **Regular pages**: Use `uni.navigateTo()` for standard navigation
- **Custom navigation**: Set `navigationStyle: "custom"` in pages.json for custom headers
- **Pull-to-refresh**: Enable with `enablePullDownRefresh: true` in pages.json

### Component Organization

For complex pages (like coupon center), follow this structure:
```
pages/[feature]/
├── [feature].vue           # Main page
├── components/             # Feature-specific components
│   ├── ComponentA.vue
│   └── ComponentB.vue
└── README.md              # Optional documentation
```

### Coupon Center Implementation

The coupon center (`pages/coupon/coupon.vue`) demonstrates:
- Tab-based filtering (unused/used/expired)
- Pagination with pull-to-refresh and load-more
- Mock data integration with simulated delays
- Custom navigation bar
- Status-based UI rendering

Reference the implementation plan in `需求/卡券中心实施方案.md` for detailed architecture.
