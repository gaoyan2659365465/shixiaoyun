-- 创建数据库
CREATE DATABASE IF NOT EXISTS shixiaoyun DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE shixiaoyun;

-- 用户表
CREATE TABLE `sys_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `nickname` varchar(50) NOT NULL COMMENT '昵称',
  `phone` varchar(11) DEFAULT NULL COMMENT '手机号',
  `email` varchar(100) DEFAULT NULL COMMENT '邮箱',
  `password` varchar(255) DEFAULT NULL COMMENT '密码(AES加密)',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像URL',
  `gender` tinyint(1) DEFAULT 0 COMMENT '性别 0-未知 1-男 2-女',
  `openid` varchar(64) DEFAULT NULL COMMENT '微信openId',
  `unionid` varchar(64) DEFAULT NULL COMMENT '微信unionId',
  `crm_customer_id` varchar(64) DEFAULT NULL COMMENT 'CRM客户ID',
  `is_old_customer` tinyint(1) DEFAULT 0 COMMENT '是否老客户 0-否 1-是',
  `status` tinyint(1) DEFAULT 1 COMMENT '状态 0-禁用 1-正常',
  `deleted` tinyint(1) DEFAULT 0 COMMENT '删除标记 0-未删除 1-已删除',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_phone` (`phone`),
  UNIQUE KEY `uk_email` (`email`),
  KEY `idx_openid` (`openid`),
  KEY `idx_crm_customer_id` (`crm_customer_id`),
  KEY `idx_create_time` (`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- 验证码表
CREATE TABLE `sys_verification_code` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `type` tinyint(1) NOT NULL COMMENT '验证码类型 1-短信 2-邮箱',
  `target` varchar(100) NOT NULL COMMENT '目标(手机号或邮箱)',
  `code` varchar(10) NOT NULL COMMENT '验证码',
  `expire_time` datetime NOT NULL COMMENT '过期时间',
  `used` tinyint(1) DEFAULT 0 COMMENT '是否已使用 0-未使用 1-已使用',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_target_type` (`target`, `type`),
  KEY `idx_expire_time` (`expire_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='验证码表';

-- 积分账户表
CREATE TABLE `points_account` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_id` bigint(20) NOT NULL COMMENT '用户ID',
  `total_points` bigint(20) DEFAULT 0 COMMENT '总积分',
  `available_points` bigint(20) DEFAULT 0 COMMENT '可用积分',
  `frozen_points` bigint(20) DEFAULT 0 COMMENT '冻结积分',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='积分账户表';

-- 积分流水表
CREATE TABLE `points_transaction` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_id` bigint(20) NOT NULL COMMENT '用户ID',
  `type` tinyint(2) NOT NULL COMMENT '类型 1-签到 2-任务奖励 3-兑换消耗 4-抽奖消耗 5-抽奖奖励',
  `points` bigint(20) NOT NULL COMMENT '积分数量(正数为增加,负数为减少)',
  `balance` bigint(20) NOT NULL COMMENT '变动后余额',
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `related_id` bigint(20) DEFAULT NULL COMMENT '关联ID(任务ID、兑换记录ID等)',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_create_time` (`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='积分流水表';
