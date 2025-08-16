// 请求体验证中间件
const validateLoginNotnull = (req, res, next) => {
    const { loginEmail, loginPassword } = req.body;
    // 验证必填字段
    if (!loginEmail || !loginPassword) {
        return res.status(400).json({
            code: 'INVALID_REQUEST',
            message: '必填字段缺失:userEmail, userPassword',
            missingFields: {
                loginEmail: !loginEmail,
                loginPassword: !loginPassword
            }
        });
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginEmail)) {
        return res.status(400).json({
            code: 'INVALID_EMAIL',
            message: '邮箱格式无效'
        });
    }

    next();
};
export default validateLoginNotnull;
