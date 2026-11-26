// tokenFingerprint.js Token 与密码的状态绑定：密码一变，存量 Token 立即失效
import crypto from 'crypto';

// 指纹只用于比对，不是机密：由 password_hash 派生，密码重置后必然变化
export const buildPasswordFingerprint = (passwordHash) => {
  return crypto
    .createHash('sha256')
    .update(String(passwordHash || ''))
    .digest('hex')
    .slice(0, 32);
};
