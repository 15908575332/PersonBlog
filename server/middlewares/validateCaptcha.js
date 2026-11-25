// 图形验证码校验中间件：从请求体读取 captchaId / captchaCode，由服务端判定
import { verifyCaptcha } from '../services/captcha.service.js';

// 失败原因对应的提示文案
const REASON_TEXT = {
    missing: '验证码已失效，请点击图片换一张后重试',
    expired: '验证码已过期，请重新获取',
    mismatch: '验证码错误，请重新输入'
};

const validateCaptcha = (req, res, next) => {
    const captchaId = req.body?.captchaId;
    const captchaCode = req.body?.captchaCode;

    if (!captchaId || !captchaCode) {
        return res.status(400).json({
            code: 'CAPTCHA_REQUIRED',
            message: '请先完成图形验证码'
        });
    }

    const result = verifyCaptcha(captchaId, captchaCode);
    if (!result.valid) {
        return res.status(400).json({
            code: 'CAPTCHA_INVALID',
            message: REASON_TEXT[result.reason] || '验证码校验失败'
        });
    }

    next();
};

export default validateCaptcha;
