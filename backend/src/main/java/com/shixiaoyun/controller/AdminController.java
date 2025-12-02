package com.shixiaoyun.controller;

import com.shixiaoyun.common.Result;
import com.shixiaoyun.dto.AdminLoginDTO;
import com.shixiaoyun.dto.UserQueryDTO;
import com.shixiaoyun.dto.UserStatusDTO;
import com.shixiaoyun.service.AdminService;
import com.shixiaoyun.service.AdminUserService;
import com.shixiaoyun.utils.JwtUtil;
import com.shixiaoyun.vo.AdminLoginVO;
import com.shixiaoyun.vo.AdminUserVO;
import com.shixiaoyun.vo.AdminVO;
import com.shixiaoyun.vo.PageVO;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

/**
 * 管理员控制器
 */
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Resource
    private AdminService adminService;

    @Resource
    private AdminUserService adminUserService;

    /**
     * 管理员登录
     */
    @PostMapping("/login")
    public Result<AdminLoginVO> login(@Valid @RequestBody AdminLoginDTO loginDTO, HttpServletRequest request) {
        // 执行登录
        AdminLoginVO loginVO = adminService.login(loginDTO);

        // 更新最后登录信息
        String loginIp = getClientIp(request);
        adminService.updateLastLoginInfo(loginVO.getAdminInfo().getId(), loginIp);

        return Result.success(loginVO);
    }

    /**
     * 获取管理员信息
     */
    @GetMapping("/info")
    public Result<AdminVO> getInfo(HttpServletRequest request) {
        // 从请求头获取 token
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        // 从 token 中获取管理员 ID
        Long adminId = JwtUtil.getUserIdFromToken(token);
        if (adminId == null) {
            return Result.error(401, "未授权");
        }

        // 获取管理员信息
        AdminVO adminVO = adminService.getAdminInfo(adminId);
        return Result.success(adminVO);
    }

    /**
     * 管理员登出
     */
    @PostMapping("/logout")
    public Result<Void> logout() {
        // JWT 是无状态的，登出只需要前端删除 token 即可
        // 这里可以记录登出日志等操作
        return Result.success(null);
    }

    /**
     * 获取用户列表
     */
    @GetMapping("/users")
    public Result<PageVO<AdminUserVO>> getUserList(UserQueryDTO queryDTO) {
        PageVO<AdminUserVO> pageVO = adminUserService.getUserList(queryDTO);
        return Result.success(pageVO);
    }

    /**
     * 获取用户详情
     */
    @GetMapping("/users/{id}")
    public Result<AdminUserVO> getUserDetail(@PathVariable Long id) {
        AdminUserVO userVO = adminUserService.getUserDetail(id);
        return Result.success(userVO);
    }

    /**
     * 更新用户状态
     */
    @PutMapping("/users/{id}/status")
    public Result<Void> updateUserStatus(@PathVariable Long id, @Valid @RequestBody UserStatusDTO statusDTO) {
        boolean success = adminUserService.updateUserStatus(id, statusDTO.getStatus());
        return success ? Result.success(null) : Result.error("更新失败");
    }

    /**
     * 删除用户
     */
    @DeleteMapping("/users/{id}")
    public Result<Void> deleteUser(@PathVariable Long id) {
        boolean success = adminUserService.deleteUser(id);
        return success ? Result.success(null) : Result.error("删除失败");
    }

    /**
     * 获取客户端真实 IP
     */
    private String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        // 对于多级代理，取第一个非 unknown 的 IP
        if (ip != null && ip.contains(",")) {
            ip = ip.split(",")[0].trim();
        }
        return ip;
    }
}
