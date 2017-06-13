import style from './style.scss'
import swpercss from "scss/swiper3.min.scss"
import swiper from "js/swiper3.min.js"
import isApp from "js/isApp.js"

var swip = new Swiper('.swiper-container', {
    direction: 'vertical',
    noSwiping : true,
});
let nowPage = 0;
let maxLen = $(".swiper-slide").length;
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
