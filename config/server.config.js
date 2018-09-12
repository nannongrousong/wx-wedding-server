let ServerConfig = {
    //  服务器启动端口
    serverPort: 3000,
    //  数据库配置
    mysql: {
        host: '',
        user: '',
        password: '',
        port: '',
        database: ''
    },
    //  是否启用调试模式，开发模式true，生产模式建议false
    debugMode: true,
    //  每位用户每天最大抽奖次数限制
    localLotteryMax: 100
}

module.exports = ServerConfig