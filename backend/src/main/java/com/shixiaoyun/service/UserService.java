package com.shixiaoyun.service;

import com.shixiaoyun.dto.*;
import com.shixiaoyun.vo.LoginVO;

/**
 * 用户Service接口
 */
public interface UserService {

    /**
     * 用户注册
     * @param dto 注册信息
     * @return 是否成功
     */
    boolean register(UserRegisterDTO dto);

    /**
     * 密码登录
     * @param dto 登录信息
     * @return 登录结果
     */
    LoginVO loginByPassword(PasswordLoginDTO dto);

    /**
     * 验证码登录
     * @param dto 登录信息
     * @return 登录结果
     */
    LoginVO loginByCode(CodeLoginDTO dto);

    /**
     * 微信登录
     * @param dto 登录信息
     * @return 登录结果
     */
    LoginVO loginByWechat(WechatLoginDTO dto);

    /**
     * 发送邮箱验证码
     * @param email 邮箱
     * @return 是否成功
     */
    boolean sendEmailCode(String email);

    /**
     * 发送短信验证码
     * @param phone 手机号
     * @return 是否成功
     */
    boolean sendSmsCode(String phone);
}
