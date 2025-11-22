package com.shixiaoyun;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 视消云小程序后端主启动类
 */
@SpringBootApplication
@MapperScan("com.shixiaoyun.mapper")
public class ShixiaoyunApplication {

    public static void main(String[] args) {
        SpringApplication.run(ShixiaoyunApplication.class, args);
        System.out.println("========================================");
        System.out.println("视消云小程序后端启动成功");
        System.out.println("API文档地址: http://localhost:8080/api/swagger-ui.html");
        System.out.println("========================================");
    }
}
