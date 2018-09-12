const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);
const serverConfig = require('../config/server.config')
const indexRouter = require('./routers/index')
const awardRouter = require('./routers/award')
const signRouter = require('./routers/sign')
const log4js = require('./common/log4js')

server.listen(serverConfig.serverPort, () => {
    console.log(`正在监听${serverConfig.serverPort}端口`);
});

log4js.init(app);

app.use('/', indexRouter)
app.use('/sign', signRouter)
app.use('/award', awardRouter);

app.get('/error', (req, res, next) => {
    console.error('内部服务器错误[内部跳转]');
    res.send('')
})

app.use((req, res) => {
    res.status(404)
    res.send('页面不存在！')
})

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500);
    res.send('内部服务器错误')
})