// captcha.controller.js 图形验证码下发接口
import { createCaptcha } from '../services/captcha.service.js';

// 下发验证码：返回 captchaId 与图片，答案不下发
export const getCaptcha = (req, res) => {
    try {
        const { captchaId, codeImage, expiresIn } = createCaptcha();
        // 禁止浏览器缓存，避免复用旧验证码
        res.set('Cache-Control', 'no-store');
        res.status(200).json({ captchaId, codeImage, expiresIn });
    } catch (error) {
        console.error('生成验证码失败:', error);
        res.status(500).json({ message: '验证码生成失败，请稍后重试' });
    }
};
