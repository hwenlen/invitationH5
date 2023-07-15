$(function () {
    // 播放视频
    var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    var Video = document.getElementById('video');
    
    document.addEventListener("WeixinJSBridgeReady", function() {
        if(isiOS){
            $(".video-poster").trigger("click");
        }
    }, false);
    
    $(".video-poster").click(function(){
        videoPlay()
    })
    
    function videoPlay(){
        Video.style.display = 'block';
        $(".video-poster").hide();
        Video.play();
    }
    
    /*寄语滚动*/
    var sendWord = function(){
        var sendWordWidth = 0;
        
        for(var i=0; i<$(".see-word-box ul li").length; i++){
            sendWordWidth += $(".see-word-box ul li").eq(i).width()+40
        }
        
        $(".see-word-box ul").css({
            width: sendWordWidth
        });
        
        $(".see-word-box ul").stop().animate({
            left: -sendWordWidth,
        }, sendWordWidth*1000/50, 'linear', function () {
            $(".see-word-box ul").css({
                left: 400
            })
            sendWord();
        })
        
    }
    // sendWord();
    
    /*飞机动画*/
    var aircraftFly = function(){
        $(".aircraft").stop().animate({
            top: 441,
            right: 80
        }, 8000, 'linear', function () {
            $('.aircraft .text').addClass('show')
            setTimeout(function(){
                $('.aircraft .text').removeClass('show');
                $(".aircraft").stop().animate({
                    top: 668,
                    right: -225
                }, 2500, 'linear', function () {
                    $(".aircraft").css({
                        top: -215,
                        right: 750
                    })
                    aircraftFly();
                })
            },2500)
        })
    }
    aircraftFly();
    
    /*禁止弹窗滑动*/
    $(".popup").on('touchmove',function(ev){
        ev.preventDefault();
    });
    
    /*发送寄语*/
    $("#toSendWord").click(function(){
        $(".send-word-box").fadeIn();
    });
    $("#sendWordSubmit").click(function(){
        if($("#sendWordText").val() == ''){
            alert('请输入您的祝福');
            return;
        }
        var text = '<li>'+$("#sendWordText").val()+'</li>';
        $(text).appendTo(".see-word-box ul");
        
        alert('发布成功');
        $("#sendWordText").val('');
        $(".send-word-box").fadeOut();
        //重新计算长度
        sendWord();
    })
    /*查看日程*/
    $("#seeSchedule").click(function(){
        $(".schedule-box").fadeIn();
    });
    
    /*关闭弹窗 日程、寄语*/
    $(".popup .close").click(function(){
        $(this).parents('.popup').fadeOut();
    });
    
    

})