const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const server = http.createServer(app);
const serverConfig = require('./config/global')
const loginRouter = require('./routers/login')
const awardRouter = require('./routers/award')
const signRouter = require('./routers/sign')
const barrageRouter = require('./routers/barrage');
const configRouter = require('./routers/config');
const log4js = require('./common/log4js')

server.listen(serverConfig.serverPort, () => {
    console.log(`正在监听${serverConfig.serverPort}端口`);
});

log4js.init(app);

app.use(bodyParser.json())

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
});

app.use('/login', loginRouter)
app.use('/sign', signRouter)
app.use('/award', awardRouter);
app.use('/barrage', barrageRouter);
app.use('/config', configRouter);

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