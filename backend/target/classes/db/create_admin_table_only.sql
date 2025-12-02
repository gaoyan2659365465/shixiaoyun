-- 创建管理员表（仅表结构）
CREATE TABLE IF NOT EXISTS `admin` (
    `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '管理员ID',
    `username` VARCHAR(50) NOT NULL COMMENT '用户名',
    `password` VARCHAR(255) NOT NULL COMMENT '密码（AES加密）',
    `real_name` VARCHAR(50) DEFAULT NULL COMMENT '真实姓名',
    `phone` VARCHAR(20) DEFAULT NULL COMMENT '手机号',
    `email` VARCHAR(100) DEFAULT NULL COMMENT '邮箱',
    `status` VARCHAR(20) NOT NULL DEFAULT 'active' COMMENT '状态：active-正常，disabled-禁用',
    `role` VARCHAR(20) NOT NULL DEFAULT 'admin' COMMENT '角色：super_admin-超级管理员，admin-普通管理员',
    `last_login_time` DATETIME DEFAULT NULL COMMENT '最后登录时间',
    `last_login_ip` VARCHAR(50) DEFAULT NULL COMMENT '最后登录IP',
    `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `deleted` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '逻辑删除标志：0-未删除，1-已删除',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_username` (`username`),
    KEY `idx_status` (`status`),
    KEY `idx_deleted` (`deleted`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='管理员表';
