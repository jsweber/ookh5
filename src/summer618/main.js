import style from './style.scss'
import Vue from "js/vue.js"
import vue_filter from "js/vue.filter.js"
import productComponent from "./component"

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
        $timeItem.eq(index-1).addClass("time-grey");   
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

    },
    components: {
      product : productComponent
    },
    ready(){
        init(new Date().getHours());
    }
});


