const express = require('express')
const router = express.Router();
const configM = require('../service/config')
const errorInfo = require('../common/errorInfo')

//  获取所有有效签到
router.get('/', (req, res) => {
    const { key } = req.query;
    configM.get({ key }, (code, record) => {
        res.json({ code: code, info: (!code ? errorInfo.DB_OPER_ERROR : ''), data: record })
    })
})

module.exports = router;