
// 获取用户信息接口
const getUserInfo = async (req, res) => {
    const { userName, userEmail } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ? AND email = ?';
    pool.query(sql, [userName, userEmail], (err, result) => {
        if (err) {
            console.log(err);
            res.json({ code: '1', msg: '获取用户信息失败' });
        } else {
            res.json({ code: '0', msg: '获取用户信息成功', data: result[0] });
        }
    });
};
router.post('/getUserInfo', getUserInfo);
export default router;
