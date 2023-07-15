var setTime = 30;
var times = setTime;
var timesGo;
$(function(){
    // 首页提示
    $(".beginBtn").click(function(){
        $(".hintBox").hide();
        $(".hint1").fadeIn();
    })
    $(".h1btn").click(function(){
        $(".hintBox").hide();
        $(".hint2").fadeIn();
    })
    $(".h2btn").click(function(){
        $(".hintBox").hide();
        $(".page1").hide();
        $(".page2").show();
        init();
    })

    
    // 初始化游戏
    function init(){
        console.log("init")
        $(".hint3,.hint4").fadeOut();
        findNum = 0; //已找到
        canIclick = true;
        $(".timeLine span").text(setTime);
        // 初始物品
        $(".fi").attr("style","").show();
        // 初始框
        $(".showBig").removeClass("showBig");
        $(".iconList li").map(function(index,item){
            $(item).children().attr("src","./img/find/f"+(index+1)+"g.png");
        })
        timeLeave(setTime);
    }
    
    // 找东西(点击物品)
    var findNum = 0;
    var canIclick = true;
    $(".fcbox").on("click",".fi",function(){
       if(canIclick){
            var clickIndex = $(this).index()-1;
            $(this).css({
                "zIndex":"3",
                "transform": "scale(1.3)"
            })
            var that = this;
            setTimeout(function(){
                $(that).css("opacity","0");
            },500)
            var changeItem;
            setTimeout(function(){
                changeItem = $(".iconList li").eq(clickIndex).children();
                changeItem.addClass("showBig");
                changeItem.attr("src",changeItem.attr("data-src"));
                // 回复状态
                setTimeout(function(){
                    findNum++;
                    $(that).hide();
                    $(that).css({
                        "opacity":"1",
                        "zIndex":"1",
                        "transform": "scale(1)"
                    });

                    // 找到了全部
                    if(findNum === 4){
                        canIclick =  false;
                        window.clearInterval(timesGo);
                        $(".hint3").fadeIn(300);
                    }else{
                        canIclick =  true;
                    }
                },300)
            },500)
            canIclick =  false;
        } 
    })


    // 再玩一次
    $(".playAgain").click(function(){
        init();
    })

    // 返回首页
    $(".backHome").click(function(){
        console.log("back");
        window.location.replace("../index.html")
    })
    

})

// 倒计时
function timeLeave(t){
    $(".timeLine span").text(t+'s');
    console.log(t);
    timesGo = setInterval(timeFn,1000);
    function timeFn(){
        t--;
        if(t >= 0){
            $(".timeLine span").text(t+'s');
        }else{
            window.clearInterval(timesGo);
            $(".hint4").fadeIn(300);
        }
        
    }
}