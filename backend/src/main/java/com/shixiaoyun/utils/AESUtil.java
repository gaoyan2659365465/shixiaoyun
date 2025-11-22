package com.shixiaoyun.utils;

import cn.hutool.crypto.SecureUtil;
import cn.hutool.crypto.symmetric.AES;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.nio.charset.StandardCharsets;

/**
 * AES加密解密工具类
 * 用于可逆密码加密存储
 */
@Component
public class AESUtil {

    @Value("${aes.secret-key}")
    private String secretKeyConfig;

    private static AES aes;

    @PostConstruct
    public void init() {
        // 使用配置的密钥初始化AES
        byte[] key = SecureUtil.generateKey(secretKeyConfig).getEncoded();
        aes = SecureUtil.aes(key);
    }

    /**
     * 加密
     * @param content 明文
     * @return 密文(Base64编码)
     */
    public static String encrypt(String content) {
        if (content == null) {
            return null;
        }
        return aes.encryptBase64(content, StandardCharsets.UTF_8);
    }

    /**
     * 解密
     * @param encryptedContent 密文(Base64编码)
     * @return 明文
     */
    public static String decrypt(String encryptedContent) {
        if (encryptedContent == null) {
            return null;
        }
        return aes.decryptStr(encryptedContent, StandardCharsets.UTF_8);
    }
}
