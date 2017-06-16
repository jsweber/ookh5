import style from './style.scss'
import Vue from "js/vue.js"
import vue_filter from "js/vue.filter.js"
import setWX from "js/wxShare"
import getUserId from "js/getUserId"
import mountCompnent from "./component"
import data from "./data"

//发布正式版要改
const ENV = "develop";

let component = mountCompnent(ENV);
 vue_filter();
getUserId(ENV).then((res)=>{
    console.log(res);
    setWX({
        env:ENV,
        desc:'618\"饰放\"狂欢，囤够一夏',
        shareImg:"http://wx.ooklady.com/imgs/xiaoqing/summer618/0cover.jpg",
        shareLink:location.href+"?userId="+res.id
    });
});

function init(hour){
    //June 13,2017 18:33:35  dateObject.getHours() 0-23
    const timePoint = [0,8,12,16,20,24];
    /*
        函数通过传参可以方便调试 0-23
        0 => 0
        2=> 0
        8 => 1
        ...
        @return 0-4
    */
    let setNowLimitProduct = (nowHours)=>{
        // let nowHours = new Date().getHours();
        console.log(nowHours);
        for(let i=0;i<timePoint.length;i++){
            if(nowHours < timePoint[i+1]){
                return i;
            } 
        }
    }
    //限时购交互
    let $timeItem = $(".time-item");
    let $productItem = $(".product-item")
    let index = setNowLimitProduct(hour);
    console.log("第几个"+index);
    if(index>0){
        $timeItem.eq(index-1).addClass("time-grey").find(".text").html("已抢购");   
    }
    $timeItem.eq(index).addClass("time-active").addClass("time-click").find(".text").html("抢购中");
    $productItem.eq(index).addClass("product-item-active");

    $timeItem.on("click",function(){
        $timeItem.removeClass("time-click");
        $(this).addClass("time-click");

        $productItem.removeClass("product-item-active");
        $productItem.eq($(this).index()).addClass("product-item-active");
    });
}

let vue = new Vue({
    el:"#app",
    data:{
        products:data,
    },
    components: {
      product : component.product,
      brand : component.brand
    },
    ready(){
        init(new Date().getHours());
        $(".gotop").on("click",function(){
            $(document).scrollTop(0);
        });
    }
});


