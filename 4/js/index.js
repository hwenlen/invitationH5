$(function () {
     
    //判断滑动方向
    function getTouch(moveMain,toRight,toLeft) {
        //滑动处理
        var  startY, EndY, Y;
        moveMain.on('touchstart', function (e) {
            startY = e.originalEvent.targetTouches[0].pageY;
        });

        moveMain.on('touchend', function (e) {
            EndY = e.originalEvent.changedTouches[0].pageY;
            Y = EndY - startY;
            
            if (Y < 0) {
                toRight();
            } 
            if(Y > 0){
                toLeft && toLeft();
            }
            
        });

    }
    //重新播放gif图
    function gifRepaly(obj){
        var lnkSrc = obj.attr('src');
        obj.attr('src',lnkSrc);
    }
    
    //初始化
    function init(){
        //执行加载动画
        loading();
    }
//    init();
    
    //音乐播放
    function audioPlay(){
        var Bgm = document.getElementById('bgm');
        
        document.addEventListener("WeixinJSBridgeReady", function () {
            Bgm.play();
        }, false);
        bgm.addEventListener("play", function () {
            init();
        }, false);
    }
    audioPlay();
    
    
    var pageSwiper = new Swiper('.page-conteiner', {
        direction: 'vertical',
        followFinger: false,
        on:{
            //用来做延迟切换
//            touchStart: function(ev){
//                SY = ev.touches[0].pageY;
//                pageSwiper.allowSlideNext = false;
//            },
//            touchEnd: function(ev){
//                console.log(ev)
//                EY = ev.changedTouches[0].pageY;
//                
//                if(EY - SY < 0){
//                    console.log('向下')
//                }
//                
//                setTimeout(function(){
//                    pageSwiper.allowSlideNext = true;
////                    pageSwiper.slideNext(0)
//                },2000)
//            },
            slideChangeTransitionStart: function() {
                $('.swiper-slide .hints').removeClass('active');
                $('.swiper-slide .lnk').css('opacity',0);
                if(this.activeIndex == 1){
                    animateIndexInit();
                    animateIndexEnter()
                }
                if(this.activeIndex == 2){
                    animateOne();
                }
                if(this.activeIndex == 3){
                    animateTwo();
                }
                if(this.activeIndex == 4){
                    animateThree();
                }
                if(this.activeIndex == 5){
                    animateLast();
                }
                //最后一页停止滑动效果
                this.activeIndex == 5?this.allowSlideNext = false: this.allowSlideNext = true;
            }
        }
    });
    //首页向右滑动后执行动画
    getTouch($('#firstPage'),function(){
        animateIndexLeave();
    });
    
    //loading
    function loading(){
        var imgList = [];
        $('img').each(function(index,item){
            imgList.push($(item).attr('src'));
        })
        imgNum = imgList.length;
        for (var i = 0; i < imgList.length; i++) {
           var loadImg = new Image();
           loadImg.src = imgList[i];
           loadImg.onload = function(){
               imgNum--;
               $('#loadText').html(parseInt((imgList.length - imgNum) / imgList.length * 100) + '%')
               if (imgNum <= 0) {
                   $('.load-main').hide();
                   gifRepaly($('.loading-end img'));
                   $('.loading-end').addClass('active');
                   setTimeout(function(){
                     $('.loading-end').addClass('hide');
                   },2500)
                   setTimeout(function(){
                       pageSwiper.slideNext(0);
                   },5600)
               }
           }
        }
    }
    
    
    //首页动画初始化
    function animateIndexInit(){
        $('.index-slide .letter').css('opacity',0);
        $('.index-slide .text-bg').css({
            'opacity': 0,
            'animationName': ''
        });
        $('.index-slide .text-wrap').css({
            'animationName': ''
        });
        $('.index-slide .text-img').css({
            'opacity': 0,
            'animationName': ''
        })
        $('.index-slide .big-title').css({
            'animationName': ''
        })
        $('.index-slide .letter').removeClass('active');
    }
    //进入首页动画
    function animateIndexEnter(){
        var DelayTime = 0; //延迟时间
        $('.index-slide .text-wrap').each(function(index,item){
            DelayTime = index*2;
            $(this).find('.text-img').each(function(j,el){
                var ed = DelayTime+0.3*j
                
                
                if(j == 0){
                    $(this).parent().siblings('.text-bg').css({
                        'animationName': 'opacityIn',
                        'animationDelay': (ed)+'s',
                    })
                }
                $(el).css({
                    'animationName': 'opacityIn',
                    'animationDelay': (DelayTime+0.3*j+0.6)+'s',
                });
            }) 
        });
        
        DelayTime += 2.6;
        
        $('.index-slide .letter').css({
            'animationDelay': DelayTime+'s',
        })
        
        DelayTime += 0.6;
        setTimeout(function(){
            $('.index-slide .hints').addClass('active');
        },DelayTime*1000);
    }
    
    //离开首页动画
    function animateIndexLeave(){
        var DelayTime = 0; //延迟时间
            //文字动画
        $('.index-slide .text-bg').css('opacity',1);
        $('.index-slide .letter').css('opacity',1);
        $('.index-slide .text-img').css({
            'opacity': 1,
            'animationName': ''
        })
        
        $('.index-slide .text-wrap').each(function(index,item){
            $(item).css({
                'animationName': 'opacityOut',
                'animationDelay': (0.3*index)+'s',
            })
        });
        
        DelayTime += (0.3*$('.index-slide .text-wrap').length);
        
        //字母动画
        setTimeout(function(){
            $('.index-slide .letter').addClass('active');
        },DelayTime*1000);
        
        DelayTime += 1.8;
        
        $('.index-slide .big-title').css({
            'animationName': 'opacityIn',
            'animationDelay': DelayTime+'s',
        });
        
        DelayTime += 1.4;
        setTimeout(function(){
            pageSwiper.slideTo(2,0);
            animateIndexInit(); //离开后初始化
        },DelayTime*1000);
    }
    
    //第一页动画
    function animateOne(){
        var DelayTime = 0; //延迟时间
        gifRepaly($('.one-slide .start img'));
        
        DelayTime += 1.5;
        
        $('.one-slide .start').css({
            'animationDelay': DelayTime+'s',
        });
        
        $('.one-slide .city').css({
            'animationDelay': '0s',
        });
        
        DelayTime += 0.6;
        //侧面墨水出现
        setTimeout(function(){
            gifRepaly($('.one-slide .lnk img'));
            $('.one-slide .lnk').css('opacity',1);
        },DelayTime*1000)
        
        DelayTime += 0.6;
        //文字
        $('.one-slide .text-hd').css({
            'animationDelay': DelayTime+'s',
        });
        
        DelayTime += 0.8;
        
        $('.one-slide .text-box img').each(function(index,item){
            
            var Length = $('.one-slide .text-box img').length;
            DelayTime = 0.65*index+3.4;
            $(item).css({
                'animationDelay': (0.65*(Length-index)+3.4)+'s',
            })
        })
        
        DelayTime += 0.5;
        $('.one-slide .imprint').css({
            'animationDelay': DelayTime+'s',
        });
        DelayTime += 1.1;
        setTimeout(function(){
            $('.one-slide .hints').addClass('active');
        },DelayTime*1000);
    };
    
    //第二页动画
    function animateTwo(){
        var DelayTime = 0; //延迟时间
        gifRepaly($('.two-slide .start img'));
        
        DelayTime += 1.5;
        
        $('.two-slide .start').css({
            'animationDelay': DelayTime+'s',
        });
        
        //侧面墨水出现
        setTimeout(function(){
            gifRepaly($('.two-slide .lnk img'));
            $('.two-slide .lnk').css('opacity',1);
        },DelayTime*1000)

        var DelayTime = 2;
        $('.two-slide .title').css({
            'animationDelay': DelayTime+'s',
        });
        DelayTime += 0.9;

        $('.two-slide .schedule img').each(function(index,item){
            DelayTime = index*0.6+4;
            $(item).css({
                'animationDelay': (index*0.6+4)+'s',
            });
        });
        DelayTime += 0.5;
        $('.two-slide .imprint').css({
            'animationDelay': DelayTime+'s',
        });
        DelayTime += 1.4;
        
        setTimeout(function(){
            $('.two-slide .hints').addClass('active');
        },DelayTime*1000);
    };
    
    //第三页动画
    function animateThree(){
        var DelayTime = 0; //延迟时间
        gifRepaly($('.three-slide .start img'));
        
        DelayTime = 1.5;
        
        $('.three-slide .start').css({
            'animationDelay': DelayTime+'s',
        });
        
        $('.three-slide .imprint .inner').css({
            'animationDelay': DelayTime+'s',
        });
        DelayTime += 0.6;
        $('.three-slide .map').css({
            'animationDelay': DelayTime+'s',
        });
        
        $('.three-slide .text img').each(function(index,item){
            DelayTime = index*0.5+2.8;
            $(item).css({
                'animationDelay': (index*0.5+2.8)+'s',
            });
        });
        
        $('.three-slide .title').css({
            'animationDelay': DelayTime+'s',
        });
        DelayTime += 1.2;
        setTimeout(function(){
            $('.three-slide .hints').addClass('active');
        },DelayTime*1000);
    };
    
    //末页动画
    function animateLast(){
        var DelayTime = 0.6;
        $('.last-slide .imprint.two').css({
            'animationDelay': DelayTime+'s',
        });
        DelayTime += 0.5;
        
        $('.last-slide .imprint.three .inner').css({
            'animationDelay': DelayTime+'s',
        });
        DelayTime += 1;
        
        $('.last-slide .title').css({
            'animationDelay': DelayTime+'s',
        });
        DelayTime += 0.5;
        $('.last-slide .logo').css({
            'animationDelay': DelayTime+'s',
        });
    };
      
})
