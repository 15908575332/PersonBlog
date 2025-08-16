// 请求体验证中间件
const validateRegister = (req, res, next) => {
    const { userName, userEmail, userPassword } = req.body;
    // 验证必填字段
    if (!userName || !userEmail || !userPassword) {
        return res.status(400).json({
            code: 'INVALID_REQUEST',
            message: '必填字段缺失: userName, userEmail, userPassword',
            missingFields: {
                userName: !userName,
                userEmail: !userEmail,
                userPassword: !userPassword
            }
        });
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
        return res.status(400).json({
            code: 'INVALID_EMAIL',
            message: '邮箱格式无效'
        });
    }

    next();
};
export default validateRegister;
