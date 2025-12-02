package com.shixiaoyun.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.shixiaoyun.common.BusinessException;
import com.shixiaoyun.dto.UserQueryDTO;
import com.shixiaoyun.entity.User;
import com.shixiaoyun.mapper.UserMapper;
import com.shixiaoyun.service.AdminUserService;
import com.shixiaoyun.vo.AdminUserVO;
import com.shixiaoyun.vo.PageVO;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 管理后台用户Service实现
 */
@Service
public class AdminUserServiceImpl implements AdminUserService {

    @Resource
    private UserMapper userMapper;

    @Override
    public PageVO<AdminUserVO> getUserList(UserQueryDTO queryDTO) {
        // 构建查询条件
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();

        // 关键词搜索(手机号或昵称)
        if (StringUtils.hasText(queryDTO.getKeyword())) {
            wrapper.and(w -> w.like(User::getPhone, queryDTO.getKeyword())
                    .or()
                    .like(User::getNickname, queryDTO.getKeyword()));
        }

        // 状态筛选
        if (StringUtils.hasText(queryDTO.getStatus())) {
            Integer status = "active".equals(queryDTO.getStatus()) ? 1 : 0;
            wrapper.eq(User::getStatus, status);
        }

        // 按创建时间倒序
        wrapper.orderByDesc(User::getCreateTime);

        // 分页查询
        Page<User> page = new Page<>(queryDTO.getPage(), queryDTO.getSize());
        IPage<User> userPage = userMapper.selectPage(page, wrapper);

        // 转换为VO
        List<AdminUserVO> voList = userPage.getRecords().stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());

        return new PageVO<>(voList, userPage.getTotal(), queryDTO.getPage(), queryDTO.getSize());
    }

    @Override
    public AdminUserVO getUserDetail(Long userId) {
        User user = userMapper.selectById(userId);
        if (user == null) {
            throw new BusinessException("用户不存在");
        }
        return convertToVO(user);
    }

    @Override
    public boolean updateUserStatus(Long userId, String status) {
        User user = userMapper.selectById(userId);
        if (user == null) {
            throw new BusinessException("用户不存在");
        }

        // 转换状态
        Integer statusValue = "active".equals(status) ? 1 : 0;

        User updateUser = new User();
        updateUser.setId(userId);
        updateUser.setStatus(statusValue);

        return userMapper.updateById(updateUser) > 0;
    }

    @Override
    public boolean deleteUser(Long userId) {
        User user = userMapper.selectById(userId);
        if (user == null) {
            throw new BusinessException("用户不存在");
        }

        // MyBatis-Plus的逻辑删除
        return userMapper.deleteById(userId) > 0;
    }

    /**
     * 转换为VO对象
     */
    private AdminUserVO convertToVO(User user) {
        AdminUserVO vo = new AdminUserVO();
        BeanUtils.copyProperties(user, vo);

        // 转换状态
        vo.setStatus(user.getStatus() == 1 ? "active" : "disabled");

        // 设置积分(暂时设为0，后续可以从积分表查询)
        vo.setPoints(0);

        return vo;
    }
}
