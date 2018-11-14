const mysql = require('mysql')
const mysqlConf = require('../config/global').mysql

/**
 * 获取所有有效签到
 * @param {Object} params 查询参数。{ where: '' }
 * @param {Function} callBack 回调函数。param1:操作结果;param2:签到状态
 */
const getSignRec = (params, callBack) => {
    const connection = mysql.createConnection(mysqlConf);
    connection.connect();

    let sql = 'select users.nick_name,users.portrait_url,users.user_id from tbl_user_info users, tbl_sign_info signs where users.user_id = signs.user_id and signs.sign_position = ? and signs.sign_state = 1';
    let { where } = params;
    let sqlParams = [where];

    connection.query(sql, sqlParams, (err, res) => {
        if (err) {
            console.error(err)
            return callBack(false);
        }

        if (res.length > 0) {
            return callBack(true, res);
        }

        callBack(false)
    })

    connection.end()
}

module.exports = {
    getSignRec
}