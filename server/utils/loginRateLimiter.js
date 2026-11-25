// loginRateLimiter.js 登录失败频控：按 IP + 邮箱统计失败次数，超限后短时间拒绝
const MAX_FAIL = 5;
const WINDOW_MS = 15 * 60 * 1000;

// key -> { fail, expireAt }
const records = new Map();

// 生成频控 key，邮箱不区分大小写
export const buildLoginKey = (req, email) => {
    const ip = req.ip || req.socket?.remoteAddress || 'unknown';
    return `${ip}|${String(email).toLowerCase()}`;
};

// 查询是否处于锁定期
export const checkLoginLock = (key) => {
    const record = records.get(key);
    if (!record) return { locked: false };
    if (record.expireAt <= Date.now()) {
        records.delete(key);
        return { locked: false };
    }
    if (record.fail < MAX_FAIL) return { locked: false };
    return { locked: true, retryAfter: Math.ceil((record.expireAt - Date.now()) / 1000) };
};

// 记录一次登录失败
export const recordLoginFail = (key) => {
    const now = Date.now();
    const record = records.get(key);
    if (!record || record.expireAt <= now) {
        records.set(key, { fail: 1, expireAt: now + WINDOW_MS });
        return;
    }
    record.fail += 1;
};

// 登录成功后清除该 key 的失败记录
export const clearLoginFail = (key) => records.delete(key);
