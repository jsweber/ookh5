let ook = {};
ook.getPara = getPara;
ook.addQuery = addQuery;
ook.iswx = isWeixin;
ook.obj2query = obj2query;
ook.query2obj = query2obj;
ook.doc = document;
ook.win = window;
ook.winw = ook.win.innerWidth || ook.win.clientWidth;
ook.winh = ook.win.innerHeight || ook.win.clientHeight;

ook.$ = (s)=>{
    if(/^#/.test(s)){
        return ook.doc.querySelector(s);
    }else if(/^./.test(s)){
        return ook.doc.querySelectorAll(s);
    }else{
        return ook.doc.querySelectorAll(s);
    }
}
/*
c  原生canvas对象
w  设置宽
h  设置高
s  几倍像素
*/
ook.setCanSize = (c,w=100,h=200,s=1)=>{
    //设置包含的像素多少
    can.width = s*w;
    can.height = s*h;
    //设置占页面的大小
    can.style.width = w+"px";
    can.style.height = h+"px";
}

function isWeixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

function getPara(paraName) {
    var urlPara = location.search;
    var reg = new RegExp("[&|?]" + paraName + "=([^&$]*)", "gi");
    var a = reg.test(urlPara);
    return a ? RegExp.$1 : null;
};

/*
 * addQuery("www.x.com?a=1&b=2&uid=132456","uid","newuid") ==> "www.x.com?a=1&b=2&uid=newuid"
 * addQuery("www.x.com?a=1&b=2","uid","newuid") ==> "www.x.com?a=1&b=2&uid=newuid"
 */
function addQuery(url, keyName, value) {
    if (arguments.length < 3) return url;
    var pos = url.indexOf('?');
    if (pos == -1) return url + '?' + keyName + '=' + value;
    var pathString = url.substring(0, pos);
    var queryString = url.substring(pos + 1);
    if (queryString === "") return url;

    var obj = query2obj(queryString);
    obj[keyName] = value;
    return pathString + "?" + obj2query(obj);
}

/*
 * obj2query({a:1,b:2}) ==> "a=1&b=2"
 */
function obj2query(obj) {
    var s = "";
    for (kv in obj) {
        if (s === "") s += kv + "=" + obj[kv];
        else s += "&" + kv + "=" + obj[kv];
    }
    return s;
}

/*
 * query2obj("a=1&b=2") ==> {a:1,b:2}
 */
function query2obj(queryString) {
    var obj = new Object();
    var strs = queryString.split("&");
    for (var i = 0; i < strs.length; i++) {
        obj[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
    }
    return obj;
}

export default ook;