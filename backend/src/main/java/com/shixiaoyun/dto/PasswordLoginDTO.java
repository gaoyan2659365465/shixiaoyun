package com.shixiaoyun.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * 密码登录DTO
 */
@Data
public class PasswordLoginDTO {

    /**
     * 手机号
     */
    @NotBlank(message = "手机号不能为空")
    private String phone;

    /**
     * 密码
     */
    @NotBlank(message = "密码不能为空")
    private String password;
}
