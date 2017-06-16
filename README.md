# ookh5
<p>ook一些日常活动的单页面应用开发打包环境</p>
<p>node版本6.2以上</p>
<p>支持scss，es2015 , async/await 语法糖</p>

## 开发规范：
<p>1.首先要去'/project.config.json' 配置项目信息，注意<strong>staticPath</strong>字段是打包后的css和js文件插到html中的路径（ex:  /view/wxpages/activitypage/[project name]/style.css），一般不用更改</p>
<p>2.创建初始化文件（npm run create），会在src下生成你要的小项目，一个html，一个js，一个scss。<span style="color:#ccc;"><strong>todo</strong>:
如果要生成多页面应用，则要创建多个，需要不断去改配置文件，以后会修改</span></p>

## 命令行
<ol>
<li>npm run create 初始化项目</li>
<li>npm run server  运行本地server，支持热加载</li>
<li>npm run build:prod  压缩打包出上线版本</li>
<li>npm run build:dev   打包未压缩版本</li>
</ol>

## 上线规范：
<p>执行命令3</p>
<p>在dist目录下的文件整个活动项目文件夹 部署到正式服的view/wxpages/activitypage/目录下   </p>