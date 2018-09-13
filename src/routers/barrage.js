const express = require('express')
const router = express.Router();
const barrageM = require('../model/barrage')
const errorInfo = require('../common/errorInfo')

//  获取弹幕列表
router.get('/', (req, res) => {
    let { lastST } = req.query;
    barrageM.list({ lastST: lastST * 1 }, (code, barrageList) => {
        if (code) {
            res.json({ code: true, data: barrageList });
        } else {
            res.json({ code: false, info: errorInfo.DB_OPER_ERROR });
        }
    });
})

module.exports = router;