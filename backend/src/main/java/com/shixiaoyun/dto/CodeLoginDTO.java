package com.shixiaoyun.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * 验证码登录DTO
 */
@Data
public class CodeLoginDTO {

    /**
     * 手机号
     */
    @NotBlank(message = "手机号不能为空")
    private String phone;

    /**
     * 验证码
     */
    @NotBlank(message = "验证码不能为空")
    private String code;
}
