function OAuth_login() {
    var MOBILE_ENV = "";
    var browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {         //移动终端浏览器版本信息

                trident: u.indexOf('Trident') > -1, //IE内核

                presto: u.indexOf('Presto') > -1, //opera内核

                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核

                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核

                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端

                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端

                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器

                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器

                iPad: u.indexOf('iPad') > -1, //是否iPad

                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };
    var redirectWBUrl = encodeURIComponent(location.href);
    //判断是否是移动设备打开。browser代码在下面
    if (browser.versions.mobile) {
        var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            MOBILE_ENV = 'WX';
            weixinHandle();
        } else if (ua.match(/WeiBo/i) == "weibo") {
            MOBILE_ENV = 'WB';
            weiboHandle();
        } else if (ua.match(/douban/i) == 'douban') {
            MOBILE_ENV = 'DB';
            doubanHandle();
        } else {
            MOBILE_ENV = 'BROW';
            browserHandle();
        }
    }

    function weixinHandle() {
        getUserId('WX');
    }

    function browserHandle() {
        getUserId('BROW');
    }

    function doubanHandle() {
        // alert('豆瓣里哦！');
        getUserId('DB');
    }

    function weiboHandle() {
        getUserId('WB');
        return;
    }

    function getUserId(env, cb, data) {
        console.log("验证运行");
        var query = '?env=' + env;
        if (sessionStorage.getItem("ook_authorized") == null) {
            sessionStorage.setItem("ook_authorized","true");
            location.href = "http://wx.ooklady.com/auth" + query + "&r=" + encodeURIComponent(location.href);
        }
    }
}

export default OAuth_login;