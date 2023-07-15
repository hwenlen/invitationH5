document.body.addEventListener('touchmove', function (e) {
    e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
}, {
    passive: false
}); //passive 参数不能省略，用来兼容ios和android

$(".popup-box").on('touchmove', function (e) {
    e.preventDefault();
})

document.oncontextmenu=function(e){
    e.preventDefault();
}

var swiper;
var isSwiperInit = false; //是否可以初始化swiper
var touchRatio = 1.2;
var innerWidth = 750; // 可视区宽,已经固定为750
var innerHeight = window.innerHeight; // 可视区高
var BGM = document.getElementById("BGM");
$(function () {
    var isopen = false;
    var aniend = false;

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
                $('.painted-scroll .figure').css({
                    width: (imgList.length - imgNum) / imgList.length * 100 + '%'
                });

                if (imgNum <= 0) {
                    $(".swiper-container").show();
                    init();
                }
            }
        }
    }
    loading();

    // 图片加载完后执行
    function init() {
        $("#loading .img2").show();
        $(".scroll-light").fadeIn();
        // 用于卷轴展开时中间展开的效果
        $(".swiper-container").css({
            'left': "50%",
            "top": "50%",
            "margin": -(innerHeight / 2) + 'px 0 0 ' + (-innerWidth / 2) + 'px'
        });

        isSwiperInit = true;

    }


    $(".painted-scroll,.scroll-light").click(function () {
        if (!isSwiperInit) return;
        $(".main").addClass('page-develop');
        $("#loading").hide();
        // 背景音乐
        $(".audio-btn").show();
        BGM.play();
        setTimeout(function () {
            swiper = new Swiper('.swiper-container', {
                preloadImages: false,
                direction: 'vertical',
                slidesPerView: 'auto',
                freeMode: true,
                freeModeMomentumRatio: 0,
                resistanceRatio: 0,
                touchRatio: touchRatio, //触摸加快
                freeModeMomentumBounce: false,
                updateOnWindowResize: false,
                // freeModeMomentumVelocityRatio:1,
                on: {
                    setTranslate: function (translate) {
                        //自定义事件
                        if (!aniend) {
                            aniamtion(translate)
                        }
                    },
                    touchStart(event) {

                    },
                    touchEnd(event) {

                    }
                },
            });
            aniamteStart();
            isSwiperInit = false;
        }, 2100)
    });
    
    // 开启关闭背景音乐
    $(".audio-btn").click(function () {
        if ($(this).hasClass('play')) {
            BGM.pause();
            $(this).removeClass('play').addClass('pause');
        } else {
            BGM.play();
            $(this).removeClass('pause').addClass('play');
        };
    })

    // 点击留下指纹
    $(".fingerprint-btn").on({
        touchend: function () {
            // fingerprint-show标记弹窗已经弹出来过了
            $(".popup-box").addClass('fingerprint-show').fadeOut(500, function () {
                $(".page-6 .txt,.page-6 .fingerprint").addClass('fade-in');
            });
        }
    })

})

