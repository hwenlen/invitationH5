// 定义弹窗的两个回调函数
var cbFN1,cbFN2;
var Common={
	// 域名
    // location
    // baseUrl:"http://hsl.rsproject.cn",
    // online
    // baseUrl:"http://0713.rsproject.cn/xinda/public/index.php",
    
    getLocaStorage:function(name){
        var a = window.localStorage.getItem(name) || null;
        if(a)return JSON.parse(a);
        return false;
    },

    setLocaStorage:function(name,value){
        window.localStorage.setItem(name,JSON.stringify(value));
    },
    
    getQuery:function(name){
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		let r = window.location.search.substr(1).match(reg);
		if (r !== null) return unescape(r[2]);
		return null;
	},
	// 弹窗
	showMessage:function(icons,title,msg,btnNum,fn1){
		// @icons:是否显示成功icon,  参数：false,true
		// @title:提示的标题，例如“提示”  参数：string
		// @msg:提示的内容  参数：string
		// @btnNum按钮的个数  参数: number(暂时最多支持1个)
		// @fn1取消函数 参数: 函数名
		// @fn2确认函数 参数: 函数名(暂未未实现)
		icons?$(".popIcon").show():$(".popIcon").hide();
		title?$(".popMsg .titles").html(title):null;
		msg?$(".popMsg .say").html(msg):null;
		$(".popMsg").fadeIn(300);
		fn1?cbFN1=fn1:null;
		// 是否显示确认按钮
		if(btnNum === 0){
			$(".popMsg .iKnow").hide();
		}else{
			$(".popMsg .iKnow").show();
		}
	},


	isNull:function(str){
		if ( str == "" ) return true;
		var regu = "^[ ]+$";
		var re = new RegExp(regu);
		return re.test(str);
	}
}
$(".popMsg .iKnow").click(function(){
	$(".popMsg").fadeOut(300);
	cbFN1?cbFN1():null;
})
//判断是否是ios
var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
$(function(){
	$(".slide0 .cont .formBox").css("height",$("body").height()*0.65+"px");

    // 失去焦点页面复原
    var setSync;
    (/iphone|ipod|ipad/i.test(navigator.appVersion)) && document.addEventListener('blur',event => {
        if (
            document.documentElement.offsetHeight <=
            document.documentElement.clientHeight &&
            ['input', 'textarea'].includes(event.target.localName)
        ) {
            setSync = setTimeout(function(){
                document.body.scrollIntoView() // 回顶部
            },50)
            if(isiOS){
                $("input").focus(function(){
                    window.clearTimeout(setSync)
                })
            }
        }
    },true)
    if(!isiOS){
        // 设定固定高度解决Andio输入框问题
        var h = $('body')[0].clientHeight;
        $('html,body').height(h);
        // $(".fromBox").height(h*0.7);
        $(".activeInput").focus(function () {
			var moveNum = $(this).offset().top/2;
            $(".formBox").css({
				'position':'relative',
				'top':'-'+moveNum+'px'
			});
			console.log($(this).offset().top)
        });
        $(".activeInput").blur(function () {
            $(".formBox").css({
				'position':'relative',
				'top':''
			});
        });
        $(window).resize(function () {
            window.console.log($(window).height(),h)
            if ($(window).height() == h) {
                $(".activeInput").blur();
            }
        });
    }else{
        // ios
    }
})


// 自定义转发
// Forward();
// function Forward() {
// 	$.ajax({
// 		url: 'http://0713.rsproject.cn/jssdk/jssdk.php',
// 		type: 'post',
// 		data: {
// 			"url": window.location.href
// 		},
// 		dataType: 'json',
// 		success: function (data) {
// 			wx.config({
// 				debug: false,
// 				appId: data.appId,
// 				timestamp: data.timestamp,
// 				nonceStr: data.nonceStr,
// 				signature: data.signature,
// 				jsApiList: [
// 					'hideMenuItems',
// 					'updateTimelineShareData',
// 					'onMenuShareTimeline',
// 					'updateAppMessageShareData',
// 					'previewImage'
// 				]
// 			});
// 			wx.ready(function () {
// 				wx.hideMenuItems({
// 					menuList: [
// 						'menuItem:copyUrl',
// 						'menuItem:originPage',
// 						'menuItem:openWithQQBrowser',
// 						'menuItem:openWithSafari',
// 						'menuItem:share:email',
// 						'menuItem:share:brand',
// 						'menuItem:share:qq',
// 						'menuItem:share:weiboApp',
// 						'menuItem:favorite',
// 						'menuItem:share:facebook',
// 						'menuItem:share:QZone',
// 						'menuItem:editTag',
// 						'menuItem:delete',
// 						'menuItem:readMode'
// 					]
// 				});

// 				wx.updateTimelineShareData({
// 					title: '5月2日免疫放疗研究探索峰会',
// 					link: Config.baseUrl+'/customer/getAuthorize',
// 					imgUrl: 'http://0713.rsproject.cn/xinda/public/xinda/logo.png',
// 					success: function () {
// 						// 设置成功
// 						//alert('link: http://0713.rsproject.cn/'+"\r\n<br>"+'image url: http://0713.rsproject.cn/images/logo1.png');
// 					}
// 				});
// 				wx.updateAppMessageShareData({
// 					title: '5月2日免疫放疗研究探索峰会',
//                     desc: '邀您一同解码免疫放疗联合奥义，预览5月2日线上峰会待展示IIS/IIT 研究，完成拼图游戏有彩蛋哦~',
// 					link: Config.baseUrl+'/customer/getAuthorize',
// 					imgUrl: 'http://0713.rsproject.cn/xinda/public/xinda/logo.png',
// 					success: function () {
// 						// 设置成功
// 						//alert('link: http://0713.rsproject.cn/'+"\r\n<br>"+'image url: http://0713.rsproject.cn/images/logo1.png');
// 					}
//                 });
//             });
//             wx.error(function (res) {
//                 alert("出错了：" + res.errMsg);
//             });
// 		}
// 	})
// }