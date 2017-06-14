import Vue from "js/vue.js"
let productTemplate = 
`<a  class="wrapper" :href="info.href">
    <div class="img-wrapper">
        <img :src="info.url" alt="">
        <div class="sell-out" v-show="nowsell === 5">还有<br/>机会</div>  
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
                    itemId:"",
                    url:"null",
                    name:"null",
                    brand:"null",
                    nowprize:"",
                    delprize:"",
                }
            },
            type:Object
        },
        nowsell:{
            default(){
                return 0
            },
            type:Number
        }
    },
    data(){
        return {
            
        }
    },
    computed: {
        propress(){
            return parseInt((this.nowsell / 5)*100)+"%";
        }
    }
});

export default product;
