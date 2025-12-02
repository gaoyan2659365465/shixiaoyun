package com.shixiaoyun.service;

import com.shixiaoyun.dto.AdminLoginDTO;
import com.shixiaoyun.vo.AdminLoginVO;
import com.shixiaoyun.vo.AdminVO;

/**
 * 管理员服务接口
 */
public interface AdminService {

    /**
     * 管理员登录
     *
     * @param loginDTO 登录信息
     * @return 登录结果（包含 token 和管理员信息）
     */
    AdminLoginVO login(AdminLoginDTO loginDTO);

    /**
     * 根据 ID 获取管理员信息
     *
     * @param adminId 管理员ID
     * @return 管理员信息
     */
    AdminVO getAdminInfo(Long adminId);

    /**
     * 更新最后登录信息
     *
     * @param adminId 管理员ID
     * @param loginIp 登录IP
     */
    void updateLastLoginInfo(Long adminId, String loginIp);
}
