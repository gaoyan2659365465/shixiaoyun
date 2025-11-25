"use strict";
const common_vendor = require("../../common/vendor.js");
const api_user = require("../../api/user.js");
const utils_validator = require("../../utils/validator.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      showPassword: false,
      showConfirmPassword: false,
      agreedToTerms: false,
      isLoading: false,
      emailCodeCountdown: 0,
      formData: {
        nickname: "",
        phone: "",
        email: "",
        emailCode: "",
        password: "",
        confirmPassword: ""
      },
      errors: {
        nickname: "",
        phone: "",
        email: "",
        emailCode: "",
        password: "",
        confirmPassword: ""
      }
    };
  },
  computed: {
    canSubmit() {
      return this.agreedToTerms && this.formData.nickname && this.formData.phone && this.formData.email && this.formData.emailCode && this.formData.password && this.formData.confirmPassword && !this.isLoading;
    }
  },
  methods: {
    // 清除单个错误
    clearError(field) {
      this.errors[field] = "";
    },
    // 清除所有错误
    clearAllErrors() {
      this.errors = {
        nickname: "",
        phone: "",
        email: "",
        emailCode: "",
        password: "",
        confirmPassword: ""
      };
    },
    // 表单验证
    validateForm() {
      this.clearAllErrors();
      let isValid = true;
      if (!this.formData.nickname) {
        this.errors.nickname = "请输入昵称";
        isValid = false;
      } else if (!utils_validator.validator.isNickname(this.formData.nickname)) {
        this.errors.nickname = "昵称长度为2-20个字符";
        isValid = false;
      }
      if (!this.formData.phone) {
        this.errors.phone = "请输入手机号";
        isValid = false;
      } else if (!utils_validator.validator.isPhone(this.formData.phone)) {
        this.errors.phone = "请输入正确的手机号";
        isValid = false;
      }
      if (!this.formData.email) {
        this.errors.email = "请输入邮箱";
        isValid = false;
      } else if (!utils_validator.validator.isEmail(this.formData.email)) {
        this.errors.email = "请输入正确的邮箱地址";
        isValid = false;
      }
      if (!this.formData.emailCode) {
        this.errors.emailCode = "请输入邮箱验证码";
        isValid = false;
      } else if (!utils_validator.validator.isCode(this.formData.emailCode)) {
        this.errors.emailCode = "请输入6位数字验证码";
        isValid = false;
      }
      if (!this.formData.password) {
        this.errors.password = "请输入密码";
        isValid = false;
      } else if (!utils_validator.validator.isPassword(this.formData.password)) {
        this.errors.password = "密码为6-20位,需包含字母和数字";
        isValid = false;
      }
      if (!this.formData.confirmPassword) {
        this.errors.confirmPassword = "请再次输入密码";
        isValid = false;
      } else if (this.formData.password !== this.formData.confirmPassword) {
        this.errors.confirmPassword = "两次输入的密码不一致";
        isValid = false;
      }
      return isValid;
    },
    // 发送邮箱验证码
    async sendEmailCode() {
      if (this.emailCodeCountdown > 0)
        return;
      if (!this.formData.email) {
        this.errors.email = "请输入邮箱";
        return;
      }
      if (!utils_validator.validator.isEmail(this.formData.email)) {
        this.errors.email = "请输入正确的邮箱地址";
        return;
      }
      try {
        await api_user.userApi.sendEmailCode(this.formData.email);
        common_vendor.index.showToast({
          title: "验证码已发送",
          icon: "success"
        });
        this.emailCodeCountdown = 60;
        const timer = setInterval(() => {
          this.emailCodeCountdown--;
          if (this.emailCodeCountdown <= 0) {
            clearInterval(timer);
          }
        }, 1e3);
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/register/register.vue:350", "发送验证码失败:", error);
      }
    },
    // 处理注册
    async handleRegister() {
      if (!this.canSubmit)
        return;
      if (!this.validateForm())
        return;
      this.isLoading = true;
      try {
        const res = await api_user.userApi.register({
          nickname: this.formData.nickname,
          phone: this.formData.phone,
          email: this.formData.email,
          emailCode: this.formData.emailCode,
          password: this.formData.password
        });
        common_vendor.index.showToast({
          title: "注册成功",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.redirectTo({
            url: "/pages/login/login"
          });
        }, 1500);
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/register/register.vue:384", "注册失败:", error);
      } finally {
        this.isLoading = false;
      }
    },
    // 协议勾选变化
    onAgreementChange(e) {
      this.agreedToTerms = e.detail.value.length > 0;
    },
    // 查看协议
    viewAgreement(type) {
      common_vendor.index.navigateTo({
        url: `/pages/agreement/agreement?type=${type}`
      });
    },
    // 去登录
    goToLogin() {
      common_vendor.index.navigateBack();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0$1,
    b: common_vendor.o([($event) => $data.formData.nickname = $event.detail.value, ($event) => $options.clearError("nickname")]),
    c: $data.formData.nickname,
    d: $data.formData.nickname
  }, $data.formData.nickname ? {
    e: common_assets._imports_1,
    f: common_vendor.o(($event) => $data.formData.nickname = "")
  } : {}, {
    g: $data.errors.nickname ? 1 : "",
    h: $data.errors.nickname
  }, $data.errors.nickname ? {
    i: common_assets._imports_2,
    j: common_vendor.t($data.errors.nickname)
  } : {}, {
    k: common_assets._imports_3,
    l: common_vendor.o([($event) => $data.formData.phone = $event.detail.value, ($event) => $options.clearError("phone")]),
    m: $data.formData.phone,
    n: $data.formData.phone
  }, $data.formData.phone ? {
    o: common_assets._imports_1,
    p: common_vendor.o(($event) => $data.formData.phone = "")
  } : {}, {
    q: $data.errors.phone ? 1 : "",
    r: $data.errors.phone
  }, $data.errors.phone ? {
    s: common_assets._imports_2,
    t: common_vendor.t($data.errors.phone)
  } : {}, {
    v: common_assets._imports_4,
    w: common_vendor.o([($event) => $data.formData.email = $event.detail.value, ($event) => $options.clearError("email")]),
    x: $data.formData.email,
    y: $data.formData.email
  }, $data.formData.email ? {
    z: common_assets._imports_1,
    A: common_vendor.o(($event) => $data.formData.email = "")
  } : {}, {
    B: $data.errors.email ? 1 : "",
    C: $data.errors.email
  }, $data.errors.email ? {
    D: common_assets._imports_2,
    E: common_vendor.t($data.errors.email)
  } : {}, {
    F: common_assets._imports_5,
    G: common_vendor.o([($event) => $data.formData.emailCode = $event.detail.value, ($event) => $options.clearError("emailCode")]),
    H: $data.formData.emailCode,
    I: common_vendor.t($data.emailCodeCountdown > 0 ? `${$data.emailCodeCountdown}s` : "获取验证码"),
    J: common_vendor.o((...args) => $options.sendEmailCode && $options.sendEmailCode(...args)),
    K: $data.emailCodeCountdown > 0 ? 1 : "",
    L: $data.errors.emailCode ? 1 : "",
    M: $data.errors.emailCode
  }, $data.errors.emailCode ? {
    N: common_assets._imports_2,
    O: common_vendor.t($data.errors.emailCode)
  } : {}, {
    P: common_assets._imports_6,
    Q: $data.showPassword ? "text" : "password",
    R: common_vendor.o([($event) => $data.formData.password = $event.detail.value, ($event) => $options.clearError("password")]),
    S: $data.formData.password,
    T: $data.showPassword ? "/static/icons/eye-open.png" : "/static/icons/eye-close.png",
    U: common_vendor.o(($event) => $data.showPassword = !$data.showPassword),
    V: $data.errors.password ? 1 : "",
    W: $data.errors.password
  }, $data.errors.password ? {
    X: common_assets._imports_2,
    Y: common_vendor.t($data.errors.password)
  } : {}, {
    Z: common_assets._imports_6,
    aa: $data.showConfirmPassword ? "text" : "password",
    ab: common_vendor.o([($event) => $data.formData.confirmPassword = $event.detail.value, ($event) => $options.clearError("confirmPassword")]),
    ac: $data.formData.confirmPassword,
    ad: $data.showConfirmPassword ? "/static/icons/eye-open.png" : "/static/icons/eye-close.png",
    ae: common_vendor.o(($event) => $data.showConfirmPassword = !$data.showConfirmPassword),
    af: $data.errors.confirmPassword ? 1 : "",
    ag: $data.errors.confirmPassword
  }, $data.errors.confirmPassword ? {
    ah: common_assets._imports_2,
    ai: common_vendor.t($data.errors.confirmPassword)
  } : {}, {
    aj: $data.agreedToTerms,
    ak: common_vendor.o(($event) => $options.viewAgreement("privacy")),
    al: common_vendor.o(($event) => $options.viewAgreement("service")),
    am: common_vendor.o((...args) => $options.onAgreementChange && $options.onAgreementChange(...args)),
    an: $data.isLoading
  }, $data.isLoading ? {} : {}, {
    ao: $data.isLoading ? 1 : "",
    ap: !$options.canSubmit ? 1 : "",
    aq: !$options.canSubmit,
    ar: common_vendor.o((...args) => $options.handleRegister && $options.handleRegister(...args)),
    as: common_vendor.o((...args) => $options.goToLogin && $options.goToLogin(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-bac4a35d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/register/register.js.map
