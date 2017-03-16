# ookh5
ook一些日常活动的单页面应用开发打包环境
node版本6.2以上
支持scss，es2015

命令行
1.npm run create 初始化项目

2.npm run server  运行本地server，支持热加载

3.npm run build:prod  压缩打包出上线版本

4.npm run build:dev   打包未压缩版本

开发规范：
1.首先要去project.config.json 配置项目信息
2.创建目录，然后会在src下生成你要的小项目，一个html，一个js，一个scss
如果要生成多页面应用，则要创建多个，需要不断去改配置文件，以后会修改

上线规范：
执行命令3
在dist目录下的文件整个拖到 view/wxpages/activitypage/   