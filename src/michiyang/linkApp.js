function linkApp(data){
    window['sharejson'] = JSON.stringify({
        "title":data.shareInfo.title,
        "content":data.shareInfo.desc,
        "shareimg":(data.shareInfo.shareImg || $('.act-container').find('img').eq(0).attr('src')),
        "sharelink":location.href.replace("type=app","")
    });

    if (!(data.link === undefined)) setLinkPro(data.link);
    setWX(data.shareInfo);

/*
 * params Object
 * {
 *  query:{}   //banner跳转到产品链接参数
 *  button:$Object //只支持jquery对象
 *
 * }
 * */
    function setLinkPro(options){
        var query = {},queryStr = '';
        clone(options.query,query);
        //var key = settings.key || 'bannerType';
        //var value = settings.value || 0;
        var $a = options.button || $('.img-btns-wrapper').find('a');
        for(var key in query){
            queryStr+= key+'='+query[key]+'&';
        }
        queryStr = queryStr.substr(0,queryStr.length-1);
        var type = decodeURI(location.href).indexOf('type=app')>0 ? 'app':'wx';
        $a.on('click',function(){
            if('app' === type){   //app 环境
                window.location.href="native://viewList?data="+ encodeURI(JSON.stringify(query));
            }else{
                window.location.href="/wechat/products?"+queryStr;
            }
        });
    }
/*
 * 自定义微信分享参数
 * params  options  Object
 * {
 *   title:String   //微信朋友分享主title
 *   desc :  String  //微信朋友分享副标题 + 朋友圈分享标题
 *  shareImg:  String  //分享图片链接
 * }
 * */
    function setWX(options){
        var timestamp = '';
        var nonceStr = '';
        var sign = '';
        var shareUrl = location.href.split('#')[0];
        shareUrl = shareUrl.replace("type=app","");
        $.ajax({
            url: '/ajaxWxShare?url=' + encodeURIComponent(shareUrl),
            type: 'GET',
            cache: false,
            async: false,
            dataType: 'JSON',
            timeout: 1000,
            error: function (textStatus) {
                // alert('系统错误');
                console.log("微信请求验证错误");
            },
            success: function (msg) {
                timestamp = msg.timestamp;
                nonceStr = msg.nonceStr;
                sign = msg.sign;
                if (sign != '') {
                    wx.config({
                        debug: false,
                        appId: "wxf49416ed43c7baa8",   //正式：wx8b33756ca20faafa  测试：wxf49416ed43c7baa8
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

        var url = shareUrl;
        var title = options.title || 'OOK 饰放，我不做配角!';
        var imgUrl = options.shareImg || $('.act-container').find('img').eq(0).attr('src');
        var desc = options.desc ||  'OOK是全国首家女性首饰盒集享平台。甄选全球设计师饰品，引领时尚潮流，传播配饰文化。';
        wx.ready(function () {
            // 8.3 批量隐藏菜单项
            wx.hideMenuItems({
                menuList: [
                    'menuItem:openWithQQBrowser', // 在QQ浏览器中打开
                    'menuItem:openWithSafari', // 在Safari中打开
                    'menuItem:share:email', // 邮件
                    'menuItem:readMode', // 阅读模式
                    'menuItem:originPage', // 原网页
                ],
            });

            //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
            wx.onMenuShareTimeline({
                //title: 'Wanderlust+Co:只愿戴着它与你爱爱', // 分享标题
                title:desc,
                link: url, // 分享链接
                imgUrl: imgUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });

            //获取“分享给朋友”按钮点击状态及自定义分享内容接口
            wx.onMenuShareAppMessage({
                title: title, // 分享标题
                desc:desc, // 分享描述
                link: url,
                imgUrl: imgUrl, // 分享图标
                type: 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        });

        wx.error(function (res) {
            alert(res.errMsg);
        });
    }
//把obj1的值赋给obj2
    function clone(obj1,obj2){
        for(var attr in obj1){
            obj2[attr] = obj1[attr];
        }
    }
}


module.exports = linkApp;