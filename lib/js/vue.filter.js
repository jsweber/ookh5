import Vue from "js/vue.js"
/*
* vue过滤器
* 获取兼容app的链接
* @param {String} env 运行环境
* */
function setFilter(env="production"){
    var FilterHOST;
    if("development" === env){
        FilterHOST= "http://dev.ooklady.com";
    }else{
        FilterHOST= "http://wx.ooklady.com";
    }

    /**
     * 根据ook api文档的key/value参数获取相应的产品列表链接
     * @param {String} value
     * @param {String} key 默认activityType
     * @return {String} url
     */
    Vue.filter("getProductList",function(value,key){
        value = value.replace(" ","");
        key = !key ? "activityType" : key;
        if(isInApp()){
            var o = {};
            o[key] = value;
            return "native://viewList?data="+ encodeURI(JSON.stringify(o));
        }else{
            return `${FilterHOST}/wechat/products?${key}=${value}`;
        }
    });
    /**
     * 传入产品的itemId获取产品详情的链接
     * @param {String} itemId
     * @return {String} url
     */
    Vue.filter("getProductInfo",function(itemId){
        itemId = itemId.replace(" ","");
        if(isInApp()){
            return "native://viewGood?data="+ encodeURI(JSON.stringify({
                tiD:itemId
            }));
        }else{
            return FilterHOST+"/wechat/item/product_info?productId="+itemId;
        }
    });
}

/*
* 工具函数
* */
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

export default setFilter;