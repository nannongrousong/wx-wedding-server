const express = require('express')
const router = express.Router();
const userM = require('../service/user')
const errorInfo = require('../common/errorInfo')
const utils = require('../common/utils')
const globalConfig = require('../config/global');

router.post('/wx', (req, res) => {
    let { code, nickName, portraitUrl, signPosition } = req.body;
    const { appID, appSecret } = globalConfig.wx;
    utils.httpsGet(`https://api.weixin.qq.com/sns/jscode2session?appid=${appID}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`, (isOK, data) => {
        if (isOK) {
            data = JSON.parse(data);
            const { session_key, expires_in, openid } = data;
            userM.login({
                userID: openid,
                nickName,
                portraitUrl,
                signPosition
            }, (code) => {
                res.json({
                    code,
                    data: code ? { token: utils.encryptData(openid) } : null,
                    info: code ? '' : errorInfo.DB_OPER_ERROR
                });
            });
        } else {
            res.json({ code: false, info: errorInfo.WX_API_ERROR });
        }
    });
});

module.exports = router;