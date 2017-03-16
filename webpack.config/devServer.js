var path = require("path");
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
            res.json({code:999});
        });
    }
};


module.exports = server;