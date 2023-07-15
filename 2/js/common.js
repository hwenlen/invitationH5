var Common = {
    //获取url地址参数
    getUrlParam: function (name){
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = window.location.search.substr(1).match(reg);
        if (r !== null) return unescape(r[2]);
        return null;
    }
}

var BaseURL = 'https://wt.broadconch.com';
var openId = Common.getUrlParam('openid');

var isRegister = function(){
    $.ajax({
        url: BaseURL + '/customer/isRegister',
        type : "POST",
        data: openId,  
        success:function(res){
            if(!res.data.register){
                window.location.href = 'register.html?openid'+openId;
            } else {
                
            }
        }
    });
}
//微信授权
var wxAuthorize = function () {
    var URL = window.location.href;
//    window.location.href = BaseURL + '/front/wechat/oauth?url=' + URL;
}