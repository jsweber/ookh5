var path = require("path");
var fs = require("fs");
var bodyParser = require('body-parser');
var mock = JSON.parse(fs.readFileSync(path.resolve(__dirname,"../mockdata/tips.json"),"utf8"));

var tips = mock.data;

var server = {
    contentBase:path.resolve(__dirname,"../dist"),
    publicPath:"/",
    host:"192.168.73.55",
    port:9000,
    historyApiFallback:true,
    compress:true,
    hot:true,
    inline:true,  //浏览器不显示打包信息
    noInfo:true,
    setup:function(app){
        app.use(bodyParser.urlencoded({extended:true}));
        
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
            res.json(resData);
        });

        app.post("/wechat/user/postDanmu",(req,res)=>{
            var message = req.body.message;

            if(message.replace(/ /,"").length === 0){
                res.json({code:201,message:"不能传空值"});
            }

            tips.push({
                id:+new Date(),
                message:message,
                isMyself:true
            });
            res.json({code:200,message:"上传成功"});
        });
    }
};

module.exports = server;