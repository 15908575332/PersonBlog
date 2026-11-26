// user.service.js 用户域数据服务层
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sqlQuery from "../utils/sqlQuery.js";
import { sendResetCodeEmail } from "../utils/email.js";
import { buildPasswordFingerprint } from "../utils/tokenFingerprint.js";

const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
const JWT_SECRET = process.env.JWT_SECRET;
// 验证码哈希密钥：优先独立配置，缺省回落到 JWT_SECRET（库被读但没有 .env 时仍无法还原验证码）
const RESET_CODE_SECRET = process.env.RESET_CODE_SECRET || JWT_SECRET;
const RESET_CODE_HASH_LENGTH = 64; // sha256 hex 长度
const RESET_CODE_TTL_MS = 5 * 60 * 1000;
// Token 有效期：必须使用 '2h' / '30m' / '7d' 这类时间表达式。
// 注意：jsonwebtoken 对纯数字的 expiresIn 按“秒”处理，写成 7200000 会变成约 83 天。
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "2h";
const JWT_SIGN_OPTIONS = { algorithm: "HS256", expiresIn: JWT_EXPIRES_IN };

// 注册：查重 + 密码哈希 + 插入
export const registerUser = async ({
  userId,
  userName,
  userEmail,
  userPassword,
  avatarUrl = "",
}) => {
  // 检查邮箱是否已注册
  const [existingUser] = await sqlQuery("SELECT 1 FROM users WHERE email = ?", [
    userEmail,
  ]);
  if (existingUser) {
    return { emailExists: true };
  }

  // 密码哈希
  const hashedPassword = await bcrypt.hash(userPassword, saltRounds);

  // 插入新用户
  await sqlQuery(
    "INSERT INTO users (user_id, username, email, password_hash, avatar_url, created_at, updated_at) VALUES (?,?, ?, ?, ?, NOW(), NOW())",
    [userId, userName, userEmail, hashedPassword, avatarUrl],
  );

  return { emailExists: false };
};

// 登录：查用户 + 校验密码 + 签发 Token
export const loginUser = async (loginEmail, loginPassword) => {
  // 查询用户信息
  const [user] = await sqlQuery("SELECT * FROM users WHERE email = ?", [
    loginEmail,
  ]);
  if (!user) return { notFound: true };

  // 验证密码
  const match = await bcrypt.compare(loginPassword, user.password_hash);
  if (!match) return { passwordWrong: true };

  // 生成Token（有效期见 JWT_EXPIRES_IN，默认 2 小时）
  // pv 为当前密码指纹：密码一旦重置，指纹变化，存量 Token 全部失效
  const token = jwt.sign(
    {
      userId: user.user_id,
      userEmail: user.email,
      pv: buildPasswordFingerprint(user.password_hash),
      iat: Math.floor(Date.now() / 1000), // 签发时间
      nbf: Math.floor(Date.now() / 1000), // 生效时间
    },
    JWT_SECRET,
    JWT_SIGN_OPTIONS,
  );

  return {
    token,
    user: {
      userId: user.user_id,
      username: user.username,
      email: user.email,
      avatarUrl: user.avatar_url,
      sex: user.sex,
      introduce: user.introduce,
      registerTime: user.created_at,
      vipLevel: user.vip_level,
    },
  };
};

// 更新用户信息：验签 + 邮箱冲突检查 + 更新 + 回查
export const updateUserInfo = async (token, body) => {
  // 验证JWT令牌（包含nbf和iat校验）
  const decoded = jwt.verify(token, JWT_SECRET, {
    algorithms: ["HS256"],
    clockTolerance: 5 * 60, // 时钟偏差容忍5分钟
  });
  const userId = decoded.userId;
  // 检查邮箱是否已被其他用户使用
  if (body.email) {
    const [existingEmail] = await sqlQuery(
      "SELECT user_id FROM users WHERE email = ? AND user_id != ?",
      [body.email, userId],
    );
    if (existingEmail) {
      return { emailTaken: true };
    }
  }

  // 构建更新字段
  const updateData = { updated_at: new Date() };
  if (body.username) updateData.username = body.username;
  if (body.email) updateData.email = body.email;
  if (body.sex) updateData.sex = body.sex;
  if (body.introduce !== undefined) updateData.introduce = body.introduce;

  // 执行更新
  await sqlQuery("UPDATE users SET ? WHERE user_id = ?", [updateData, userId]);

  // 返回更新后的用户信息
  const [updatedUser] = await sqlQuery(
    "SELECT user_id AS userId, username, email, avatar_url as avatarUrl, sex, introduce, " +
      "vip_level AS vipLevel, created_at AS registerTime " +
      "FROM users WHERE user_id = ?",
    [userId],
  );

  return { user: updatedUser };
};

