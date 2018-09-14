const mysql = require('mysql')
const globalConfig = require('../config/global');
const mysqlConf = globalConfig.mysql

/**
 * 插入|更新用户信息
 * @param {Object} params 用户信息。{userID: '',nickName: '', portraitUrl: '', signPosition: ''}
 * @param {Function} callBack 回调函数。参数1：操作结果
 */
const login = (params, callBack) => {
    const connection = mysql.createConnection(mysqlConf);
    connection.connect();

    connection.beginTransaction(err => {
        if (err) {
            console.error(err);
            return callBack(false);
        }

        let sql1 = 'replace into tbl_user_info (user_id,nick_name,portrait_url) values(?,?,?)';

        let { userID, nickName, portraitUrl, signPosition } = params
        let sqlParams1 = [userID, nickName, portraitUrl]

        connection.query(sql1, sqlParams1, (err, res) => {
            if (err) {
                return connection.rollback(() => {
                    console.error(err)
                    callBack(false);
                })
            }

            let sql2 = 'replace into tbl_sign_info (user_id,sign_state,sign_position) values(?,?,?)'
            let sqlParams2 = [userID, 1, signPosition]
            connection.query(sql2, sqlParams2, (err, res) => {
                if (err) {
                    return connection.rollback(() => {
                        console.error(err)
                        callBack(false);
                    })
                }

                connection.commit((err) => {
                    if (err) {
                        return connection.rollback(() => {
                            console.error(err)
                            callBack(false);
                        })
                    }

                    callBack(true);
                    connection.end()
                })
            })
        })
    })
}

module.exports = {
    login
}