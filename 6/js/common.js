var baseURL = "http://sn.ruisheng.info/sed";
//共用方法
var Common = {
    //获取url地址参数
    getUrlParam: function (name){
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = window.location.search.substr(1).match(reg);
        if (r !== null) return unescape(r[2]);
        return null;
    },
    disabledForward: function(){
        $.ajax({
            type : "POST",
            url : baseURL+"/Service/Jssdk.ashx",
            data : {
                func:"GetSignature",
                appId:"WechatMiniSite",
                appSecret:"20200108",
                url:location.href.split('#')[0]
            },
            success : function(res) {
                if(res.Code === "100"){
                    wx.config({
                        debug: false, // 开启调试模式
                        appId: res.Data.appId, // 必填，公众号的唯一标识
                        timestamp: res.Data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: res.Data.nonceStr, // 必填，生成签名的随机串
                        signature: res.Data.signature,// 必填，签名
                        jsApiList: [
                            'checkJsApi',
                            "scanQRCode",
                            'hideOptionMenu',
                        ] // 必填，需要使用的JS接口列表
                    });

                    wx.ready(function () {
                        wx.checkJsApi({
                            jsApiList: ['scanQRCode'],
                            success: function (res) {
                                // alert("checkAPI is ok")
                            }
                        });
                        wx.hideOptionMenu();
                    })
                    wx.error(function (res) {
                        //alert("出错了：" + res.errMsg);
                    });
                }
            },
            error : function(e){
                // alert("checkUser ajax Error")
            }
        });
    },
    getTouch: function(callBack) {
        //滑动处理
        var  startY, EndY, Y;
        $(document).on('touchstart', function (e) {
            startY = e.originalEvent.targetTouches[0].pageY;
        });

        $(document).on('touchend', function (e) {
            EndY = e.originalEvent.changedTouches[0].pageY;
            Y = EndY - startY;

            if (Y < -180) {
                callBack();
            } 
            if(Y > 180){
                
            }

        });
    }
}

Common.disabledForward();