package com.shixiaoyun.service.impl;

import com.shixiaoyun.dto.CooperationRegisterDTO;
import com.shixiaoyun.entity.CooperationApplication;
import com.shixiaoyun.mapper.CooperationApplicationMapper;
import com.shixiaoyun.service.CooperationApplicationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 业务合作申请Service实现
 */
@Slf4j
@Service
public class CooperationApplicationServiceImpl implements CooperationApplicationService {

    @Autowired
    private CooperationApplicationMapper cooperationApplicationMapper;

    @Override
    public boolean submitApplication(CooperationRegisterDTO dto) {
        log.info("提交业务合作申请: {}", dto.getName());

        CooperationApplication application = new CooperationApplication();
        BeanUtils.copyProperties(dto, application);

        // 设置初始状态为待审核
        application.setStatus(0);

        int result = cooperationApplicationMapper.insert(application);
        return result > 0;
    }
}
