# ookh5
<p>ook一些日常活动的单页面应用开发打包环境</p>
<p>node版本6.2以上</p>
<p>支持scss，es2015</p>

## 开发规范：
<p>1.首先要去project.config.json 配置项目信息</p>
<p>2.创建目录，然后会在src下生成你要的小项目，一个html，一个js，一个scss
如果要生成多页面应用，则要创建多个，需要不断去改配置文件，以后会修改</p>
## 命令行
<ol>
<li>npm run create 初始化项目</li>
<li>npm run server  运行本地server，支持热加载</li>
<li>npm run build:prod  压缩打包出上线版本</li>
<li>npm run build:dev   打包未压缩版本</li>
</ol>

## 上线规范：
<p>执行命令3</p>
<p>p在dist目录下的文件整个拖到 view/wxpages/activitypage/   </p>