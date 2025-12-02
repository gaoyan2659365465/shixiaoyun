package com.shixiaoyun.service;

import com.shixiaoyun.dto.UserQueryDTO;
import com.shixiaoyun.vo.AdminUserVO;
import com.shixiaoyun.vo.PageVO;

/**
 * 管理后台用户Service接口
 */
public interface AdminUserService {

    /**
     * 分页查询用户列表
     * @param queryDTO 查询条件
     * @return 分页结果
     */
    PageVO<AdminUserVO> getUserList(UserQueryDTO queryDTO);

    /**
     * 获取用户详情
     * @param userId 用户ID
     * @return 用户详情
     */
    AdminUserVO getUserDetail(Long userId);

    /**
     * 更新用户状态
     * @param userId 用户ID
     * @param status 状态 active-正常 disabled-禁用
     * @return 是否成功
     */
    boolean updateUserStatus(Long userId, String status);

    /**
     * 删除用户(逻辑删除)
     * @param userId 用户ID
     * @return 是否成功
     */
    boolean deleteUser(Long userId);
}
