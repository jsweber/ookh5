var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var projectname = parseInt(require("./package.json").projectname);

var plugins = [];
var output = {
    filename:projectname+".js",
    path:path.resolve(__dirname,"dist"),
    publicPath:"/"
};
if(process.env.NODE_ENV === "production"){
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress:{warnings:false}
        })
    );
    output.filename = projectname+".min.js";
    
}
console.log(process.env.NODE_ENV);

plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports={
    entry:{
        app:"./src/app.js"
    },
    output:output,
    module:{
        rules:[
            {
                test:/\.scss$/,
                loader:"style-loader!css-loader!sass-loader"
            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:"babel-loader",
                query:{
                    presets:['es2015']
                }
            }
        ]
    },
    plugins:plugins,
    devServer:{
        contentBase:path.join(__dirname,"dist"),
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
    }
}

