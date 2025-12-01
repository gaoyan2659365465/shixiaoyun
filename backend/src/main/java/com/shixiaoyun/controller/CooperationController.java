package com.shixiaoyun.controller;

import com.shixiaoyun.common.Result;
import com.shixiaoyun.dto.CooperationRegisterDTO;
import com.shixiaoyun.service.CooperationApplicationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

/**
 * 业务合作Controller
 */
@Slf4j
@Tag(name = "业务合作接口")
@RestController
@RequestMapping("/cooperation")
@Validated
public class CooperationController {

    @Autowired
    private CooperationApplicationService cooperationApplicationService;

    /**
     * 提交业务合作申请
     */
    @Operation(summary = "提交业务合作申请")
    @PostMapping("/register")
    public Result<Boolean> register(@RequestBody @Validated CooperationRegisterDTO dto) {
        log.info("业务合作申请: {}, {}", dto.getName(), dto.getCompanyName());
        boolean result = cooperationApplicationService.submitApplication(dto);
        return Result.success("提交成功", result);
    }
}
