-- 创建管理员表
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

-- 插入初始管理员账号
-- 用户名: admin
-- 密码: admin123 (AES加密后的值，需要根据实际的 AES 密钥生成)
-- 注意：这里的密码是示例，实际使用时需要用 AESUtil.encrypt("admin123") 生成加密后的值
INSERT INTO `admin` (`username`, `password`, `real_name`, `status`, `role`)
VALUES ('admin', 'ENCRYPTED_PASSWORD_PLACEHOLDER', '系统管理员', 'active', 'super_admin');

-- 说明：
-- 1. 首次使用需要将 ENCRYPTED_PASSWORD_PLACEHOLDER 替换为实际加密后的密码
-- 2. 可以通过以下方式生成加密密码：
--    - 在 Java 代码中调用 AESUtil.encrypt("admin123")
--    - 或者先启动应用，通过注册接口创建管理员账号
-- 3. 默认管理员账号：
--    用户名：admin
--    密码：admin123
