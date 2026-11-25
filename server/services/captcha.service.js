// captcha.service.js 图形验证码服务：生成 SVG 图片、服务端存答案、一次性校验
import crypto from 'crypto';

// 字符集：去掉 0/O/1/I/l 等易混淆字符，降低正常用户输错概率
const CAPTCHA_CHARS = 'ABCDEFGHJKMNPQRSTUVWXY23456789';
// 验证码位数、有效期（秒）、单个验证码允许的最大错误次数
const CODE_LENGTH = 4;
const TTL_SECONDS = 120;
const MAX_FAIL = 5;
// 单次最多保留的验证码条数，超出时淘汰最早的一条，防止内存无限增长
const MAX_STORE_SIZE = 2000;

// captchaId -> { code, expireAt, fail }
const captchaStore = new Map();

// 生成 [min, max] 区间的随机整数（含边界）
const randomInt = (min, max) => crypto.randomInt(min, max + 1);

// 生成随机验证码文本
const createCode = () => {
    let code = '';
    for (let i = 0; i < CODE_LENGTH; i += 1) {
        code += CAPTCHA_CHARS[crypto.randomInt(CAPTCHA_CHARS.length)];
    }
    return code;
};

// 干扰色：中低亮度随机色，保证字符在浅色底上可辨认
const randomColor = () => `rgb(${randomInt(40, 150)},${randomInt(40, 150)},${randomInt(40, 150)})`;

// 单个字符节点：随机旋转与颜色，字符位置轻微抖动
const buildCharNode = (char, index) => {
    const x = 16 + index * 30;
    const y = 29 + randomInt(-3, 3);
    return `<text x="${x}" y="${y}" transform="rotate(${randomInt(-22, 22)} ${x} ${y})" ` +
        'font-family="Arial,Helvetica,sans-serif" font-size="28" font-weight="700" ' +
        `fill="${randomColor()}" text-anchor="middle">${char}</text>`;
};

// 干扰线：3 条随机直线，增加机器切分难度
const buildLineNodes = () => Array.from({ length: 3 }, () => {
    const x1 = randomInt(0, 60);
    const y1 = randomInt(0, 40);
    const x2 = randomInt(60, 120);
    const y2 = randomInt(0, 40);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ` +
        `stroke="${randomColor()}" stroke-width="1" />`;
}).join('');

// 噪点：24 个随机小圆点
const buildDotNodes = () => Array.from({ length: 24 }, () => {
    return `<circle cx="${randomInt(0, 120)}" cy="${randomInt(0, 40)}" r="1" fill="${randomColor()}" />`;
}).join('');

// 拼接完整 SVG 图形码
const buildSvg = (code) => {
    const chars = [...code].map(buildCharNode).join('');
    return '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40">' +
        '<rect width="120" height="40" fill="#f5f5f5" />' +
        `${buildLineNodes()}${buildDotNodes()}${chars}</svg>`;
};

// 转为 data URI，前端可直接作为 <img src> 使用
const toDataUri = (svg) => `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;

// 清理已过期的验证码，避免内存堆积
const purgeExpired = () => {
    const now = Date.now();
    captchaStore.forEach((record, id) => {
        if (record.expireAt <= now) captchaStore.delete(id);
    });
};

// 超出容量时淘汰最早插入的记录（Map 保持插入顺序）
const trimStore = () => {
    while (captchaStore.size > MAX_STORE_SIZE) {
        captchaStore.delete(captchaStore.keys().next().value);
    }
};

// 下发新验证码：答案只留在服务端，前端仅拿到 captchaId 与图片
export const createCaptcha = () => {
    purgeExpired();
    const code = createCode();
    const captchaId = crypto.randomUUID();
    captchaStore.set(captchaId, {
        code: code.toLowerCase(),
        expireAt: Date.now() + TTL_SECONDS * 1000,
        fail: 0
    });
    trimStore();
    return { captchaId, codeImage: toDataUri(buildSvg(code)), expiresIn: TTL_SECONDS };
};

// 校验并消费验证码：校验通过即失效，同一 captchaId 不允许复用
export const verifyCaptcha = (captchaId, captchaCode) => {
    const record = captchaStore.get(captchaId);
    if (!record) return { valid: false, reason: 'missing' };
    if (record.expireAt <= Date.now()) {
        captchaStore.delete(captchaId);
        return { valid: false, reason: 'expired' };
    }
    if (record.code === String(captchaCode).trim().toLowerCase()) {
        captchaStore.delete(captchaId);
        return { valid: true };
    }
    record.fail += 1;
    if (record.fail >= MAX_FAIL) captchaStore.delete(captchaId);
    return { valid: false, reason: 'mismatch' };
};
