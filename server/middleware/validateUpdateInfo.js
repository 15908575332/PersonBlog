// 更新数据验证中间件（单个错误返回）
const validateUpdateInfo = (req, res, next) => {
    const updateData = req.body;

    // 验证用户名长度
    if (updateData.username !== undefined && updateData.username.length < 2) {
        return res.status(400).json({
            code: 'INVALID_USERNAME',
            message: '用户名至少需要2个字符',
            validationError: {
                field: 'username',
                message: '用户名至少需要2个字符'
            }
        });
    }

    // 验证邮箱格式
    if (updateData.email !== undefined) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(updateData.email)) {
            return res.status(400).json({
                code: 'INVALID_EMAIL',
                message: '邮箱格式不正确',
                validationError: {
                    field: 'email',
                    message: '邮箱格式不正确'
                }
            });
        }
    }

    // 验证简介长度
    if (updateData.introduce !== undefined && updateData.introduce.length > 110) {
        return res.status(400).json({
            code: 'INVALID_INTRODUCE',
            message: '简介不能超过110个字符',
            validationError: {
                field: 'introduce',
                message: '简介不能超过110个字符'
            }
        });
    }

    next(); // 验证通过，继续后续流程
};
export default validateUpdateInfo;