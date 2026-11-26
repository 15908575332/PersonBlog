// resetCodeLimiter.js 重置密码验证码频控
// 两类限制：
//   1. 发码：同一 IP+邮箱 冷却 60 秒；同一邮箱每天最多 10 封；同一 IP 每小时最多 20 封（防邮件轰炸）
//   2. 校验：同一 IP+邮箱 15 分钟内错 5 次即锁定（防 6 位码被暴力枚举）
// 与 loginRateLimiter / captcha.service 一致，使用进程内存计数：单实例部署有效，
// 若改多实例（PM2 cluster / 多机）须换成 Redis 等共享存储。
const SEND_COOLDOWN_MS = 60 * 1000;
const SEND_ACCOUNT_DAILY_MAX = 10;
const SEND_IP_HOURLY_MAX = 20;
const VERIFY_MAX_FAIL = 5;
const VERIFY_WINDOW_MS = 15 * 60 * 1000;
const SWEEP_INTERVAL_MS = 60 * 1000;
const MAX_RECORDS = 5000;

// key -> { at } / { count, day } / { count, hour } / { fail, expireAt }
const lastSendMap = new Map();
const accountDailyMap = new Map();
const ipHourlyMap = new Map();
const verifyFailMap = new Map();

const dayKey = (ts = Date.now()) => new Date(ts).toISOString().slice(0, 10);
const hourKey = (ts = Date.now()) => new Date(ts).toISOString().slice(0, 13);

// 客户端 IP：优先取反向代理头，兜底 socket 地址
export const getClientIp = (req) => {
    const forwarded = String(req.headers?.['x-forwarded-for'] || '').split(',')[0].trim();
    return forwarded || req.ip || req.socket?.remoteAddress || 'unknown';
};

// 邮箱统一小写，避免大小写绕过频率限制
export const normalizeAccount = (account) => String(account || '').trim().toLowerCase();

// IP + 邮箱 复合 key（发码与校验共用）
export const buildResetKey = (req, account) => `${getClientIp(req)}|${normalizeAccount(account)}`;

// 检查是否可以发码（只读，不占用配额）
export const checkSendAllowed = (req, account) => {
    const now = Date.now();
    const key = buildResetKey(req, account);
    const acc = normalizeAccount(account);

    const last = lastSendMap.get(key);
    if (last && now - last.at < SEND_COOLDOWN_MS) {
        return { allowed: false, retryAfter: Math.ceil((SEND_COOLDOWN_MS - (now - last.at)) / 1000) };
    }

    const daily = accountDailyMap.get(acc);
    if (daily && daily.day === dayKey(now) && daily.count >= SEND_ACCOUNT_DAILY_MAX) {
        return { allowed: false, retryAfter: null, dailyLimited: true };
    }

    const hourly = ipHourlyMap.get(getClientIp(req));
    if (hourly && hourly.hour === hourKey(now) && hourly.count >= SEND_IP_HOURLY_MAX) {
        return { allowed: false, retryAfter: null, ipLimited: true };
    }

    return { allowed: true };
};

// 占用一次发码配额（发送前调用，失败时用 releaseSend 回滚）
export const recordSend = (req, account) => {
    const now = Date.now();
    const key = buildResetKey(req, account);
    const acc = normalizeAccount(account);
    const ip = getClientIp(req);

    lastSendMap.set(key, { at: now });

    const daily = accountDailyMap.get(acc);
    if (daily && daily.day === dayKey(now)) daily.count += 1;
    else accountDailyMap.set(acc, { count: 1, day: dayKey(now) });

    const hourly = ipHourlyMap.get(ip);
    if (hourly && hourly.hour === hourKey(now)) hourly.count += 1;
    else ipHourlyMap.set(ip, { count: 1, hour: hourKey(now) });

    sweepIfNeeded();
};

// 发送失败时回滚配额，避免用户被一次失败请求锁住 60 秒
export const releaseSend = (req, account) => {
    const key = buildResetKey(req, account);
    const acc = normalizeAccount(account);
    const ip = getClientIp(req);

    lastSendMap.delete(key);

    const daily = accountDailyMap.get(acc);
    if (daily && daily.count > 0) {
        daily.count -= 1;
        if (daily.count === 0) accountDailyMap.delete(acc);
    }

    const hourly = ipHourlyMap.get(ip);
    if (hourly && hourly.count > 0) {
        hourly.count -= 1;
        if (hourly.count === 0) ipHourlyMap.delete(ip);
    }
};

// 校验是否已因连续错误被锁定
export const checkVerifyLock = (req, account) => {
    const key = buildResetKey(req, account);
    const record = verifyFailMap.get(key);
    if (!record) return { locked: false };
    if (record.expireAt <= Date.now()) {
        verifyFailMap.delete(key);
        return { locked: false };
    }
    if (record.fail < VERIFY_MAX_FAIL) return { locked: false };
    return { locked: true, retryAfter: Math.ceil((record.expireAt - Date.now()) / 1000) };
};

// 记录一次验证码错误
export const recordVerifyFail = (req, account) => {
    const key = buildResetKey(req, account);
    const now = Date.now();
    const record = verifyFailMap.get(key);
    if (!record || record.expireAt <= now) {
        verifyFailMap.set(key, { fail: 1, expireAt: now + VERIFY_WINDOW_MS });
        return;
    }
    record.fail += 1;
    sweepIfNeeded();
};

// 校验通过或密码重置成功后清零
export const clearVerifyFail = (req, account) => {
    verifyFailMap.delete(buildResetKey(req, account));
};

export const VERIFY_LOCK_MAX = VERIFY_MAX_FAIL;

// 内存自清理：删除已过期的计数，并限制条目上限，防止长期运行内存增长
const sweep = () => {
    const now = Date.now();
    for (const [key, record] of verifyFailMap) {
        if (record.expireAt <= now) verifyFailMap.delete(key);
    }
    for (const [key, record] of lastSendMap) {
        if (now - record.at >= SEND_COOLDOWN_MS) lastSendMap.delete(key);
    }
    const today = dayKey(now);
    for (const [key, record] of accountDailyMap) {
        if (record.day !== today) accountDailyMap.delete(key);
    }
    const currentHour = hourKey(now);
    for (const [key, record] of ipHourlyMap) {
        if (record.hour !== currentHour) ipHourlyMap.delete(key);
    }
};

const sweepIfNeeded = () => {
    const total = lastSendMap.size + accountDailyMap.size + ipHourlyMap.size + verifyFailMap.size;
    if (total > MAX_RECORDS) sweep();
};

const timer = setInterval(sweep, SWEEP_INTERVAL_MS);
if (typeof timer.unref === 'function') timer.unref();
