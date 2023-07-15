$(function () {
    var speakersData = [
        {head: 'images/speakers/head-1.png',name: '吴爱勤&nbsp;教授'},
        {head: 'images/speakers/head-2.png',name: '袁勇贵&nbsp;教授'},
        {head: 'images/speakers/head-3.png',name: '沈鑫华&nbsp;教授'},
        {head: 'images/speakers/head-4.png',name: '侯鉴君&nbsp;主任'},
        {head: 'images/speakers/head-5.png',name: '王铭维&nbsp;教授'},
        {head: 'images/speakers/head-6.png',name: '姜荣环&nbsp;教授'},
        {head: 'images/speakers/head-7.png',name: '陈&nbsp;&nbsp;炜&nbsp;教授'},
        {head: 'images/speakers/head-8.png',name: '贺丹军&nbsp;教授'},
        {head: 'images/speakers/head-9.png',name: '毛家亮&nbsp;教授'},
        {head: 'images/speakers/head-10.png',name: '区永康&nbsp;教授'},
        {head: 'images/speakers/head-11.png',name: '熊小强&nbsp;教授'},
        {head: 'images/speakers/head-12.png',name: '查定军&nbsp;教授'},
        {head: 'images/speakers/head-13.png',name: '苏慧敏&nbsp;教授'},
        {head: 'images/speakers/head-14.png',name: '王&nbsp;&nbsp;璟&nbsp;教授'},
        {head: 'images/speakers/head-15.png',name: '况&nbsp;&nbsp;利&nbsp;教授'},
    ];
    
    speakersData.forEach(function(item,index){
        var spearkerHTML = '<li data-index="'+(index+6)+'">'
                            +'<div class="head-img">'
                                +'<img src="'+item.head+'" alt="">'
                            +'</div>'
                            +'<p>'+item.name+'</p>'
                        +'</li>';
        
        $(".speaker-list").append(spearkerHTML);
    })
    
    /*
        全局swiper布局
    */
    var pageSwiper = new Swiper('.page-conteiner', {
        direction: 'vertical',
        noSwiping: true,
        on: {
            touchStart: function () {
                if (this.activeIndex == 5) {
                    this.allowSlideNext = false;
                } else {
                    this.allowSlideNext = true;
                }
            },
            slideChangeTransitionStart: function () {
                if (this.activeIndex > 0 && this.activeIndex < 6) {
                    $(".bg-wrap .bg1").show().siblings().hide();
                } 
                if(this.activeIndex >= 6){
                    $(".bg-wrap .bg2").show().siblings().hide();
                }
            },
            slideChangeTransitionEnd: function () {
                var This = this;
                if(this.activeIndex == 1){
                    // 首页动画
                    setTimeout(function(){
                        $(".index-slide .bg-balloon1").css({
                            animation: 'bgBalloonFly2 7s linear infinite'
                        })
                        $(".index-slide .bg-balloon2").css({
                            animation: 'bgBalloonFly 8s linear infinite'
                        })
                    },3000)
                    setTimeout(function(){
                        $(".index-slide .balloon-box").css({
                            animation: 'bigBalloonFly 20s linear infinite'
                        })
                        $(".index-slide .shou").css({
                            animation: 'shou 1.36s linear infinite'
                        })
                    },3600)
                }
                // 跳到讲者详情页的时候自动截图
                if(this.activeIndex >= 6){
                    $(".bg-wrap .bg2").show().siblings().hide();
                    $("#back").show();
                    $(".page-conteiner .swiper-wrapper").css({
                        transform: 'translate3d(0px, 0px, 0px)'
                    });

                    $(".page-conteiner .swiper-slide-active").show().siblings().hide();
                    playbill();
                } else {
                    $("#back").hide();
                }
            }
        }
    });
    
    /*
      背景音乐
    */
    var isFirst = true;
    var BGM = document.getElementById('bgMusic');
    BGM.addEventListener("play", function () {
        if(isFirst){
            $('#btn-play').show();
            pageSwiper.slideTo(1,0);
            isFirst = false;
        }
    }, false);

    $('#btn-play').click(function () {
        BGM.pause();
        $(this).hide();
        $('#btn-pause').show();
    });
    $('#btn-pause').click(function () {
        BGM.play();
        $(this).hide();
        $('#btn-play').show();
    });
    
    var videoPlay = function(){
        document.addEventListener("WeixinJSBridgeReady", function () {
            BGM.play();
        }, false);
    }
    
    var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
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
                // ios和安卓图片加载机制不同
                if(!isiOS){
                    $('#progress .bar').css({
                        'right': 100-parseInt((imgList.length - imgNum) / imgList.length * 100) + '%'
                    });
                    if (imgNum <= 0) {
                        videoPlay();
                    }
                } else {
                    if (imgNum <= 0) {
                        //图片加载完后跳到首页
                        $('#progress .bar').css({
                            'right': '0'
                        });
                        videoPlay();
                    }
                }
                // 上线时注释
                //pageSwiper.slideTo(4,0);
            }
        }
    }
    loading();
    
    // 点击首页邀请函
    $(".index-slide .notice").click(function(){
        pageSwiper.slideTo(2,0);
    });
    // 点击列表跳转
    $(".speaker-list li").click(function(){
        var slideIndex = $(this).data('index');
        if(!slideIndex) return;
        pageSwiper.slideTo(slideIndex,0);
    })
    
    // 返回列表页
    $("#back").click(function(){
        // 将原本隐藏的其他页面回复
        $(".page-conteiner .swiper-slide").show();
        $("#downImg").hide();
        pageSwiper.slideTo(4,0);
    });
    
    // 截图
    function playbill() {
        var shareContent = document.getElementById('playbill'),//需要截图的包裹的（原生的）DOM 对象
            width = shareContent.clientWidth, //获取dom 宽度
            height = shareContent.clientHeight, //获取dom 高度
            canvas = document.createElement("canvas"), //创建一个canvas节点
            scale = 2; //定义任意放大倍数 支持小数
        canvas.width = width * scale; //定义canvas 宽度 * 缩放
        canvas.height = height * scale; //定义canvas高度 *缩放
        canvas.style.width = shareContent.clientWidth * scale + "px";
        canvas.style.height = shareContent.clientHeight * scale + "px";
        canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
        
        var canvasOption = {
            scale: scale, // 添加的scale 参数
            canvas: canvas, //自定义 canvas
            logging: false, //日志开关，便于查看html2canvas的内部执行流程
            width: width, //dom 原始宽度
            height: height,
            scrollY: 0,
            useCORS: true // 开启跨域配置
        };
        html2canvas(shareContent,canvasOption).then(function(canvas){
            var url = canvas.toDataURL("image/png", 1.0);
            $("#downImg").show();
            $("#downImg").attr('src',url);
        });
    }

})