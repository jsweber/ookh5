let OOK = {};
OOK.getPara = getPara;
OOK.addQuery = addQuery;
OOK.iswx = isWeixin;
OOK.obj2query = obj2query;
OOK.query2obj = query2obj;

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

export default OOK;