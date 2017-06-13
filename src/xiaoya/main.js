import style from './style.scss'
import swpercss from "scss/swiper3.min.scss"
import swiper from "js/swiper3.min.js"

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

