import Vue from "js/vue.js"
import vue_filter from "js/vue.filter.js"
const CONF_BASE = {
    develop: {
        wx_host: "http://test.ooklady.com",
        app_host: "http://dev.ooklady.com",
        app_id:"wxf49416ed43c7baa8"
    },
    production: {
        wx_host: "http://wx.ooklady.com",
        app_host: "http://ooklady.com:8090",
        app_id:"wx8b33756ca20faafa"
    }
};
function mountCompnent(env){
    let component = {};
    let app_host = CONF_BASE[env].app_host;
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

    component.product = Vue.extend({
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
                url:app_host+'/wechat/item/ajaxStock?itemId='+this.info.itemid,
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

    component.brand = Vue.extend({
        template:`
            <li class="brand-item">
                <a class="brand-img" :href="brand.brandname | getProductList 'tag'">
                    <img :src="brand.brandimg">
                </a>
                <div class="product-wrapper">
                    <ul class="scroll-move" v-el:scroll>
                        <li class="product" v-for="item in productlist">
                            <a class="img-wrapper" :href="item.itemId | getProductInfo"><img :src="item.img" alt=""></a>
                            <div class="text">￥{{item.fp}}</div>
                        </li>
                        <li class="productmore">
                            <a :href="brand.brandname | getProductList 'tag'" class="more-btn">
                                查看更多<br/>
                                >
                            </a>
                        </li>
                    </ul>
                </div>
            </li>
        `,
        props:{
            brand:{
                default(){
                    return {
                        brandname:"",
                        brandimg:""
                    }
                },
                type:Object
            }
        },
        data(){
            return {
                productlist:[]
            }
        },
        created(){
            let self = this;
            //避免和限时的请求一起发送
            setTimeout(()=>{
                $.ajax({
                    url:`${app_host}/public/ook/search/getBrandTop?brand=${self.brand.brandname}&pageSize=8`,
                    type:"get",
                    dataType:"json",
                    success(res){
                        if(200 === res.code){
                            self.productlist = res.data;
                            self.$nextTick(()=>{
                                let scroll = self.$els.scroll;
                            scroll.style.width = (220 / 750) *16 * (self.productlist.length+1)+"rem";
                            let startx = 0;
                            let disx = 0;
                            let diff = 0;
                            let minDis = scroll.offsetWidth - window.innerWidth;
                            scroll.addEventListener("touchstart",function(e){
                                let touch = e.targetTouches[0];
                                startx = touch.pageX;
                                disx = diff;
                            });
                            scroll.addEventListener("touchmove",function(e){
                                let touch = e.targetTouches[0];
                                diff= touch.pageX - startx + disx;
                                if(diff< -minDis - 50){
                                        diff = -minDis;
                                }else if( diff > 50){
                                        diff = 0;
                                }
                                this.style.transform = this.style.WebkitTransform = `translate3d(${diff}px,0,0)`;
                            });
                            });
                        }else{
                            console.log(res.code);
                        }
                    },
                    error(err){
                        console.log(err0);
                    }
                });
            },1000)
        }
    });
    return component;
}

export default mountCompnent;
