// server 全局常量（从中间件/路由中抽出的静态定义，值保持原样）

// 无需鉴权的公开接口白名单（登录/注册在无 token 阶段必须放行）
export const AUTH_WHITE_LIST = ['/userInfo', '', '/send-reset-code', '/reset-password', '/verify-reset-code', '/user/send-reset-code', '/user/reset-password', '/user/verify-reset-code', '/user/login', '/user/register', '/user/captcha'];
