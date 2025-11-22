package com.shixiaoyun.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * 微信登录DTO
 */
@Data
public class WechatLoginDTO {

    /**
     * 微信登录code
     */
    @NotBlank(message = "code不能为空")
    private String code;
}
