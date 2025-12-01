package com.shixiaoyun.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * 业务合作注册DTO
 */
@Data
public class CooperationRegisterDTO {

    /**
     * 姓名
     */
    @NotBlank(message = "姓名不能为空")
    @Size(min = 2, max = 20, message = "姓名长度为2-20个字符")
    private String name;

    /**
     * 公司名称
     */
    @NotBlank(message = "公司名称不能为空")
    @Size(max = 100, message = "公司名称不能超过100个字符")
    private String companyName;

    /**
     * 联系方式
     */
    @NotBlank(message = "联系方式不能为空")
    @Size(max = 50, message = "联系方式不能超过50个字符")
    private String contact;

    /**
     * CRM编码（选填）
     */
    @Size(max = 200, message = "CRM编码不能超过200个字符")
    private String crmCode;
}
