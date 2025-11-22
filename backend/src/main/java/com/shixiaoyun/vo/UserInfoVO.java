package com.shixiaoyun.vo;

import lombok.Data;

/**
 * 用户信息VO
 */
@Data
public class UserInfoVO {

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
}
