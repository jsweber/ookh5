var path = require("path");
var fs = require("fs");
var tips = JSON.parse(fs.readFileSync(path.resolve(__dirname,"../mockdata/tips.json"),"utf8"));

var server = {
    contentBase:path.resolve(__dirname,"../dist"),
    publicPath:"/",
    historyApiFallback:true,
    hot:true,
    inline:true,
    noInfo:true,
    port:9000,
    setup:function(app){
        app.get("/api/get",function(req,res){
            res.json(tips);
        });
    }
};


module.exports = server;