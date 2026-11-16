//用户信息、操作接口
import express from 'express';
import validateRegister from '../middlewares/validateRegisterNotnull.js';
import validateLoginNotnull from '../middlewares/validateLoginNotnull.js';
import validateUpdateInfo from '../middlewares/validateUpdateInfo.js';
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

// 用户注册接口
router.post('/register', validateRegister, register);

// 用户登录接口
router.post('/login', validateLoginNotnull, login);

// 用户信息更新接口
router.post('/updateUserInfo', validateUpdateInfo, updateUserInfo);

// 刷新令牌接口（增强版）
router.post('/refresh', refresh);

// 发送重置密码验证码
router.post('/send-reset-code', sendResetCode);

// 校验重置密码验证码（仅校验真伪，不落库、不改密码）
router.post('/verify-reset-code', verifyResetCode);

// 重置密码
router.post('/reset-password', resetPassword);

export default router;