// 刷新令牌（增强版）
export const refreshUserToken = async (token) => {
  // 验证令牌（强制忽略过期时间，以便区分“即将过期”和“已过期”）
  const decoded = jwt.verify(token, JWT_SECRET, { ignoreExpiration: true });

  // 检查令牌是否在有效期内窗口
  const currentTime = Math.floor(Date.now() / 1000);
  const remaining = decoded.exp - currentTime;

  // 已过期：不再续期，必须重新登录（否则过期 Token 可无限续命）
  if (remaining <= 0) {
    return { expired: true };
  }
  if (remaining > 60 * 5) {
    // 剩余有效期超过5分钟
    return { tooEarly: true };
  }
  // 生成新令牌（有效期见 JWT_EXPIRES_IN）
  // pv 必须沿用旧令牌的密码指纹，否则刷新后会被判定为失效令牌
  const newToken = jwt.sign(
    {
      userId: decoded.userId,
      userEmail: decoded.userEmail,
      pv: decoded.pv,
      iat: currentTime,
      nbf: currentTime,
    },
    JWT_SECRET,
    JWT_SIGN_OPTIONS,
  );
  // 有效期由实际签发的 Token 载荷反推，避免与配置不一致
  const newDecoded = jwt.decode(newToken);

  return {
    token: newToken,
    expiresInMs: (newDecoded.exp - newDecoded.iat) * 1000,
  };
};

/* ------------------------ 邮箱验证码 ------------------------ */
// 验证码哈希：库里不留明文，读库者无法据此重置任意账号密码
const hashResetCode = (code) =>
  crypto.createHmac("sha256", RESET_CODE_SECRET).update(String(code)).digest("hex");

// 恒定时间比较，避免用响应时间差逐位试探
const safeEqual = (a, b) => {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
};

// 兼容历史明文记录：长度不等于哈希长度时按明文比对（旧记录 5 分钟内自然过期）
const matchStoredCode = (storedCode, inputCode) => {
  if (!storedCode) return false;
  if (String(storedCode).length === RESET_CODE_HASH_LENGTH) {
    return safeEqual(storedCode, hashResetCode(inputCode));
  }
  return safeEqual(storedCode, inputCode);
};

// 取该账号最近一条验证码记录（不预先过滤 used/过期，用于区分失败原因）
const findLatestResetCode = async (account) => {
  const [record] = await sqlQuery(
    "SELECT id, code, used, (expires_at <= NOW()) AS isExpired FROM reset_codes WHERE account = ? ORDER BY id DESC LIMIT 1",
    [account],
  );
  return record || null;
};

// 状态枚举：NOT_SENT 未获取 / USED 已使用 / EXPIRED 已过期 / MISMATCH 验证码错误 / OK 正确
const inspectResetCode = async (account, code) => {
  const record = await findLatestResetCode(account);
  if (!record) return { status: "NOT_SENT" };
  if (Number(record.used) === 1) return { status: "USED" };
  if (Number(record.isExpired) === 1) return { status: "EXPIRED" };
  if (!matchStoredCode(record.code, code)) return { status: "MISMATCH" };
  return { status: "OK", id: record.id };
};

export const sendResetCode = async (account) => {
  // 查询用户是否存在
  const [user] = await sqlQuery("SELECT user_id FROM users WHERE email = ?", [
    account,
  ]);
  if (!user) {
    return { notFound: true };
  }

  // 使旧验证码失效
  await sqlQuery(
    "UPDATE reset_codes SET used = 1 WHERE account = ? AND used = 0",
    [account],
  );

  // 生成6位验证码，仅邮件里出现明文，库里只存哈希
  const code = crypto.randomInt(100000, 999999).toString();
  const expiresAt = new Date(Date.now() + RESET_CODE_TTL_MS);

  const insertResult = await sqlQuery(
    "INSERT INTO reset_codes (account, code, expires_at) VALUES (?, ?, ?)",
    [account, hashResetCode(code), expiresAt],
  );

  try {
    await sendResetCodeEmail(account, code);
  } catch (error) {
    // 发信失败必须同步作废本次验证码，避免库里留下一条用户从未收到的有效码
    await sqlQuery("UPDATE reset_codes SET used = 1 WHERE id = ?", [
      insertResult.insertId,
    ]);
    throw error;
  }

  return {
    notFound: false,
    expiresIn: Math.floor(RESET_CODE_TTL_MS / 1000),
  };
};

// 校验重置密码验证码（仅校验真伪，不落库、不改密码）
export const verifyResetCode = async (account, code) => {
  const { status } = await inspectResetCode(account, code);
  return { status };
};

// 重置密码：验码 + 标记已用 + 更新密码
export const resetPassword = async (account, code, newPassword) => {
  // 先区分失败原因：未获取 / 已使用 / 已过期 / 验证码错误
  const inspected = await inspectResetCode(account, code);
  if (inspected.status !== "OK") {
    return { status: inspected.status };
  }

  // 条件更新保证并发请求下同一验证码只能被消费一次
  const consumed = await sqlQuery(
    "UPDATE reset_codes SET used = 1 WHERE id = ? AND used = 0",
    [inspected.id],
  );
  if (!consumed || consumed.affectedRows === 0) {
    return { status: "USED" };
  }

  // 更新密码：password_hash 变化后，tokenFingerprint 派生值随之变化，存量 Token 自动失效
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  await sqlQuery(
    "UPDATE users SET password_hash = ?, updated_at = NOW() WHERE email = ?",
    [hashedPassword, account],
  );

  return { status: "OK" };
};
