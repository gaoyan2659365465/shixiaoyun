package com.shixiaoyun.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.RandomUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.shixiaoyun.common.BusinessException;
import com.shixiaoyun.dto.*;
import com.shixiaoyun.entity.User;
import com.shixiaoyun.mapper.UserMapper;
import com.shixiaoyun.service.UserService;
import com.shixiaoyun.utils.AESUtil;
import com.shixiaoyun.utils.JwtUtil;
import com.shixiaoyun.vo.LoginVO;
import com.shixiaoyun.vo.UserInfoVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

/**
 * 用户Service实现类
 */
@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private StringRedisTemplate redisTemplate;

    private static final String EMAIL_CODE_PREFIX = "email:code:";
    private static final String SMS_CODE_PREFIX = "sms:code:";
    private static final long CODE_EXPIRE_TIME = 5; // 验证码有效期5分钟

    @Override
    public boolean register(UserRegisterDTO dto) {
        // 1. 验证邮箱验证码
        String cacheCode = redisTemplate.opsForValue().get(EMAIL_CODE_PREFIX + dto.getEmail());
        if (cacheCode == null || !cacheCode.equals(dto.getEmailCode())) {
            throw new BusinessException("验证码错误或已过期");
        }

        // 2. 检查手机号是否已注册
        LambdaQueryWrapper<User> phoneWrapper = new LambdaQueryWrapper<>();
        phoneWrapper.eq(User::getPhone, dto.getPhone());
        if (userMapper.selectCount(phoneWrapper) > 0) {
            throw new BusinessException("手机号已被注册");
        }

        // 3. 检查邮箱是否已注册
        LambdaQueryWrapper<User> emailWrapper = new LambdaQueryWrapper<>();
        emailWrapper.eq(User::getEmail, dto.getEmail());
        if (userMapper.selectCount(emailWrapper) > 0) {
            throw new BusinessException("邮箱已被注册");
        }

        // 4. 创建用户
        User user = new User();
        user.setNickname(dto.getNickname());
        user.setPhone(dto.getPhone());
        user.setEmail(dto.getEmail());
        user.setPassword(AESUtil.encrypt(dto.getPassword())); // AES加密密码
        user.setStatus(1);
        user.setIsOldCustomer(0);

        int result = userMapper.insert(user);

        // 5. 删除已使用的验证码
        redisTemplate.delete(EMAIL_CODE_PREFIX + dto.getEmail());

        return result > 0;
    }

    @Override
    public LoginVO loginByPassword(PasswordLoginDTO dto) {
        // 1. 查询用户
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(User::getPhone, dto.getPhone());
        User user = userMapper.selectOne(wrapper);

        if (user == null) {
            throw new BusinessException("用户不存在");
        }

        // 2. 验证密码
        String decryptedPassword = AESUtil.decrypt(user.getPassword());
        if (!decryptedPassword.equals(dto.getPassword())) {
            throw new BusinessException("密码错误");
        }

        // 3. 检查用户状态
        if (user.getStatus() == 0) {
            throw new BusinessException("账号已被禁用");
        }

        // 4. 生成Token
        String token = JwtUtil.generateToken(user.getId(), user.getPhone());

        // 5. 组装返回结果
        return buildLoginVO(token, user);
    }

    @Override
    public LoginVO loginByCode(CodeLoginDTO dto) {
        // 1. 验证短信验证码
        String cacheCode = redisTemplate.opsForValue().get(SMS_CODE_PREFIX + dto.getPhone());
        if (cacheCode == null || !cacheCode.equals(dto.getCode())) {
            throw new BusinessException("验证码错误或已过期");
        }

        // 2. 查询用户
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(User::getPhone, dto.getPhone());
        User user = userMapper.selectOne(wrapper);

        if (user == null) {
            throw new BusinessException("用户不存在,请先注册");
        }

        // 3. 检查用户状态
        if (user.getStatus() == 0) {
            throw new BusinessException("账号已被禁用");
        }

        // 4. 生成Token
        String token = JwtUtil.generateToken(user.getId(), user.getPhone());

        // 5. 删除已使用的验证码
        redisTemplate.delete(SMS_CODE_PREFIX + dto.getPhone());

        // 6. 组装返回结果
        return buildLoginVO(token, user);
    }

    @Override
    public LoginVO loginByWechat(WechatLoginDTO dto) {
        // TODO: 调用微信接口获取openId和unionId
        // 正式环境需要调用微信API: https://api.weixin.qq.com/sns/jscode2session
        // 参数: appid, secret, js_code=dto.getCode(), grant_type=authorization_code
        // 返回: openid, session_key, unionid

        // 开发环境模拟: 使用固定的测试openId,模拟同一个微信用户
        // 注意: 微信每次调用uni.login()会生成新的code,但同一个微信用户的openId是固定的
        String openId = "mock_openid_test_user_001";

        // 1. 根据openId查询用户
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(User::getOpenid, openId);
        User user = userMapper.selectOne(wrapper);

        // 2. 如果用户不存在,创建新用户
        if (user == null) {
            user = new User();
            user.setNickname("微信用户_" + RandomUtil.randomString(6));
            user.setOpenid(openId);
            user.setStatus(1);
            user.setIsOldCustomer(0);
            userMapper.insert(user);
        }

        // 3. 检查用户状态
        if (user.getStatus() == 0) {
            throw new BusinessException("账号已被禁用");
        }

        // 4. 生成Token
        String token = JwtUtil.generateToken(user.getId(), user.getPhone() != null ? user.getPhone() : "");

        // 5. 组装返回结果
        return buildLoginVO(token, user);
    }

    @Override
    public boolean sendEmailCode(String email) {
        // 生成6位数字验证码
        String code = RandomUtil.randomNumbers(6);

        // 存入Redis,有效期5分钟
        redisTemplate.opsForValue().set(
            EMAIL_CODE_PREFIX + email,
            code,
            CODE_EXPIRE_TIME,
            TimeUnit.MINUTES
        );

        // TODO: 调用邮件发送服务发送验证码
        // 这里暂时只记录日志
        log.info("邮箱验证码: {} -> {}", email, code);

        return true;
    }

    @Override
    public boolean sendSmsCode(String phone) {
        // 生成6位数字验证码
        String code = RandomUtil.randomNumbers(6);

        // 存入Redis,有效期5分钟
        redisTemplate.opsForValue().set(
            SMS_CODE_PREFIX + phone,
            code,
            CODE_EXPIRE_TIME,
            TimeUnit.MINUTES
        );

        // TODO: 调用短信发送服务发送验证码
        // 这里暂时只记录日志
        log.info("短信验证码: {} -> {}", phone, code);

        return true;
    }

    /**
     * 构建登录返回结果
     */
    private LoginVO buildLoginVO(String token, User user) {
        LoginVO loginVO = new LoginVO();
        loginVO.setToken(token);

        UserInfoVO userInfoVO = new UserInfoVO();
        BeanUtil.copyProperties(user, userInfoVO);
        loginVO.setUserInfo(userInfoVO);

        return loginVO;
    }
}
