
// const { createProxyMiddleware } = require('http-proxy-middleware');
// const { createProxyMiddleware } = require('http-proxy-middleware');
const { createProxyMiddleware } = require('http-proxy-middleware');
const http = require('http')
const express = require('express')
const compression = require('compression')
const app = express()
//gzip压缩
app.use(compression())
//拖挂资源
app.use(express.static("./dist"))

app.use(createProxyMiddleware("/js", {
    target: "http://fund.eastmoney.com",
    changeOrigin: true,
}));

app.use(createProxyMiddleware("/FundSearch", {
    target: "https://fundsuggest.eastmoney.com",
    changeOrigin: true,
}));

app.use(createProxyMiddleware("/FundMApi", {
    target: "https://fundmobapi.eastmoney.com",
    changeOrigin: true,
}));

app.listen("8084", () => {
    console.log('mfund 服务启动了 http://127.0.0.1');
})
