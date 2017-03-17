import common from 'scss/common.scss'
import style from './style.scss'
import o from "js/common";
import Dan from "./classDan";
import Line from "./classLine";

sessionStorage.removeItem("lastId");  //测试用

let tipLine = new Line(); //存储服务器获取的弹幕队列
let $dans = $(".tip-hook");
let dansLen = $dans.length;
let lastId = sessionStorage.getItem("lastId") || "";
let isReq = 1;  //用来判断是否继续发送请求

const HOST="http://192.168.1.50:8081";
const reqTipNum = 5;
const loopTime = 5000; //毫秒计算，发送请求用
const animLoop = 500; //弹幕轮询，幻灯片放映用 



httpHandle();
function httpHandle(){
    console.log("isReq:"+isReq);
    console.log("lastId:"+lastId);
    if(isReq){
        $.ajax({
            url:`${HOST}/wechat/user/getDanmu?limit=${reqTipNum}&lastId=${lastId}`,
            type:"get",
            dataType:"json",
            success(res){
                tipLine.show();
                if(res.code == 200){
                    let len = res.data.length;
                    tipLine.concat(res.data);  //下面用了pop，会删除元素，所以这里先合并
                    isReq = len;
                    lastId = len>0 ? res.data.pop().id : lastId;
                    sessionStorage.setItem("lastId",lastId);
                }else{
                    console.log("应用层错误");
                }
            },
            error(err){
                console.log("服务器错误："+err);
            }
        });
    }else{
        console.log("server no data");
    }
}

function dan(){
    for(let i=0;i< dansLen;i++){
        var $dan = $dans.eq(i);
        if(0 == $dan.attr("data-ready") && tipLine.len()>0){
            var time = Math.floor(Math.random()*12)+3;
            var d = new Dan($dan,time,tipLine.get().message);  //line get方法自带删除功能
            d.move();
        }
    }
}

//不断循环
setFrameLoop(loopTime,animLoop);
function setFrameLoop(setInterVal,animInterVal){
    var startReq = +new Date();
    var nowReq = 0;

    var startAnim = +new Date();
    var nowAnim = 0;
    animLoop();
    function animLoop(){
        nowAnim = nowReq = +new Date();
        //发送请求用的判断
        if(nowReq - startReq > setInterVal){
            startReq = nowReq;
            httpHandle();
        }
        //幻灯片切换判断;弹幕放在这里是为了充分利用，毕竟一次请求可以很多数据，dom只有3个，要多跑点
        if(nowAnim-startAnim > animInterVal){
            startAnim = startAnim;
            dan();
        }

        requestAnimationFrame(animLoop);
    }
}


