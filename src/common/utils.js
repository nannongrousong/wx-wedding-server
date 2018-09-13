const https = require('https');
const crypto = require('crypto');



/**
 * https的get请求
 * @param {String} url 请求地址
 * @param {Function} callBack 回调函数。param1:操作结果,param2:返回的数据
 */
const httpsGet = (url, callBack) => {
    https.get(url, (req, res) => {
        let data = '';
        req.on('data', (d) => {
            data += d;
        });
        req.on('end', () => {
            callBack(true, data);
        })
    }).on("error", (err) => {
        console.error(`https请求失败，地址${url}。错误信息\r\n`);
        console.error(err);
        callBack(false)
    });
}

/**
 * 获取时间格式字符串。返回YYYY-MM-DD
 * @param {Date} date 时间
 */
const getYYYYMMDD = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day)
}

/**
 * 微信登录解密，获取uuid等信息
 * @param {*} appID 
 * @param {*} sessionKey 
 * @param {*} encryptedData 
 * @param {*} iv 
 */
const wxDecryptData = (appID, sessionKey, encryptedData, iv) => {
    sessionKey = new Buffer(sessionKey, 'base64')
    encryptedData = new Buffer(encryptedData, 'base64')
    iv = new Buffer(iv, 'base64')

    try {
        let decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
        // 设置自动 padding 为 true，删除填充补位
        decipher.setAutoPadding(true)
        let decoded = decipher.update(encryptedData, 'binary', 'utf8')
        decoded += decipher.final('utf8')

        decoded = JSON.parse(decoded)

    } catch (err) {
        throw new Error('Illegal Buffer')
    }

    if (decoded.watermark.appid !== appID) {
        throw new Error('Illegal Buffer')
    }

    return decoded
}

const aesEncrypt = (data, key) => {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

const aesDecrypt = (encrypted, key) => {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

const encryptData = (data) => (aesEncrypt(data, 'helloworld'));

const decryptData = (data) => (aesDecrypt(data, 'helloworld'));

module.exports = {
    httpsGet,
    getYYYYMMDD,
    wxDecryptData,
    encryptData,
    decryptData
}