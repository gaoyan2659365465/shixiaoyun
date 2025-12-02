package com.shixiaoyun.vo;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * 管理员信息 VO
 */
@Data
public class AdminVO {

    /**
     * 管理员ID
     */
    private Long id;

    /**
     * 用户名
     */
    private String username;

    /**
     * 真实姓名
     */
    private String realName;

    /**
     * 手机号
     */
    private String phone;

    /**
     * 邮箱
     */
    private String email;

    /**
     * 状态
     */
    private String status;

    /**
     * 角色
     */
    private String role;

    /**
     * 最后登录时间
     */
    private LocalDateTime lastLoginTime;

    /**
     * 创建时间
     */
    private LocalDateTime createTime;
}
