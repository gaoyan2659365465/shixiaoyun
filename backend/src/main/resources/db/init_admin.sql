-- ========================================
-- 视消云后台管理系统 - 管理员表初始化脚本
-- ========================================

USE shixiaoyun;

-- 1. 创建管理员表
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

-- 2. 插入初始管理员账号
-- 注意：密码需要使用 AES 加密，这里先插入一个占位符
-- 执行完此脚本后，需要运行 Java 测试类生成加密密码，然后更新此记录
INSERT INTO `admin` (`username`, `password`, `real_name`, `status`, `role`)
VALUES ('admin', 'TEMP_PASSWORD', '系统管理员', 'active', 'super_admin');

-- ========================================
-- 执行完成后的步骤：
-- 1. 运行后端项目
-- 2. 执行测试类生成加密密码：
--    mvn test -Dtest=PasswordGeneratorTest#generateAdminPassword
-- 3. 复制生成的加密密码
-- 4. 执行更新语句：
--    UPDATE admin SET password = '加密后的密码' WHERE username = 'admin';
-- ========================================

SELECT '管理员表创建成功！' AS message;
SELECT '请按照注释中的步骤完成密码设置' AS next_step;
