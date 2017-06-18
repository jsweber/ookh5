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
        title:'饰放狂欢，囤够一夏',
        desc:'最后一天619，全场3-9折',
        shareImg:"http://wx.ooklady.com/imgs/xiaoqing/after618/0cover.jpg",
        shareLink:location.href+"?userId="+res.id
    });
});


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
        $(".gotop").on("click",function(){
            $(document).scrollTop(0);
        });
    }
});


