/*
* 处理直接加在a标签上的banner链接，兼容app
* param:
*       url banner上传到服务器上后的连接
* */
function setFilter(env){
    var FilterHOST;
    if("development" === env){
        FilterHOST= "http://test.ooklady.com";
    }else{
        FilterHOST= "http://wx.ooklady.com";
    }
     
    Vue.filter("dealBannerLink",function(url){
        if(isInApp()){
            return url+location.search;
        }else{
            return url;
        }
    });

    Vue.filter("getBrandProductList",function(brandname){
        if(isInApp()){
            var query = {"tag":brandname};
            return "native://viewList?data="+ encodeURI(JSON.stringify(query));
        }else{
            return "/wechat/products?tag="+brandname;
        }
        
    });

    /*
    *  获取banner链接，点击进入banner
    *  第一个参数是数字http://wx.ooklady.com/view/wxpages/activitypage/find100girls.html，主要用来判断是不是空的；第二个是bannerType：49
    *  因为是顶部banner，所以默认是bannerType，
    * */
    Vue.filter("getBannerLink",function(value,bannerType){
    //        当url为空时
        if(value.replace(/ /g,"").length == 0){

            if(isInApp()){
                var query = {"bannerType":bannerType},queryStr = '';
                for(var key in query){
                    queryStr+= key+'='+query[key]+'&';
                }
                queryStr = queryStr.substr(0,queryStr.length-1);
                return "native://viewList?data="+ encodeURI(JSON.stringify(query));
            }else{
                return FilterHOST+"/wechat/products?bannerType="+bannerType;
            }
        }else{
            return value;
        }
    });
    //单品详情过滤器
    //只要转产品id的值就行了
    Vue.filter("getProductInfo",function(value){
        if(isInApp()){
            var query = {tiD:value},queryStr = '';
            for(var key in query){
                queryStr+= key+'='+query[key]+'&';
            }
            queryStr = queryStr.substr(0,queryStr.length-1);
            return "native://viewGood?data="+ encodeURI(JSON.stringify(query));
        }else{
            return FilterHOST+"/wechat/item/product_info?productId="+value;
        }
    });
    //产品列表过滤器，和menu差不多功能
    //趋势按钮传tag   分类按钮传cPid
    Vue.filter("getProductList",function(value,key){
        if(isInApp()){
            var query = {tag:value},queryStr = '';
            for(var key in query){
                queryStr+= key+'='+query[key]+'&';
            }
            queryStr = queryStr.substr(0,queryStr.length-1);
            return "native://viewList?data="+ encodeURI(JSON.stringify(query));
        }else{
            return FilterHOST+"/wechat/products?"+key+"="+value;
        }
    });

    Vue.filter("getProductList2",function(value,key){
        if(isInApp()){
            var query = {cPid:value},queryStr = '';
            for(var key in query){
                queryStr+= key+'='+query[key]+'&';
            }
            queryStr = queryStr.substr(0,queryStr.length-1);
            return "native://viewList?data="+ encodeURI(JSON.stringify(query));
        }else{
            return FilterHOST+"/wechat/products?"+key+"="+value;
        }
    });
}
/*
* 点击直接进入产品列表
* param
* {
*   query:{ key : number },
*   button : $dom
* }
* 其中key值是activityType 或者 bannerType
* button是绑定的dom元素，需要jquery包装
* ex:  setLink({query:{activityType:json.fashions.activityType},button:$("#xsg-btn")});
* */

function setLink(options) {
    var query = {}, queryStr = '';
    clone(options.query, query);
    var $a = options.button || null;
    for (var key in query) {
        queryStr += key + '=' + query[key] + '&';
    }
    queryStr = queryStr.substr(0, queryStr.length - 1);
    $a.on('click', function () {
        if (isInApp()) {   //app 环境
            window.location.href = "/wechat/products?" + queryStr;
        } else {
            window.location.href = "native://viewList?data=" + encodeURI(JSON.stringify(query));
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