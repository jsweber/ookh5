var path = require("path");
var fs = require("fs");
var svgCaptcha = require('svg-captcha');
var bodyParser = require('body-parser');
var session = require("express-session");

function server(app){
    app.use(session({
        secret: "authkey",// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
        resave: true,// 强制更新 session
        cookie: { maxAge: 24 * 60 * 1000 },
    }));
    app.use(bodyParser.urlencoded({extended:true}));
    //弹幕相关接口
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
    //验证码接口
    app.get("/yz",(req,res)=>{
        var captcha = svgCaptcha.createMathExpr();
        req.session.yz = captcha.text;
        console.log(req.session.yz)
        res.send(`
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <form method="get" action="/yz2">
                        <input name="captcha" type="text" >
                        ${captcha.data}
                        <button type="submit">提交</button>
                    </form>
                </body>
            </html>
        `);
    });
    app.get("/yz2",(req,res)=>{
        let num = req.query.captcha;
        console.log(typeof num,num);
        console.log(typeof req.session.yz,req.session.yz);
        if(parseInt(num) === parseInt(req.session.yz)){
            res.send("成功");
        }else{
            res.send(req.session.yz);
        }
    });

}

module.exports = server;