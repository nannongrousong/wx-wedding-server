const mysql = require('mysql')
const mysqlConf = require('../config/global').mysql

/**
 * 获取配置信息
 * @param {Object} params 查询参数。{ key: '' }
 * @param {Function} callBack 回调函数。param1:操作结果;param2:签到状态
 */
const get = (params, callBack) => {
    const connection = mysql.createConnection(mysqlConf);
    connection.connect();

    let sql = 'select config_val from tbl_config where config_key = ?';
    let { key } = params;
    let sqlParams = [key];

    connection.query(sql, sqlParams, (err, res) => {
        if (err) {
            console.error(err)
            return callBack(false);
        }

        if (res.length > 0) {
            return callBack(true, res[0].config_val);
        }

        callBack(false)
    })

    connection.end()
}

module.exports = {
    get
}