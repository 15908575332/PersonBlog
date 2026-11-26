import jwt from 'jsonwebtoken'
import { AUTH_WHITE_LIST } from '../config/constants.js'
import sqlQuery from '../utils/sqlQuery.js'
import { buildPasswordFingerprint } from '../utils/tokenFingerprint.js'

const authenticateToken = async (req, res, next) => {
    // 白名单处理（无需鉴权的公开接口；登录/注册在无 token 阶段必须放行）
    if (AUTH_WHITE_LIST.includes(req.path)) return next();

    // Token格式校验
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({
            code: 401,
            msg: '未提供有效Token',
            error: 'MISSING_AUTH_HEADER'
        });
    }
    const token = authHeader.split(' ')[1]?.trim();

    try {
        // 增强验证配置
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ['HS256'],  // 强制指定算法
            clockTolerance: 5 * 60  // 时钟偏差容忍（秒）
        });

        // 防止JWT篡改攻击
        if (!decoded.userId || !decoded.userEmail) {
            throw new Error('无效的Token结构');
        }

        // 密码指纹校验：重置密码后 pv 与库中最新密码不一致，存量 Token 立即失效
        // 旧版本签发、载荷里没有 pv 的 Token 一律视为失效，强制重新登录
        const [currentUser] = await sqlQuery(
            'SELECT password_hash FROM users WHERE user_id = ?',
            [decoded.userId],
        );
        if (
            !currentUser ||
            !decoded.pv ||
            decoded.pv !== buildPasswordFingerprint(currentUser.password_hash)
        ) {
            return res.status(401).json({
                code: 401,
                msg: '会话已失效，请重新登录',
                error: 'TOKEN_REVOKED'
            });
        }

        // 挂载用户信息（可扩展角色权限）
        req.user = {
            user_id: decoded.userId,
            userEmail: decoded.userEmail,
            role: decoded.role || 'guest'
        };
        next();
    } catch (error) {
        console.error('[JWT验证失败]', error);

        let status = 401;
        let message = '认证失败';

        switch (error.name) {
            case 'TokenExpiredError':
                message = 'Token已过期';
                break;
            case 'JsonWebTokenError':
                message = '无效Token';
                break;
            case 'NotBeforeError':
                message = 'Token尚未生效';
                break;
            default:
                message = '系统错误';
        }

        res.status(status).json({
            code: status,
            msg: message,
            error: error.name
        });
    }
};

export default authenticateToken;
