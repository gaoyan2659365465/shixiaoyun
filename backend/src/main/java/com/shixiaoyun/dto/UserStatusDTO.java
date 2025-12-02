package com.shixiaoyun.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * 用户状态更新DTO
 */
@Data
public class UserStatusDTO {

    /**
     * 状态 active-正常 disabled-禁用
     */
    @NotBlank(message = "状态不能为空")
    private String status;
}
