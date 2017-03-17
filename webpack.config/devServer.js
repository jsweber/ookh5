var path = require("path");
var fs = require("fs");
var mock = JSON.parse(fs.readFileSync(path.resolve(__dirname,"../mockdata/tips.json"),"utf8"));

var tips = mock.data;

var server = {
    contentBase:path.resolve(__dirname,"../dist"),
    publicPath:"/",
    historyApiFallback:true,
    hot:true,
    inline:true,
    noInfo:true,
    port:9000,
    setup:function(app){
        app.get("/wechat/user/getDanmu",function(req,res){
            var limit = parseInt(req.query.limit) || 5;
            var lastId = req.query.lastId || 0;
            var startId = 0;

            var resData = {code:200};
            if(lastId !== 0){
                for(var i=0;i<tips.length;i++){
                    if(lastId === tips[i].id){
                        startId = i+1;
                    }
                }
            }

            resData.data = tips.slice(startId,startId+5);
            console.log("startId=====>"+startId);

            res.json(resData);
        });
    }
};

module.exports = server;