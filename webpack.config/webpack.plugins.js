var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");
var subProjects = require("./subProjects");

function setPlugins(filename,title,env){
    var plugins=[];
    if(env == "production"){
        plugins.push(
            //http://imweb.io/topic/5868e1abb3ce6d8e3f9f99bb   这里看详情
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                comments: false,
                compress:{
                    warnings:false,
                    drop_console: true,
                }
            })
        );
    }
    plugins.push(new webpack.HotModuleReplacementPlugin());
    //添加全局匹配，value（jquery）值是在alias里定义的
    plugins.push(new webpack.ProvidePlugin({
        $:'jquery'
    }));
    plugins.push(
        new HtmlWebpackPlugin({
            title:title,
            filename:`${filename}/${filename}.html`,
            template:`src/${filename}/${filename}.html`,
            chunks:[filename],  //指定哪个entry入口调用
            inject:true
        }) 
    );
    return plugins;
}

module.exports = setPlugins;