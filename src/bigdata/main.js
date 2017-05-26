import swipercss from "scss/swiper3.min.scss"
import style from './style.scss'
import swiperjs from "js/swiper3.min.js";
import statistic from "js/statistic.js";
import womanData from "./womanData";
import setWX from "js/wxShare.js";
import isApp from "js/isApp.js";

statistic("production");
setWX({
    title: " ",
    env:"production",
    desc: "谁在OOK购物？",
    shareImg: "http://wx.ooklady.com/imgs/xiaoqing/bigdata/2.jpg",
})

setLinkPro({
    query:{
        bannerType:73
    },
    button:$("#product")
})

/*
 * params Object
 * {
 *  query:{}   //banner跳转到产品链接参数
 *  button:$Object //只支持jquery对象
 *
 * }
 * */
function setLinkPro(options){
    var query = {},queryStr = '';
    clone(options.query,query);
    //var key = settings.key || 'bannerType';
    //var value = settings.value || 0;
    var $a = options.button || $('.img-btns-wrapper').find('a');
    for(var key in query){
        queryStr+= key+'='+query[key]+'&';
    }
    queryStr = queryStr.substr(0,queryStr.length-1);
    var type = decodeURI(location.href).indexOf('type=app')>0 ? 'app':'wx';
    $a.on('click',function(){
        if('app' === type){   //app 环境
            window.location.href="native://viewList?data="+ encodeURI(JSON.stringify(query));
        }else{
            window.location.href="http://wx.ooklady.com/wechat/products?"+queryStr;
        }
    });
}
//把obj1的值赋给obj2
function clone(obj1,obj2){
    for(var attr in obj1){
        obj2[attr] = obj1[attr];
    }
}


let mySwiper = new Swiper('.swiper-container', {
    direction : 'vertical',
    onSlideChangeEnd: function(swiper){
       
    },
})

const womanInfo =womanData;
let $womans = $(".woman");
let $womanMast = $(".detail-mast");
$(".woman-close").on("click",function(){
    $womanMast.hide();
});
$womans.on("click",function(){
    let i = $(this).index();
    $("#location").html(womanData[i].location);
    $("#woman-head").attr("src",womanData[i].head);
    $("#name").html(womanData[i].name);
    $("#solgn").html(womanData[i].sologn);
    $("#product").attr("src",womanData[i].product);
    $womanMast.show();
});

let $contents = $(".content");
$tabs = $(".tab");
$tabs.on("click",function(){
    $tabs.removeClass("active");
    $(this).addClass("active");
    $contents.css("opacity",0);
    $contents.eq($(this).index()).css("opacity",1);
});

$(".share-mask").on("click",function(){
    $(this).hide();
});
$("#share").on("click",function(){
    $(".share-mask").show();
});
$("#first").on("click",function(){
    mySwiper.slideTo(0, 800, false);
});

let $music = $("#music")[0];
$("#music-btn").on("click",function(){
    if($(this).data("status") == 0){
        $music.play();
        $(this).data("status",1).addClass("rotate-animation");
    }else{
        $music.pause();
        $(this).data("status",0).removeClass("rotate-animation");
    }
});



