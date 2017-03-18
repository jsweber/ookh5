import common from 'scss/common.scss'
import style from './style.scss'
import o from "js/common";
import Dan from "./classDan";
import Line from "./classLine";
import ImgLoad from "./classImgLoading";

sessionStorage.removeItem("lastId");  //测试用

let $loadMast = $(".loading-mast");
let $framewrapper = $(".frame-wrapper");
let $frames = $(".frame");
let $frameEndMast = $(".frame-end-mast");
let frameLen = $frames.length;
let startFrame = 0;

let tipLine = new Line(); //存储服务器获取的弹幕队列
let $dans = $(".tip-hook");
let dansLen = $dans.length;
let lastId = sessionStorage.getItem("lastId") || "";
let isReq = 1;  //用来判断是否继续发送请求

// const HOST="http://192.168.1.50:8081";
const HOST="http://192.168.1.6:9000";
const reqTipNum = 5;  //一次请求5条数据
const loopTime = 5000; //毫秒计算，发送请求用
const animLoop = 500; //弹幕轮询，幻灯片放映用 

//处理图片loading
dealLoading(()=>{
    //不断循环
    setTimeout(()=>{
        setFrameLoop(loopTime,animLoop);
    },1000);
});

function dealLoading(cb){
    let l = new ImgLoad(".frame-wrapper");
    let lock = true;

    setTimeout(()=>{
        if(lock){
            lock = false;
            $loadMast.hide();
            cb();
        }
    },5000);
    l.loading((count,sum)=>{
        $loadMast.html(`${Math.floor(count/sum*100)}%`);
        if(count === sum && lock){
            lock = false;
            $loadMast.hide();
            cb();
        }
    });
}

buttonControl();
function buttonControl(){
   let $tipList = $(".tip-list");
   let $dantext = $("#dantext");
    $(".input-btn").on("click",function(){
        $.ajax({
            url:`${HOST}/wechat/user/postDanmu`,
            data:{
                message:$dantext.val()
            },
            type:"post",
            dataType:"json",
            success(res){
                $dantext.val("");
            },
            error(err){
                console.log("应用层错误");
            }
        });
    });

    $(".dan-btn").on("click",()=>{
        $tipList.css({
            opacity:($tipList.css("opacity")) == 1 ? 0:1
        });
    });

}

httpHandle();
function httpHandle(){
    $.ajax({
        url:`${HOST}/wechat/user/getDanmu?limit=${reqTipNum}&lastId=${lastId}`,
        type:"get",
        dataType:"json",
        success(res){
            if(res.code == 200){
                let len = res.data.length;
                tipLine.concat(res.data);  //下面用了pop，会删除元素，所以这里先合并
                isReq = len;  //当长度为0时可以用来判断是否发送请求
                lastId = len>0 ? res.data.pop().id : lastId;
                sessionStorage.setItem("lastId",lastId);
            }else{
                console.log("应用层错误");
                isReq = 0;
            }
        },
        error(err){
            console.log("服务器错误："+err);
            isReq = 0;
        }
    });
}

function danHandle(){
    for(let i=0;i< dansLen;i++){
        var $dan = $dans.eq(i);
        if(0 == $dan.attr("data-ready") && tipLine.len()>0){
            var time = Math.floor(Math.random()*12)+5;
            var d = new Dan($dan,time,tipLine.get().message);  //line get方法自带删除功能
            d.move();
        }
    }
}

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
            startAnim = nowAnim;
            danHandle();
            play(playEnd);
        }

        requestAnimationFrame(animLoop);
    }
}

initImgFrame();
function initImgFrame(){
    $framewrapper.css("width",frameLen*o.winw);
}
function play(cd){   
    if(startFrame < frameLen){
        $framewrapper.css("transform",`translate3d(${-o.winw*startFrame}px,0,0)`);
    }else if(startFrame === frameLen ){
        cd && cd();        
    }
    startFrame ++;
}
function playEnd(){
    $frameEndMast.show();

}
$(".replay").on("click",()=>{
    $frameEndMast.hide();
    startFrame = 0;
});

