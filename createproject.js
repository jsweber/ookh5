var fs = require("fs");
var path = require("path");
var projectConfig = JSON.parse(fs.readFileSync("project.config.json","utf-8"));
var projectDir = projectConfig.name;
var projectHtmlName = projectConfig.name+".html";
var title = projectConfig.title;

var inPath = "./lib/temp.html";
var outPath = `./src/${projectDir}/${projectHtmlName}`;
var data = "";
//先创建文件夹，再创建文件
if(!fs.existsSync("./src/"+projectDir)){
    fs.mkdirSync("./src/"+projectDir);
}

var readerStream = fs.createReadStream(inPath);
readerStream.setEncoding("utf8");
readerStream.on("data",function(chunck){
    data+=chunck;
});

readerStream.on("end",function(){
    //设置title
    data = data.replace(/\${}/,title);
    fs.writeFile(outPath,data,function(err){
        if(err){
            console.log(err);
            console.log("html 写入失败");
        }else{
            console.log("html初始化成功");
        }
    });
    fs.writeFile(`./src/${projectDir}/style.scss`,"",function(err){
        if(err){
            console.log("css 写入失败");
        }else{
            console.log("css初始化成功");
        }
    });
    fs.writeFile(`./src/${projectDir}/main.js`,"import style from './style.scss'",function(err){
        if(err){
            console.log("js 写入失败");
        }else{
            console.log("js初始化成功");
        }
    });
});

readerStream.on("error",function(err){
    console.log(err.stack);
});

