import style from './style.scss'
import swpercss from "scss/swiper3.min.scss"
import swiper from "js/swiper3.min.js"
import isApp from "js/isApp.js"
import setWX from "js/wxShare"

setWX({
    title: "跟随小雅&OOK探寻全球美饰",
    env:"develop", //production
    desc: "跟随小雅&OOK探寻全球美饰",
    shareImg: "http://wx.ooklady.com/imgs/xiaoqing/xiaoya/share.jpg",
    shareLink: "http://wx.ooklady.com/view/wxpages/activitypage/xiaoya/xiaoya.html",
    wxshareCallback: function () {
        
    }
});

var swip = new Swiper('.swiper-container', {
    direction: 'vertical',
    noSwiping : true,
});
var swip2 = new Swiper('.swiper-container2', {
    direction : 'horizontal',
    initialSlide:1
});
let nowPage = 0;
let maxLen = $(".swiper-container .swiper-slide").length;
//上一张页面
$(".backBtn").on("click",function(){
    if(nowPage >0){
        nowPage--;
        swip.slideTo(nowPage, 300, false);
    }
})
//下一张页面
$(".nextBtn").on("click",function(){
    if(nowPage <maxLen-1){
        nowPage++;
        swip.slideTo(nowPage, 300, false);
    }
})

window.onorientationchange = function(){
    if(window.innerHeight > window.innerWidth){
        $(".no-rotate").show();
    }else{
        $(".no-rotate").hide();
    }
}

$(".btn-hook").on("click",link);
function link(){
    let itemId = $(this).data("itemid");
    if(isApp()){
         location.href = "native://viewGood?data="+ encodeURI({tiD:itemId});
    }else{
        location.href = "http://wx.ooklady.com/wechat/item/product_info?productId="+itemId;;
    }   
}

$(".mast-close").on("click",function(){
    $(".mast").css("transform","translate3d(-100%,0,0)");
});
$(".ring").on("click",function(){
    $(".my").css("transform","translate3d(0,0,0)");
});
$(".pklist").on("click",function(){
    $(".packing").css("transform","translate3d(0,0,0)");
    $(".packing").show();
});
$(".neck").on("click",function(){
    $(".what").css("transform","translate3d(0,0,0)");
});