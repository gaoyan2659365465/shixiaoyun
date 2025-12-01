-- 创建业务合作申请表
CREATE TABLE IF NOT EXISTS `cooperation_application` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '申请ID',
  `name` VARCHAR(50) NOT NULL COMMENT '姓名',
  `company_name` VARCHAR(100) NOT NULL COMMENT '公司名称',
  `contact` VARCHAR(50) NOT NULL COMMENT '联系方式',
  `crm_code` VARCHAR(200) DEFAULT NULL COMMENT 'CRM编码',
  `status` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '审核状态 0-待审核 1-审核通过 2-审核拒绝',
  `remark` VARCHAR(500) DEFAULT NULL COMMENT '审核备注',
  `audit_time` DATETIME DEFAULT NULL COMMENT '审核时间',
  `deleted` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '删除标记 0-未删除 1-已删除',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_status` (`status`),
  KEY `idx_create_time` (`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='业务合作申请表';
