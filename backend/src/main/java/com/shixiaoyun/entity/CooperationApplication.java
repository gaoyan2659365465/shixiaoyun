package com.shixiaoyun.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 业务合作申请实体
 */
@Data
@TableName("cooperation_application")
public class CooperationApplication implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 申请ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 姓名
     */
    private String name;

    /**
     * 公司名称
     */
    private String companyName;

    /**
     * 联系方式
     */
    private String contact;

    /**
     * CRM编码
     */
    private String crmCode;

    /**
     * 审核状态 0-待审核 1-审核通过 2-审核拒绝
     */
    private Integer status;

    /**
     * 审核备注
     */
    private String remark;

    /**
     * 审核时间
     */
    private LocalDateTime auditTime;

    /**
     * 删除标记 0-未删除 1-已删除
     */
    @TableLogic
    private Integer deleted;

    /**
     * 创建时间
     */
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    /**
     * 更新时间
     */
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}
