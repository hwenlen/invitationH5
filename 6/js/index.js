$(function () {
    wx.config({
        debug: false,
        appId: '',
        timestamp: '',
        nonceStr: '',
        signature: '',
        jsApiList: []
    });
    
    var AudioWX = document.getElementById('wxAudio');
    var AudioTrain = document.getElementById('trainAudio');
    var BGM = document.getElementById('bgm');
    var AudioFire = document.getElementById('fireworksAudio');
    var AudioFireCount = 1; //烟花播放执行一次
    
    //判断是否是企业微信
    var userAgent = window.navigator.userAgent.indexOf('wxwork');
    //判断是否是ios
    var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
//    var USERID = "ZhangHuiHui";
    var USERID = Common.getUrlParam("userId");
    //触发发红包接口
    function record(Func) {
        $.ajax({
            url: baseURL + '/Service/Btn.ashx',
            type: "POST",
            data: {
                appId: "WechatMiniSite",
                appSecret: "20200108",
                func: Func,
                userId: USERID
            },
            success: function (res) {}
        });
    }
    
    //点击事件
    $("#btnAndroid").click(function () {
        var URL = "https://wecliententqa.smith-nephew.com.cn/RedPacket/Download/SmithNephew.apk";
        
        if (!isiOS) {
            
            if(userAgent == -1){
                alert('页面将自动跳转到下载地址，若没有跳转，下载链接已被复制，请在浏览器中打开！');
                record("BtnByAndroid");
                var clipboard = new Clipboard('#btnAndroid', {
                    text: function () {
                        return URL;
                    }
                });

                clipboard.on('success', function (e) {
                    
                });
                location.href = URL;
            } else {
                record("BtnByAndroid");
                location.href = URL;
            }          
        }
    })

    $("#btnApple").click(function () {
        var URL = "https://apps.apple.com/cn/app/saba-cloud/id552859885";
        if(isiOS){
            record("BtnByIOS");
            if(userAgent != -1) {
                var clipboard2 = new Clipboard('#btnApple', {
                    text: function () {
                        return "https://apps.apple.com/cn/app/saba-cloud/id552859885";
                    }
                });

                clipboard2.on('success', function (e) {
                    alert("下载链接复制成功,可前往浏览器下载")
                });
            } else {
                location.href = URL;
            }
        }
    });
    
    /*
      loading
    */
    
    loading();
    function loading() {
        var imgList = [];
        $('img').each(function (index, item) {
            imgList.push($(item).attr('src'));
        })
        imgNum = imgList.length;
        for (var i = 0; i < imgList.length; i++) {
            var loadImg = new Image();
            loadImg.src = imgList[i];
            loadImg.onload = function () {
                imgNum--;
                if (imgNum <= 0) {
                    //正式上传前注释
//                    $('#loading').hide();
                    wx.ready(function () {
                        AudioWX.play();
                        //先开后关，兼容ios
                        AudioTrain.play();
                        AudioFire.play();
                        BGM.play();
                        AudioTrain.pause();
                        AudioFire.pause();
                        BGM.pause();
                    });
                }
            }
        }
    }

    /*
      loading关闭 加载动画
    */
    var initNum = 1; //避免init()加载多次
    
    AudioWX.addEventListener("play", function () {
        if(initNum == 1){
            $('#loading').hide();
            setTimeout(function(){
                init();
            },500)
        }
        initNum++;
    }, false);
    
    
//    init();
    function init() {
        $(".dialog-box .dialog").each(function (index, item) {
            setTimeout(function () {
                $(item).addClass('active');
                AudioWX.play();
                if (index == 6) {
                    setTimeout(function(){
                        $(".hand,.before-shade").fadeIn();
                    },1600);
                }
            }, 1000 * index);
        })
    }
    
    

    /*
      点击跳转
    */
    $("#toStart").click(function () {
        $('.start-shade').fadeIn(800, function () {
            $('.dialog-box').hide();
            $('.main').show();
            $('.main').addClass('ani-start')
            $('.start-shade').fadeOut(800, function () {
                page1Ani();
            });
        });
        AudioTrain.play();
    });

    /*
      开场动画
    */
    $('#wrap').on('touchmove',function(event){event.preventDefault();});
    function page1Ani() {
        $('.down-arrow').show();
        $('.p1-car').removeClass('before')
        $('.p1-shout,.p1-phone').removeClass('animated');
        $('.p1-text').addClass('active');
        
        setTimeout(function(){
            $('.p1-text').removeClass('animated active');
        },2600)
        
        setTimeout(function () {
            
            $('.p1-phone').css({
                'animation': 'fadeOut 0.8s forwards'
            });
            
            $('.p1-shout,.p1-text').css({
                'animation': 'fadeOut 0.8s 0.8s forwards'
            });
            
            setTimeout(function(){
                $('.p1-car').addClass('after');
            },1600)
        }, 4200);
    }
    
    /*
      删除上面元素，防止快速滚动BUG
    */
    function page1Hide() {
        AudioTrain.pause();
        BGM.play();
    }
    function page2Hide() {
        $('.p2-car,.p2-people,.p2-shout,.p2-text,.p2-sun,.p2-moon').remove();
    }

    function page3Hide() {
        $('.p3-car,.p3-people,.p3-shout,.p3-text').remove();
    }

    function page4Hide() {
        $('.p4-car,.p4-people,.p4-shout,.p4-text').remove();
    }

    function page5Hide() {
        $('.p5-car,.p5-people,.p5-shout,.p5-text').remove();
    }

    function page6Hide() {
        $('.p6-car,.p6-people,.p6-shout').remove();
    }

    function page7Hide() {
        $('.p7-car,.p7-people,.p7-shout,.p7-text,.p7-rise1,.p7-rise2').remove();
    }

    $(window).scroll(function () {
        var scrollT = $(window).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(window).height();
        
        movers(scrollT);
        //到最底部了
        if (scrollT >9000) {
            $(".down-arrow").hide();
        }
    });
    
    
    var touchDownCount = 0;
    Common.getTouch(function(){
        if(!$('.main').hasClass('ani-start')) return;
        touchDownCount += 1;
        if(touchDownCount >= 8){
            touchDownCount = 8;
        }
        $('html,body').stop().animate({
            scrollTop: touchDownCount * 1334
        },900);
    });
    

    /*
      下滑执行的动画
    */
    function movers(scrollTop) {
        console.log(scrollTop)
        //page2
        if (scrollTop >= 1300 && scrollTop < 2668) {
            if(BGM.paused){
                page1Hide();
            }
        }
        if (scrollTop >= 1300) {
            
            $('.p2-people').removeClass('before');
            $('.p2-people,.p2-shout,.p2-sun,.p2-moon,.p2-text').removeClass('animated');

            setTimeout(function () {
                $('.p2-people').addClass('geton');
                $('.p2-car').removeClass('before');
            }, 2000);
            
            setTimeout(function(){
                $('.p2-sun,.p2-moon').css({
                    'animation': 'fadeOut 0.6s forwards'
                });
                
                $('.p2-shout,.p2-text').css({
                    'animation': 'fadeOut 0.6s 0.6s forwards'
                });
                
                $('.p2-people').css({
                    'animation': 'getOnCar 0.9s 1.2s forwards'
                });

                setTimeout(function () {
                    $('.p2-car-people').fadeIn(500, function () {
                        $('.p2-car').addClass('after');
                    });
                }, 2100);
            },4200)
        }

        //page3
        if (scrollTop >= 2600) {
            page2Hide();
            $('.p3-people').removeClass('before');
            
            $('.p3-people,.p3-shout,.p3-text').removeClass('animated');
            setTimeout(function () {
                $('.p3-people').addClass('geton');
                $('.p3-car').removeClass('before');
            }, 1200);
            
            setTimeout(function(){
                $('.p3-shout,.p3-text').css({
                    'animation': 'fadeOut 0.6s forwards'
                });
                $('.p3-people').css({
                    'animation': 'getOnCar 0.9s 0.6s forwards'
                });

                setTimeout(function () {
                    $('.p3-car-people').fadeIn(500, function () {
                        $('.p3-car').addClass('after');
                    });
                }, 1500)
            },3200)
        }
        

        //page4
        if (scrollTop >= 4000) {
            page3Hide();
            $('.p4-people').removeClass('before');
            
            $('.p4-people,.p4-shout,.p4-text').removeClass('animated');
            
            setTimeout(function () {
                $('.p4-people').addClass('geton');
                $('.p4-car').removeClass('before');
            }, 1200);
            
            setTimeout(function(){
                $('.p4-shout,.p4-text').css({
                    'animation': 'fadeOut 0.6s forwards'
                });
                $('.p4-people').css({
                    'animation': 'getOnCar 0.9s 0.6s forwards'
                });

                setTimeout(function () {
                    $('.p4-car-people').fadeIn(500, function () {
                        $('.p4-car').addClass('after');
                    });
                }, 1400)
            },3200)
        }

        //page5
        if (scrollTop >= 5300) {
            page4Hide();
            $('.p5-people').removeClass('before');
            
            $('.p5-people,.p5-shout,.p5-text').removeClass('animated');
            
            setTimeout(function () {
                $('.p5-people').addClass('geton');
                $('.p5-car').removeClass('before');
            }, 1200);
            
            setTimeout(function(){
                $('.p5-shout,.p5-text').css({
                    'animation': 'fadeOut 0.6s forwards'
                });
                $('.p5-people').css({
                    'animation': 'getOnCar 0.9s 0.6s forwards'
                });

                setTimeout(function () {
                    $('.p5-car-people').fadeIn(500, function () {
                        $('.p5-car').addClass('after');
                    });
                }, 1400)
            },3200)
        }
        
        

        //page6
        if (scrollTop >= 6600) {
            page5Hide();
            $('.p6-people').removeClass('before');
            
            $('.p6-people,.p6-shout,.p6-text').removeClass('animated');
            
            setTimeout(function () {
                $('.p6-people').addClass('geton');
                $('.p6-car').removeClass('before');
            }, 1200);
            
            setTimeout(function(){
                $('.p6-shout').css({
                    'animation': 'fadeOut 0.6s forwards'
                });
                $('.p6-people').css({
                    'animation': 'getOnCar 0.9s 0.6s forwards'
                });

                setTimeout(function () {
                    $('.p6-car-people').fadeIn(500, function () {
                        $('.p6-car').addClass('after');
                    });
                }, 1400)
            },3200)
        }

        //page7
        if (scrollTop >= 7950) {
            page6Hide();
            $('.p7-people').removeClass('before');
            
            $('.p7-people,.p7-shout,.p7-text').removeClass('animated');
            $('.p7-rise1,.p7-rise2').css({
                'maxHeight': '101px'
            });
            setTimeout(function () {
                $('.p7-people').addClass('geton');
                $('.p7-car').removeClass('before');
            }, 1800);
            
            setTimeout(function(){
                $('.p7-shout,.p7-text,.p7-rise1,.p7-rise2').css({
                    'animation': 'fadeOut 0.6s forwards'
                });
                $('.p7-people').css({
                    'animation': 'getOnCar 0.9s 0.6s forwards'
                });

                setTimeout(function () {
                    $('.p7-text,.p7-people').hide();
                    $('.p7-car-people').fadeIn(500, function () {
                        $('.p7-car').addClass('after');
                    });
                }, 1400)
            },3800)
        }

        //page8
        if (scrollTop >= 9000) {
            page7Hide();
            $('.p8-clock').removeClass('animated');
            setTimeout(function () {
                $('.p8-car,.p8-crowd1,.p8-crowd2').removeClass('before');
            }, 400);
            
            setTimeout(function () {
                $('.p8-shout,.p8-text').removeClass('animated');
            }, 2400);
            
            setTimeout(function () {
                $('.p8-shout2,.p8-shout3').removeClass('animated');
            }, 2800);

            setTimeout(function () {
                $('.p8-fireworks1,.p8-fireworks2').removeClass('animated');
                if(AudioFireCount == 1){
                    BGM.pause()
                    AudioFire.play();
                }
                AudioFireCount = 2;
            }, 3200)
        }
    }


})