function aniamteStart() {
    $(".page-1 .letter,.page-1 .title").addClass('fade-in');
    setTimeout(function(){
        $('.page-1 .letter .txt').fadeOut(400);
    },1200);
    setTimeout(function(){
        $('.page-1 .letter').addClass('active');
    },1600);
    $(".page-1 .ship").addClass('sail');
    setTimeout(function () {
        $(".aid-kit").fadeIn(800);
    }, 2600)
}
// 药箱轨迹定点left和width
var lAid1 = 175,wAid1 = 90;
var lAid2 = 146,wAid2 = 82;
var lAid3 = 146,wAid3 = 88;
var lAid4 = 317,wAid4 = 111;
var lAid5 = 486,wAid5 = 106;
var lAid6 = 526,wAid6 = 56;
var lAid7 = 520,wAid7 = 90;
var lAid8 = 340,wAid8 = 109;
var lAid9 = 186,wAid9 = 109;
var lAid10 = 186,wAid10 = 105;
var lAid11 = 380,wAid11 = 100;
function aniamtion(y) {
    console.log(y)
    /*
        药箱轨迹动画
        (wAid2-wAid1)/(1590-380) ...    下滑范围内每下滑1px增加或减少的宽度
        (lAid2-lAid1)/(1590-380) ...   下滑范围内每下滑1px增加或减少的left
        (-y-380)    范围内下滑了多少
        +wAid1、+lAid1 ...   加上之前的width和left
    */
    // 344 = 724-380
    if (y < -344 && y > -1590) {
        $(".aid-kit").css({
            width: (wAid2-wAid1)/(1590-380)*(-y-380)+wAid1+'px',
            top: -y+380,
            left: (lAid2-lAid1)/(1590-380)*(-y-380)+lAid1
        });
    }
    if (y < -1590 && y > -2048) {
        $(".aid-kit").css({
            width: (wAid3-wAid2)/(2048-1590)*(-y-1590)+wAid2+'px',
            top: -y+380,
            left: (lAid3-lAid2)/(2048-1590)*(-y-1590)+lAid2
        });
    }
    if (y < -2048 && y > -2580) {
        $(".aid-kit").css({
            width: (wAid4-wAid3)/(2580-2048)*(-y-2048)+wAid3+'px',
            top: -y+380,
            left: (lAid4-lAid3)/(2580-2048)*(-y-2048)+lAid3
        });
    }
    
    if (y < -2580 && y > -2830) {
        $(".aid-kit").css({
            width: (wAid5-wAid4)/(2830-2580)*(-y-2580)+wAid4+'px',
            top: -y+380,
            left: (lAid5-lAid4)/(2830-2580)*(-y-2580)+lAid4
        });
    }
    
    if (y < -2830 && y > -4100) {
        $(".aid-kit").css({
            width: (wAid6-wAid5)/(4100-2620)*(-y-2620)+wAid5+'px',
            top: -y+380,
            left: (lAid6-lAid5)/(4100-2620)*(-y-2620)+lAid5
        });
    }
    
    if (y < -4100 && y > -4810) {
        $(".aid-kit").css({
            width: (wAid7-wAid6)/(4810-4100)*(-y-4100)+wAid6+'px',
            top: -y+380,
            left: (lAid7-lAid6)/(4810-4100)*(-y-4100)+lAid6
        });
    }
    
    if (y < -4810 && y > -5130) {
        $(".aid-kit").css({
            width: (wAid8-wAid7)/(5130-4810)*(-y-4810)+wAid7+'px',
            top: -y+380,
            left: (lAid8-lAid7)/(5130-4810)*(-y-4810)+lAid7
        });
    }
    
    if (y < -5130 && y > -5360) {
        $(".aid-kit").css({
            width: (wAid9-wAid8)/(5360-5130)*(-y-5130)+wAid8+'px',
            top: -y+380,
            left: (lAid9-lAid8)/(5360-5130)*(-y-5130)+lAid8
        });
    }
    
    if (y < -5360 && y > -5810) {
        $(".aid-kit").css({
            width: (wAid10-wAid9)/(5810-5360)*(-y-5360)+wAid9+'px',
            top: -y+380,
            left: (lAid10-lAid9)/(5810-5360)*(-y-5360)+lAid9
        });
    }
    
    if (y < -5810 && y > -6520) {
        $(".aid-kit").css({
            width: (wAid11-wAid10)/(6520-5810)*(-y-5810)+wAid10+'px',
            top: -y+380,
            left: (lAid11-lAid10)/(6520-5810)*(-y-5810)+lAid10
        });
    }
    // page-2动画
    if (y < -860) {
        $(".page-2 .p2-1").fadeIn(800, function () {
            $(".p2-c1,.p2-c2,.p2-c3").addClass("show");

        })
    }
    
    // 手势动画
    if (y < -180 && -y + innerHeight < $(".content").outerHeight() - 100) {
        $(".hints").addClass('show');
    } else {
        $(".hints").removeClass('show');
    }
    
    // page-2动画
    if (y < -1056) {
        $(".page-2 .text img").addClass('fade-right-in');
    }
    // page-3动画
    if (y < -2320) {
        $(".page-3 .text img").addClass('fade-right-in');
    }
    // page-3动画
    if (y < -2510) {
        $(".page-3 .ship").addClass('sail');
    }

    // page-7动画
    if (y < -3190) {
        $(".page-4 .title").addClass('fade-in');
        $(".page-4 .schedule").addClass('fade-in');
    }

    // page-5动画
    if (y < -4950) {
        $(".page-5 .text img").addClass('fade-right-in');
        $(".page-5 .addr-icon").addClass('fade-right-in');
    }

    // page-6动画
    if (y < -6130) {
        $(".page-6 .title,.page-6 .seal").addClass('fade-in');
        $(".page-6 .ship").addClass('sail');
    }

    if (-y + innerHeight >= $(".content").outerHeight() - 40) {
        $(".page-6 .title,.page-6 .seal").addClass('fade-in');
        if (!$(".popup-box").hasClass("fingerprint-show")) {
            setTimeout(function () {
                $(".popup-box").fadeIn(500)
            }, 800)
        }
    }
}