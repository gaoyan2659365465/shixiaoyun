package com.shixiaoyun.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 管理后台用户VO
 */
@Data
public class AdminUserVO {

    /**
     * 用户ID
     */
    private Long id;

    /**
     * 昵称
     */
    private String nickname;

    /**
     * 手机号
     */
    private String phone;

    /**
     * 邮箱
     */
    private String email;

    /**
     * 头像URL
     */
    private String avatar;

    /**
     * 性别 0-未知 1-男 2-女
     */
    private Integer gender;

    /**
     * 是否老客户 0-否 1-是
     */
    private Integer isOldCustomer;

    /**
     * 积分
     */
    private Integer points;

    /**
     * 状态 active-正常 disabled-禁用
     */
    private String status;

    /**
     * 创建时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;

    /**
     * 更新时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updateTime;
}
