var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");
var subProjects = require("./subProjects");

function setPlugins(filename,title,env){
    var plugins=[];
    if(env == "production"){
        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress:{warnings:false}
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