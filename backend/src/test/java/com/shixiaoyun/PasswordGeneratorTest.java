package com.shixiaoyun;

import com.shixiaoyun.utils.AESUtil;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * 密码生成测试类
 * 用于生成管理员初始密码
 */
@SpringBootTest
public class PasswordGeneratorTest {

    @Test
    public void generateAdminPassword() {
        // 生成管理员密码
        String plainPassword = "admin123";
        String encryptedPassword = AESUtil.encrypt(plainPassword);

        System.out.println("=================================");
        System.out.println("明文密码: " + plainPassword);
        System.out.println("加密后的密码: " + encryptedPassword);
        System.out.println("=================================");
        System.out.println("\n请将以下 SQL 复制到数据库中执行：\n");
        System.out.println("INSERT INTO `admin` (`username`, `password`, `real_name`, `status`, `role`)");
        System.out.println("VALUES ('admin', '" + encryptedPassword + "', '系统管理员', 'active', 'super_admin');");
        System.out.println("\n=================================");
    }
}
