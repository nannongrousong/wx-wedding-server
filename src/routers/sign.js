const express = require('express')
const router = express.Router();
const signM = require('../model/sign')
const errorInfo = require('../common/errorInfo')
const globalConfig = require('../config/global');

//  获取所有有效签到
router.get('/all', (req, res) => {
    const { where } = globalConfig;
    signM.getSignRec({ where }, (code, records) => {
        res.json({ code: code, info: (!code ? errorInfo.DB_OPER_ERROR : ''), data: records })
    })
})

module.exports = router;