const express = require('express')
const router = express.Router();
const barrageM = require('../service/barrage')
const errorInfo = require('../common/errorInfo')
const utils = require('../common/utils')

//  获取弹幕列表
router.get('/', (req, res) => {
    let { lastST } = req.query;
    barrageM.list({ lastST }, (code, barrageList) => {
        if (code) {
            res.json({ code: true, data: barrageList });
        } else {
            res.json({ code: false, info: errorInfo.DB_OPER_ERROR });
        }
    });
})

//  插入弹幕
router.post('/', (req, res) => {
    let { token, text } = req.body;
    let userID = utils.decryptData(token);

    if (!userID) {
        return res.json({ code: false, info: errorInfo.USER_INFO_LOST });
    }

    barrageM.insert({
        userID,
        text
    }, (code) => {
        return res.json({code, info: code ? '' : errorInfo.DB_OPER_ERROR});
    })
})

module.exports = router;