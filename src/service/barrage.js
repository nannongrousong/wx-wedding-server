const mysql = require('mysql')
const mysqlConf = require('../config/global').mysql

//  插入弹幕信息
/**
 * 
 * @param {Object} params 弹幕信息。{userID: '', text: ''}
 * @param {Function} callBack 回调函数。param1:操作结果;param2:插入后的barrageID
 */
const insert = (params, callBack) => {
    const connection = mysql.createConnection(mysqlConf);
    connection.connect();

    let sql = 'insert into tbl_barrage_info(user_id,text) values(?,?)'
    let { userID, text } = params
    let sqlParams = [userID, text]

    connection.query(sql, sqlParams, (err, res) => {
        if (err) {
            console.error(err)
            return callBack(false);
        }

        if (res.affectedRows == 1) {
            return callBack(true, res.insertId);
        }

        callBack(false);
    })

    connection.end();
}

/**
 * 获取弹幕列表
 * @param {*} params 
 * @param {*} callBack 
 */
const list = (params, callBack) => {
    const connection = mysql.createConnection(mysqlConf);
    connection.connect();

    let { lastST = '' } = params;
    let sqlParams = [lastST];
    let sql = `select users.nick_name,users.portrait_url,barrage.user_id,barrage.text,barrage.barrage_id,unix_timestamp(barrage.send_time) as send_time `
        + `from tbl_barrage_info barrage, tbl_user_info users `
        + `where barrage.user_id = users.user_id and unix_timestamp(send_time) > ? `
        + `order by send_time asc ${lastST ? '' : 'limit 50'}`;

    connection.query(sql, sqlParams, (err, res) => {
        if (err) {
            console.error(err);
            return callBack(false);
        }

        callBack(true, res)
    })

    connection.end();
}

module.exports = {
    list,
    insert
}