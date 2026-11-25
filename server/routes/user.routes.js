//用户信息、操作接口
import express from 'express';
import validateRegister from '../middlewares/validateRegisterNotnull.js';
import validateLoginNotnull from '../middlewares/validateLoginNotnull.js';
import validateUpdateInfo from '../middlewares/validateUpdateInfo.js';
import validateCaptcha from '../middlewares/validateCaptcha.js';
import { getCaptcha } from '../controllers/captcha.controller.js';
import {
    register,
    login,
    updateUserInfo,
    refresh,
    sendResetCode,
    verifyResetCode,
    resetPassword
} from '../controllers/user.controller.js';

const router = express.Router();

// 图形验证码下发（免鉴权，答案存在服务端）
router.get('/captcha', getCaptcha);

// 用户注册接口（格式校验通过后再校验图形验证码，避免白刷验证码）
router.post('/register', validateRegister, validateCaptcha, register);

// 用户登录接口（同上：先校验必填与邮箱格式，再校验图形验证码）
router.post('/login', validateLoginNotnull, validateCaptcha, login);

// 用户信息更新接口
router.post('/updateUserInfo', validateUpdateInfo, updateUserInfo);

// 刷新令牌接口（增强版）
router.post('/refresh', refresh);

// 发送重置密码验证码（发送邮件前先过图形验证码，防止被刷邮件）
router.post('/send-reset-code', validateCaptcha, sendResetCode);

// 校验重置密码验证码（仅校验真伪，不落库、不改密码）
router.post('/verify-reset-code', verifyResetCode);

// 重置密码
router.post('/reset-password', resetPassword);

export default router;
