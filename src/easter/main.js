import style from './style.scss'
import iLoading from "js/ILoading.min.js";
import isApp from "js/isApp";
import setWX from "js/wxShare";

setWX({
    title: " ",
    env:"develop",
    desc: "O小姐福利，快来领取你的彩蛋",
    shareImg: "http://wx.ooklady.com/imgs/xiaoqing/easer/loading-eag.png",
    shareLink: "/view/wxpages/activitypage/easter/easter.html",
    wxshareCallback: function () {
        
    }
});

//loading
dealLoading(()=>{
    $(".landing").show();
})

function dealLoading(cb){
    let l = new iLoading("#app");
    let $loadMast = $(".loading");
    let lock = true;

    setTimeout(()=>{
        if(lock){
            lock = false;
            $loadMast.hide();
            cb();
        }
    },5000);
    l.loadingProcess((count,sum)=>{
        if(count === sum && lock){
            lock=false;
            $loadMast.hide();
            cb();
        }
    });
}
//决定优惠码
const PrizeData = [
    {
        prize:10,
        text:"使用方式\<br\>下单后输入优惠码：easter"
    },
    {
        prize: 20,
        text:"使用方式\<br\>下单后输入优惠码：bunny "
    },
     {
        prize: 30,
        text:"使用方式\<br\>下单后输入优惠码：hope"
    }
];
function decidPrice(){
    let i=parseInt(Math.random()*3);
    let selected = PrizeData[i];
    $("#num").html(selected.prize);
    $(".use-rule").html(selected.text);
}
$(".go-index").on("click",()=>{
    if(isApp()){
        location,href = "native://Home";
    }else{
        location.href = "http://wx.ooklady.com/wechat/index";
    }
});
//砸蛋
$(".prize-item").on("click",function(){
    $(this).find(".hammer").css("opacity",1)
    .addClass("za")
    .on("webkitAnimationEnd animationEnd",()=>{
        setTimeout(()=>{
            decidPrice();
            $(".game").hide();
        },300); 
    });
});
//进入游戏
$(".enter").on("click",()=>{
    $(".landing").hide();
    $(".game").show();
});
//关闭规则
$(".close-btn").on("click",()=>{
    $(".rule").hide();
});
//打开规则
$(".game-rule").on("click",()=>{
    $(".rule").show();
});


