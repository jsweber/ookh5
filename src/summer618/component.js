import Vue from "js/vue.js"
import vue_filter from "js/vue.filter.js"

let productTemplate = 
`<a  class="wrapper" :href="info.itemid | getProductInfo">
    <div class="img-wrapper">
        <img :src="info.url" alt="">
        <div class="sell-out" v-show="stock === 0">还有<br/>机会</div>  
    </div>
    <div class="product-info">
        <div class="name">{{info.name}}</div>
        <div class="brand">品牌：{{info.brand}}</div>
        <div class="store">
            <div class="propress-wrapper">
                <div class="propress-bar" :style={width:propress}></div>
            </div>
            <span class="store-text">已出售{{propress}}</span>
        </div>
        <div class="prize">
            <div class="second-kill">秒杀价</div>
            <div class="now-prize">￥{{info.nowprize}}</div>
            <div class="del-prize">￥{{info.delprize}}</div>
        </div>
    </div>
</a>`;

let product = Vue.extend({
    template:productTemplate,
    props:{
        info:{
            default(){
                return {
                    href:"",
                    itemid:"",
                    url:"null",
                    name:"null",
                    brand:"null",
                    nowprize:"",
                    delprize:"",
                }
            },
            type:Object
        }
    },
    data(){
        return {
            stock:0
        }
    },
    computed: {
        propress(){
            return parseInt(((5-this.stock)/ 5)*100)+"%";
        }
    },
    created () {
        let self = this;
        $.ajax({
            url:'http://dev.ooklady.com/wechat/item/ajaxStock?itemId='+this.info.itemid,
            type:"get",
            dataType:"json",
            success(res){
                self.stock = typeof res.stock !== 'number' ? parseInt(res.stock):res.stock;
            },
            error(err){
                console.log(err);
            }
        });
    }
});

export default product;
