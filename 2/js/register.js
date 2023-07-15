$(function(){
    /*
      解决ios下不回弹的问题
    */
    var inputScorll = function(Input,inputBox){
        //判断是否是ios
        var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        // var firstWinHeight = $(window).height();

        // Input.focus(function () {
        //     if (!isiOS) {
        //         var thisInputIndex = $(this).parents('.form-item').index() + 1;
        //         inputBox.css('top', -thisInputIndex*50 + 'px');
        //     }
        // });

        Input.blur(function () {
            if (!isiOS) {
                inputBox.css('top', 0);
            } else {
                window.scroll(0, 0);
            }
        });

        $(window).resize(function () {
            if ($(window).height() == firstWinHeight && !isiOS) {
                Input.blur();
            }
        });
    }
    inputScorll($(".form-control"),$(".form"));
    
    //注册
    $("#submit").click(function(){
        var Name = $("#name").val(),
            Phone = $("#phone").val(),
            Company = $("#company").val(),
            openID = Common.getUrlParam('openid'),
            phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        
        if(!Name || !Phone || !Company){
           alert('请输入完整信息');
           return;
        }
        
        if (!mobileReg.test(Phone)) {
            alert('请输入正确手机号');
            return;
        }
        
        $.ajax({
            url: BaseURL + '/customer/register',
            type : "POST",
            data: {
                name: Name,
                phone: Phone,
                openid: openID,
                company: Company,
            },  
            success:function(res){
                if(res.code = 200){
                    window.location.href = 'index.html?openid='+openID;
                }
            }
        });
    })
    
    
})