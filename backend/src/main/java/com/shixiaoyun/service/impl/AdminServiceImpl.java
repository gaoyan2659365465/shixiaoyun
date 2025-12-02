package com.shixiaoyun.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.shixiaoyun.common.BusinessException;
import com.shixiaoyun.dto.AdminLoginDTO;
import com.shixiaoyun.entity.Admin;
import com.shixiaoyun.mapper.AdminMapper;
import com.shixiaoyun.service.AdminService;
import com.shixiaoyun.utils.AESUtil;
import com.shixiaoyun.utils.JwtUtil;
import com.shixiaoyun.vo.AdminLoginVO;
import com.shixiaoyun.vo.AdminVO;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;

/**
 * 管理员服务实现类
 */
@Service
public class AdminServiceImpl implements AdminService {

    @Resource
    private AdminMapper adminMapper;

    @Override
    public AdminLoginVO login(AdminLoginDTO loginDTO) {
        // 根据用户名查询管理员
        LambdaQueryWrapper<Admin> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Admin::getUsername, loginDTO.getUsername());
        Admin admin = adminMapper.selectOne(queryWrapper);

        if (admin == null) {
            throw new BusinessException("用户名或密码错误");
        }

        // 验证密码
        String decryptedPassword = AESUtil.decrypt(admin.getPassword());
        if (!loginDTO.getPassword().equals(decryptedPassword)) {
            throw new BusinessException("用户名或密码错误");
        }

        // 检查账号状态
        if ("disabled".equals(admin.getStatus())) {
            throw new BusinessException("账号已被禁用");
        }

        // 生成 JWT Token（使用用户名作为标识）
        String token = JwtUtil.generateToken(admin.getId(), admin.getUsername());

        // 构建返回结果
        AdminLoginVO loginVO = new AdminLoginVO();
        loginVO.setToken(token);

        AdminVO adminVO = new AdminVO();
        BeanUtils.copyProperties(admin, adminVO);
        loginVO.setAdminInfo(adminVO);

        return loginVO;
    }

    @Override
    public AdminVO getAdminInfo(Long adminId) {
        Admin admin = adminMapper.selectById(adminId);
        if (admin == null) {
            throw new BusinessException("管理员不存在");
        }

        AdminVO adminVO = new AdminVO();
        BeanUtils.copyProperties(admin, adminVO);
        return adminVO;
    }

    @Override
    public void updateLastLoginInfo(Long adminId, String loginIp) {
        Admin admin = new Admin();
        admin.setId(adminId);
        admin.setLastLoginTime(LocalDateTime.now());
        admin.setLastLoginIp(loginIp);
        adminMapper.updateById(admin);
    }
}
