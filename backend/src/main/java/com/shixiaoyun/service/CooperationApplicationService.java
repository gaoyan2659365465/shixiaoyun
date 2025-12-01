package com.shixiaoyun.service;

import com.shixiaoyun.dto.CooperationRegisterDTO;

/**
 * 业务合作申请Service
 */
public interface CooperationApplicationService {

    /**
     * 提交业务合作申请
     *
     * @param dto 申请信息
     * @return 是否成功
     */
    boolean submitApplication(CooperationRegisterDTO dto);
}
