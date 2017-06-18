var path = require("path");
var fs = require("fs");
var bodyParser = require('body-parser');
var server = require("./server.js");
var mock = JSON.parse(fs.readFileSync(path.resolve(__dirname,"../mockdata/tips.json"),"utf8"));

var tips = mock.data;

var server = {
    contentBase:path.resolve(__dirname,"../dist"),
    publicPath:"/",
    host:"localhost",
    port:9000,
    historyApiFallback:true,
    compress:true,
    hot:true,
    inline:true,  //浏览器不显示打包信息
    noInfo:true,
    setup:server
};

module.exports = server;