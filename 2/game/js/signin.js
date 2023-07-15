var isAllBlock = false; // 是否集完
$(function(){
    var isSign = false;
    var blockNum = 0;
    // 20个箱子的样式
    var boxTotal = 20;
    for(var a=0;a<boxTotal;a++){
        if(a>9){
            $(".signIn .boxList").append('<img style="left:'+(a+1-10)*0.43+'rem;top:'+(0.3+((a+1-10)*0.095))+'rem" src="./img/sign/box.png" alt="">')
        }else{
            $(".signIn .boxList").append('<img style="left:'+(a+1)*0.43+'rem;top:'+(0.75+((a+1)*0.095))+'rem" src="./img/sign/box.png" alt="">')
        }
    }
    var baseURL = 'http://wt.broadconch.com';
    var helperNum; // 是否有帮助者
    $.ajax({
        url: baseURL + "/customer/list",
        type: "post",
        data: {
            'uid':"5"
        },
        success:function(res){
            console.log(res)
            if(res.code === 100){
                // 签到过
                if(res.data.is_sign){
//                    isSign = true;
//                    $(".signBtn").text("已签到");
                }

                // 中奖者
                if(res.data.winner.length > 0){
                    $(".scrollBox .prize").html("中奖者："+res.data.winner.join("、")+"&nbsp;&nbsp;&nbsp;&nbsp;");
                }
                
                // 是否有助力者
                var picNum; // 初始化的时候已经有几块砖
                if(res.data.helper.length > 0){
                    helperNum = true;
                    if(isSign){
                        picNum = res.data.number;
                    }else{
                        // 后端默认已添加1个
                        picNum = res.data.number - 1; 
                    }
                    
                    // 助力者
                    $(".scrollBox .helper").html("助力者："+res.data.helper.join("、"));
                }else{
                    helperNum = false;
                    picNum = res.data.number;
                }

                // 显示已获得几块拼图
                for(var b=0;b<picNum;b++){
                    $(".signIn .boxList img").eq(b).addClass("showBlock");
                }

                // 显示初始砖块
                proPic(picNum);
            }
                
        },
        fail:function(err){
            console.log(err)
        },
        timeout:function(){
            alert("请求超时")
        }
    });
    
    // 点击签到
    // pushBlock(2);
    $(".signBtn").click(function(){
        if(isAllBlock){
            alert("已收集完全")
            return;
        }
        if(isSign){
            alert("已签到")
        }else{
            console.log("开始签到")
            var addBlockNum = 0;
            if(helperNum){
                addBlockNum = 2;
            }else{
                addBlockNum = 1;
            }
            $(".signBtn").text("已签到");
            pushBlock(addBlockNum);
            /*$.ajax({
                url: baseURL + "/customer/sign",
                type: "post",
                data: {
                    'uid':"5",
                },
                success:function(res){
                    console.log(res);
                    if(res.code === 100){
                        $(".signBtn").text("已签到");
                        pushBlock(addBlockNum);
                    }else{
                        isSign = false;
                    }
                },
                fail:function(err){
                    console.log(err)
                    isSign = false;
                },
                timeout:function(){
                    isSign = false;
                    alert("请求超时")
                }
            })*/
            
        }
        isSign = true;
    })
    $(".help").click(function(){
        $(".hint1").fadeIn();
    })
    $(".hint1 .h1btn").click(function(){
        $(".hint1").fadeOut();
    })
})


// 是否完成拼图
function proPic(pic){
    if(pic >= 20){
        isAllBlock = true;
        showPro();
        // alert("您的拼图已集满1");
        return;
    }
}

// 集满后展示产品图片
function showPro(){
    $(".proBox .boxList").animate({
        "opacity":"0",
    },500)
    $(".proBox .pro").addClass("showPro");
    // isShowPro = true;
}

// 添加砖块
function pushBlock(num){
    var hasBlock = $(".showBlock").length;
    if(hasBlock >= 20){
        // alert("您已集满2")
        showPro();
        return;
    }
    if(num<=0){
        return;
    }else{
        // 人进来
        $(".bBg .addBox").addClass("mp");
        $(".bBg .peoBox").addClass("mb");
        num--;
        // 动画结束添加箱子
        setTimeout(function(){
            $(".signIn .boxList img").eq(hasBlock).addClass("showBlock");
        },2000)
        // 人出去
        setTimeout(function(){
            $(".bBg .addBox").removeClass("mp");
            $(".bBg .peoBox").removeClass("mb");
            setTimeout(function(){
                pushBlock(num);
            },100)
        },2500)
    }
    
}
