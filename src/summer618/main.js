import style from './style.scss'
import Vue from "js/vue.js"
import vue_filter from "js/vue.filter.js"
import setWX from "js/wxShare"
import getUserId from "js/getUserId"
import mountCompnent from "./component"
import data from "./data"

//发布正式版要改
const ENV = "production";

let component = mountCompnent(ENV);
 vue_filter();
getUserId(ENV).then((res)=>{
    console.log(res);
    setWX({
        env:ENV,
        title:'618\"饰放\"狂欢，囤够一夏',
        desc:'全场3-9折，抢5万元大礼',
        shareImg:"http://wx.ooklady.com/imgs/xiaoqing/summer618/0cover.jpg",
        shareLink:location.href+"?userId="+res.id
    });
});

function init(hour){
    if(+new Date() > +new Date("June 18,2017 00:00:00")){
        $(".time-hook").hide();
    }
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
    let $mast = $("#limitmast");
    let index = setNowLimitProduct(hour);
    console.log("第0-4个"+index);
    if(index>0){
        for(let i=0;i<index;i++){
            $timeItem.eq(i).addClass("time-grey").find(".text").html("已抢购"); 
        }
    }
    $timeItem.eq(index).addClass("time-active").addClass("time-click").find(".text").html("抢购中");
    $productItem.eq(index).addClass("product-item-active");
    
    $mast.css({
        width:parseInt(index / $timeItem.length * 100)+"%"
    }).on("click",function(){
        return false;
    });
    $timeItem.on("click",function(){
        $timeItem.removeClass("time-click");
        $(this).addClass("time-click");
        $productItem.removeClass("product-item-active");
        $productItem.eq($(this).index()).addClass("product-item-active");
    });
}
function isInApp(){
    return getPara("type") == "app";
}

function getPara(paraName) {
    var urlPara = location.search;
    var reg = new RegExp("[&|?]" + paraName + "=([^&$]*)", "gi");
    var a = reg.test(urlPara);
    return a ? RegExp.$1 : null;
}

//把obj1的值赋给obj2
function clone(obj1, obj2) {
    for (var attr in obj1) {
        obj2[attr] = obj1[attr];
    }
}
let vue = new Vue({
    el:"#app",
    data:{
        products:data,
        isShow:+new Date() < +new Date("June 19,2017 00:00:00")
    },
    components: {
      product : component.product,
      brand : component.brand
    },
    methods: {
        goAfter618(){
            if(isInApp()){
                location.href = "http://wx.ooklady.com/view/wxpages/activitypage/after618/after618.html?type=app";
            }else{
                location.href = "http://wx.ooklady.com/view/wxpages/activitypage/after618/after618.html";
            }
        }
    },
    ready(){
        console.log("this.isShow:"+this.isShow);
        if(!this.isShow){
            setTimeout(()=>{
                this.goAfter618();
            },2000);
        }

        init(new Date().getHours());
        $(".gotop").on("click",function(){
            $(document).scrollTop(0);
        });
    }
});


