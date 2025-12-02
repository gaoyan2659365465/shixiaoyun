package com.shixiaoyun.vo;

import lombok.Data;

/**
 * 管理员登录响应 VO
 */
@Data
public class AdminLoginVO {

    /**
     * JWT Token
     */
    private String token;

    /**
     * 管理员信息
     */
    private AdminVO adminInfo;
}
