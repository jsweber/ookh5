/*
{
    title: " ",
    env:"develop",
    desc: "O小姐福利，快来领取你的彩蛋",
    shareImg: "http://wx.ooklady.com/imgs/xiaoqing/easer/loading-eag.png",
    shareLink: "/view/wxpages/activitypage/dream/landing.html?userId=",
    wxshareCallback: function () {
        
    }
}
*/
function setWX(options) {
    var CONF_BASE = {
        env: "production",
        develop: {
            wx_host: "http://test.ooklady.com",
            app_host: "http://test.ooklady.com",
            app_id:"wxf49416ed43c7baa8"
        },
        production: {
            wx_host: "http://wx.ooklady.com",
            app_host: "http://ooklady.com:8090",
            app_id:"wx8b33756ca20faafa"
        }
    };
    var title = options.title;
    var imgUrl = options.shareImg || $('.act-container').find('img').eq(0).attr('src');
    var desc = options.desc;
    var callback = options.wxshareCallback;
    var shareUrl = options.shareLink || location.href;

    var ACTIVE_APPID = CONF_BASE[options.env].app_id;
    var ACTIVE_HOST = CONF_BASE[options.env].wx_host;

    var timestamp = '';
    var nonceStr = '';
    var sign = '';
    $.ajax({
        url: '/ajaxWxShare?url=' + encodeURIComponent(location.href.split("#")[0]),
        type: 'GET',
        cache: false,
        async: false,
        dataType: 'JSON',
        timeout: 1000,
        error: function (err) {
            console.log('失败！请刷新重试'+err);
        },
        success: function (msg) {
            timestamp = msg.timestamp;
            nonceStr = msg.nonceStr;
            sign = msg.sign;
            if (sign != '') {
                wx.config({
                    debug: false,
                    appId: ACTIVE_APPID,
                    timestamp: timestamp,
                    nonceStr: nonceStr,
                    signature: sign,
                    jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'onMenuShareQZone',
                        'hideMenuItems',
                        'showMenuItems',
                        'hideAllNonBaseMenuItem',
                        'showAllNonBaseMenuItem',
                        'translateVoice',
                        'startRecord',
                        'stopRecord',
                        'onVoiceRecordEnd',
                        'playVoice',
                        'onVoicePlayEnd',
                        'pauseVoice',
                        'stopVoice',
                        'uploadVoice',
                        'downloadVoice',
                        'chooseImage',
                        'previewImage',
                        'uploadImage',
                        'downloadImage',
                        'getNetworkType',
                        'openLocation',
                        'getLocation',
                        'hideOptionMenu',
                        'showOptionMenu',
                        'closeWindow',
                        'scanQRCode',
                        'chooseWXPay',
                        'openProductSpecificView',
                        'addCard',
                        'chooseCard',
                        'openCard'
                    ]
                });
            }
        }
    });

    wx.ready(function () {
        // 8.3 批量隐藏菜单项
        wx.hideMenuItems({
            menuList: [
                'menuItem:openWithQQBrowser', // 在QQ浏览器中打开
                'menuItem:openWithSafari', // 在Safari中打开
                'menuItem:share:email', // 邮件
                'menuItem:readMode', // 阅读模式
                'menuItem:originPage', // 原网页
            ]
        });

        //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
        wx.onMenuShareTimeline({
            //title: 'Wanderlust+Co:只愿戴着它与你爱爱', // 分享标题
            title: desc, // 分享标题，微信朋友圈只有标题接口
            link: shareUrl, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: callback,
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        //获取“分享给朋友”按钮点击状态及自定义分享内容接口
        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: shareUrl,
            imgUrl: imgUrl, // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            trigger: callback,
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    });
    wx.error(function (err) {
        console.log('失败！请刷新重试'+err);
    });
}

export default setWX;