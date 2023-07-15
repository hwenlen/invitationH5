$(function () {
    //判断是否登记过了
    $.ajax({
        url: 'http://0713.rsproject.cn/galderma-puzzle/ajax/web-is-registered',
        type: "POST",
        data: {},
        success: function (res) {
            if (res.code == 200) {
                //如果登记过了，跳过登记页面
                $('.register-slide').remove();
            }
            
            if (res.code != 200 && res.code != 201) {
                //如果登记过了，跳过登记页面
                $(".dialog-text").html(res.msg);
                $("#dialog").fadeIn();
            }
        }
    });

    /*
      用于微信ios加载音乐
    */
    wx.config({
        // 配置信息, 即使不正确也能使用 wx.ready
        debug: false,
        appId: '',
        timestamp: 1,
        nonceStr: '',
        signature: '',
        jsApiList: []
    });
    
    
    //获取url参数
    function getUrlParam(name){
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = window.location.search.substr(1).match(reg);
        if (r !== null) return unescape(r[2]);
        return null;
    };
    
    //是否是主页跳进来的
    var HomeEnter = getUrlParam("home");
    if(HomeEnter == 1 || HomeEnter == '1'){
        $(".back").show();
        $(".audio-btn").addClass("have-back");
        
    }
    
    /*
      返回主页
    */
    $(".back").click(function(){
        location.replace("http://0713.rsproject.cn/galderma-puzzle/site/home");
    })
    

    //判断是否是ios
    var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    /*
      背景音乐
    */
    var BGM = document.getElementById('bgMusic');
    BGM.addEventListener("play", function () {
        //音乐播放后再关闭loading,解决音乐延迟的问题，ios延时
        if (isiOS) {
            setTimeout(function () {
                $('#loading').hide();
            }, 1300)
        } else {
            $('#loading').hide();
        }
        $('#btn-play').show();
    }, false);

    $('#btn-play').click(function () {
        BGM.pause();
        $('#btn-pause').show();
        $(this).hide();
    });
    $('#btn-pause').click(function () {
        BGM.play();
        $('#btn-play').show();
        $(this).hide();
    });
    /*
      loading
    */
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
                        BGM.play();
                    });
                }
            }
        }
    }
    loading(); //加载图片


    /*
      解决输入框被键盘挡住的问题
    */
    var firstWinHeight = $(window).height();

    $(".form-control").focus(function () {
        if (!isiOS) {
            var thisInputIndex = $(this).parents('.form-item').index() + 1;
            $(".register-slide .page-main").css('top', -thisInputIndex + 'rem');
        }
    });

    $(".form-control").blur(function () {
        if (!isiOS) {
            $(".register-slide .page-main").css('top', 0);
        } else {
            window.scroll(0, 0);
        }
    });

    $(window).resize(function () {
        if ($(window).height() == firstWinHeight && !isiOS) {
            $(".form-control").blur();
        }
    });

    /*
      视频
    */
    var Video1 = document.getElementById('video1');

    $("#videoContent1").click(function () {
        if (Video1.paused) {
            Video1.play();
        } else {
            Video1.pause();
        }
    });
    //解决滑动时视频有视差,暂停就让视频none,ios视频播放的时候音乐没有关
    Video1.onpause = function () {
        BGM.play();
        Video1.style.display = "none";
        $('#videoContent1 .video-poster').show();
    };
    Video1.onplay = function () {
        BGM.pause();
        Video1.style.display = "block";
        $('#videoContent1 .video-poster').hide();
    };

    /*
      邀请函文字内容滚动
    */
    var swiper = new Swiper('.invit-container', {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        mousewheel: true,
        roundLengths: true, //防止文字模糊
    });

    /*
      全局swiper布局
    */
    var pageSwiper = new Swiper('.page-conteiner', {
        direction: 'vertical',
        speed: 400,
        followFinger: false,
        on: {
            touchStart: function () {
                //表单页禁止下滑
                if (this.activeIndex == 5) {
                    pageSwiper.allowSlideNext = false;
                } else {
                    pageSwiper.allowSlideNext = true;
                }
            },
            slideChangeTransitionStart: function () {
                //首页顶部没有logo，背景没有内阴影
                if (this.activeIndex != 0) {
                    $(".header").fadeIn(400);
                    $(".wrap-bg").css({
                        'boxShadow': '0 0 1.5rem inset #000'
                    });
                } else {
                    $(".header").fadeOut(400);
                    $(".wrap-bg").css({
                        'boxShadow': 'none'
                    });
                }

                //背景动画大小
                if (this.activeIndex == 0) {
                    $("#bgImg,#roundAnimate,#bgShade").css({
                        'left': '0',
                        'transform': 'scale(1.86)',
                        'opacity': 1
                    });
                } else if (this.activeIndex == 1 || this.activeIndex == 4) {
                    $("#bgImg,#roundAnimate").css({
                        'left': '2.6rem',
                        'transform': 'scale(3.8)',
                        'opacity': 0.3
                    });
                    $("#bgShade").css({
                        'left': '2.6rem',
                        'transform': 'scale(3.8)',
                        'opacity': 0.8
                    });
                } else {
                    $("#bgImg,#roundAnimate,#bgShade").css({
                        'left': '0',
                        'transform': 'scale(1.4)',
                        'opacity': 1
                    });
                }

                //最后一页没有下滑箭头
                if (this.activeIndex == 6 || this.activeIndex == 5) {
                    $(".down").hide();
                } else {
                    $(".down").fadeIn(400);
                }

                //翻页就停止播放
                if (this.activeIndex != 1) {
                    Video1.pause();
                }
            }
        }
    });

    /*
      登记
    */
    $("#submitBtn").click(function () {
        var Name = $("#name").val();
        var Mobile = $("#mobile").val();
        var mobileReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;

        if (!Name || !Mobile || !mobileReg.test(Mobile)) {
            $(".dialog-text").html('您的输入有误');
            $("#dialog").fadeIn();
            return;
        }

        $.ajax({
            url: 'http://0713.rsproject.cn/galderma-puzzle/ajax/web-login',
            type: "POST",
            data: {
                name: Name,
                phone: Mobile
            },
            success: function (res) {
                if (res.code == 200) {
                    //下滑
                    pageSwiper.slideNext();
                    $('.register-slide').remove();
                } else {
                    $(".dialog-text").html(res.msg);
                    $("#dialog").fadeIn();
                }
            }
        });



    });

    /*
      关闭弹窗
    */
    $(".dialog-btn").click(function () {
        $("#dialog").fadeOut();
    });


    /*
      地址地图
    */
    var marker;
    var map = new AMap.Map("mapContainer", {
        resizeEnable: true,
        zoom: 17,
        center: [121.412557, 31.231906]
    });
    addMarker();

    function addMarker() {
        if (marker) {
            return;
        }
        marker = new AMap.Marker({
            icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            position: [121.412557, 31.231906]
        });
        marker.setMap(map);
    }

    /*
      会议
    */
    $(".table-td").click(function () {
        $(".table-td").removeClass("open");
        $(this).addClass("open");
    });

})