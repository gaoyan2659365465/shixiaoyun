# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

视消云 (Shixiaoyun) is a uni-app based WeChat mini-program with a Spring Boot backend. The project implements user authentication (login/register) with multiple login methods and a cooperation partner page.

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
- `/pages/index/index` - Home page
- `/pages/login/login` - Login page
- `/pages/register/register` - Registration (custom navigation)
- `/pages/cooperation/cooperation` - Partner cooperation page

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

Note: In development, verification codes are logged to backend console instead of being sent.

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

- Frontend API calls must use `utils/request.js` wrapper, not raw uni.request
- Form validation must use `utils/validator.js` before submission
- Backend exceptions should throw `BusinessException` for business logic errors
- All backend endpoints must return `Result<T>` wrapper
- Password validation: 6-20 characters, must contain letters and numbers
- Phone validation: Chinese mobile format (1[3-9]xxxxxxxxx)
- Verification codes: 6 digits, 5-minute expiration
