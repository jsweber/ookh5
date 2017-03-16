var path = require("path");
var webpack = require("webpack");
var fs = require("fs");

var projectConfig = JSON.parse(fs.readFileSync("project.config.json","utf-8"));
var projectName = projectConfig.name;
var projectVer = projectConfig.version;
var title = projectConfig.title;
var staticPath = projectConfig.staticPath;

var pluginFn = require("./webpack.config/webpack.plugins");
var devServer = require("./webpack.config/devServer");

var webpackConfig = {};
//配置主函数入口
var entry = {};
entry[projectName] = path.resolve(__dirname,"src/"+projectName+"/main.js");
webpackConfig.entry=entry;

//判断是不是生产环境,命令&& 前面有一个空格就会赋值
var NODE_ENV = process.env.NODE_ENV || "development";
if(NODE_ENV === "production"){
    webpackConfig.output = {
        filename:projectName+'/'+projectName+ "." +projectVer+".min.js",
        path:path.resolve(__dirname,"dist"),
        publicPath:staticPath
    };
    console.log("现在是生产环境");
}else{
    webpackConfig.output = {
        filename:projectName+'/'+projectName+ "." +projectVer+".js",
        path:path.resolve(__dirname,"dist"),
        publicPath:"/"
    };
    //配置map
    webpackConfig.devtool = "source-map";
    webpackConfig.devServer= devServer;
    console.log("现在是开发环境");
}

//配置路径简写
webpackConfig.resolve = {
    alias:{
        jquery$:path.resolve(__dirname,"./lib/jquery.min.js"),
    } 
}
//配置loader
webpackConfig.module = {
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
}
//配置插件
webpackConfig.plugins = pluginFn(projectName,title,NODE_ENV);

module.exports=webpackConfig