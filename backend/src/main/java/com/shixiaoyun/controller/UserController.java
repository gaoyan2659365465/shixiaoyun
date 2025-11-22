package com.shixiaoyun.controller;

import com.shixiaoyun.common.Result;
import com.shixiaoyun.dto.*;
import com.shixiaoyun.service.UserService;
import com.shixiaoyun.vo.LoginVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

/**
 * 用户Controller
 */
@Slf4j
@Tag(name = "用户接口")
@RestController
@RequestMapping("/user")
@Validated
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 用户注册
     */
    @Operation(summary = "用户注册")
    @PostMapping("/register")
    public Result<Boolean> register(@RequestBody @Validated UserRegisterDTO dto) {
        log.info("用户注册: {}", dto.getPhone());
        boolean result = userService.register(dto);
        return Result.success("注册成功", result);
    }

    /**
     * 密码登录
     */
    @Operation(summary = "密码登录")
    @PostMapping("/login/password")
    public Result<LoginVO> loginByPassword(@RequestBody @Validated PasswordLoginDTO dto) {
        log.info("密码登录: {}", dto.getPhone());
        LoginVO loginVO = userService.loginByPassword(dto);
        return Result.success("登录成功", loginVO);
    }

    /**
     * 验证码登录
     */
    @Operation(summary = "验证码登录")
    @PostMapping("/login/code")
    public Result<LoginVO> loginByCode(@RequestBody @Validated CodeLoginDTO dto) {
        log.info("验证码登录: {}", dto.getPhone());
        LoginVO loginVO = userService.loginByCode(dto);
        return Result.success("登录成功", loginVO);
    }

    /**
     * 微信登录
     */
    @Operation(summary = "微信登录")
    @PostMapping("/login/wechat")
    public Result<LoginVO> loginByWechat(@RequestBody @Validated WechatLoginDTO dto) {
        log.info("微信登录");
        LoginVO loginVO = userService.loginByWechat(dto);
        return Result.success("登录成功", loginVO);
    }

    /**
     * 发送邮箱验证码
     */
    @Operation(summary = "发送邮箱验证码")
    @PostMapping("/code/email")
    public Result<Boolean> sendEmailCode(@RequestBody EmailCodeRequest request) {
        log.info("发送邮箱验证码: {}", request.getEmail());
        boolean result = userService.sendEmailCode(request.getEmail());
        return Result.success("验证码已发送", result);
    }

    /**
     * 发送短信验证码
     */
    @Operation(summary = "发送短信验证码")
    @PostMapping("/code/sms")
    public Result<Boolean> sendSmsCode(@RequestBody SmsCodeRequest request) {
        log.info("发送短信验证码: {}", request.getPhone());
        boolean result = userService.sendSmsCode(request.getPhone());
        return Result.success("验证码已发送", result);
    }

    /**
     * 邮箱验证码请求
     */
    @lombok.Data
    public static class EmailCodeRequest {
        @NotBlank(message = "邮箱不能为空")
        @Email(message = "邮箱格式不正确")
        private String email;
    }

    /**
     * 短信验证码请求
     */
    @lombok.Data
    public static class SmsCodeRequest {
        @NotBlank(message = "手机号不能为空")
        @Pattern(regexp = "^1[3-9]\\d{9}$", message = "手机号格式不正确")
        private String phone;
    }
}
