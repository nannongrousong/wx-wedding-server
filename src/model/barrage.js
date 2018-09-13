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
    
    let { lastST = 0 } = params;
    let sqlParams = [lastST];
    let sql = 'select b.nick_name,b.portrait_url,a.barrage_id,a.user_id,a.text,to_seconds(a.send_time) * 1000 + microsecond(a.send_time) div 1000 as send_time from tbl_barrage_info a,tbl_user_info b where a.user_id = b.user_id and to_seconds(a.send_time) * 1000 + microsecond(a.send_time) div 1000 > ? ' + (lastST == 0 ? 'limit 4' : '');
    
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