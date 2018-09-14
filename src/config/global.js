module.exports = {
    wx: {
        appID: '',
        appSecret: ''
    },
    serverPort: 81,
    mysql: {
        host: '',
        user: '',
        password: '',
        port: '',
        database: ''
    },
    debugMode: true,
    //  每位用户每天最大抽奖次数限制
    localLotteryMax: 100,
    //  签到的标记位，适应不同配置
    where: 'jianhu'
}