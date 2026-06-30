import nodemailer from 'nodemailer';
import { config } from 'dotenv';
config({ path: './.env' });

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn('[Email] SMTP 未配置，邮件将仅输出到控制台');
    return null;
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT) || 465,
    secure: parseInt(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  return transporter;
}

/**
 * 发送验证码邮件
 * @param {string} to 收件人邮箱
 * @param {string} code 验证码
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function sendResetCodeEmail(to, code) {
  const mailOptions = {
    from: process.env.SMTP_USER || 'noreply@blog.com',
    to,
    subject: '重置密码验证码',
    html: `
      <div style="max-width:480px;margin:0 auto;padding:32px;font-family:Arial,sans-serif;color:#333;">
        <h2 style="color:#f24056;">重置密码</h2>
        <p>您正在申请重置密码，验证码如下：</p>
        <div style="background:#f5f5f5;padding:20px;text-align:center;font-size:28px;font-weight:bold;letter-spacing:6px;border-radius:8px;margin:16px 0;">
          ${code}
        </div>
        <p style="color:#999;font-size:13px;">验证码 5 分钟内有效，请勿泄露给他人。</p>
      </div>
    `,
  };

  const t = getTransporter();
  if (!t) {
    console.log(`\n[Email] ===== 验证码邮件（模拟）=====`);
    console.log(`  收件人: ${to}`);
    console.log(`  验证码: ${code}`);
    console.log(`===================================\n`);
    return { success: true, message: '验证码已生成（SMTP未配置，请查看控制台）' };
  }

  try {
    await t.sendMail(mailOptions);
    console.log(`[Email] 验证码已发送至 ${to}`);
    return { success: true, message: '验证码已发送' };
  } catch (error) {
    console.error('[Email] 发送失败:', error.message);
    throw new Error('邮件发送失败，请稍后重试');
  }
}
