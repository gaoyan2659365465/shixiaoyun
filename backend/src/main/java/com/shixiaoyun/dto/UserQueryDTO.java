package com.shixiaoyun.dto;

import lombok.Data;

/**
 * 用户查询DTO
 */
@Data
public class UserQueryDTO {

    /**
     * 当前页码
     */
    private Integer page = 1;

    /**
     * 每页大小
     */
    private Integer size = 10;

    /**
     * 关键词(手机号/昵称)
     */
    private String keyword;

    /**
     * 状态 active-正常 disabled-禁用
     */
    private String status;
}
