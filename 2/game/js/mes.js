$(function(){
    var rlSwiper = new Swiper("#rl-swiper",{
        direction : 'horizontal', // 'vertical'
        initialSlide :0,
        on: {
            init: function(){
                bgAnimaControl(this.activeIndex);
                // this.emit('transitionEnd');
            }, 
            slideChangeTransitionStart: function(){
                bgAnimaControl(this.activeIndex);
            },
        },
    })
})
// 背景控制
function bgAnimaControl(num){
    console.log(num)
    if(num === 0){
        $(".mesBg .tBox").animate({
            "height":"3rem",
            "left":"",
            "width":"5rem"
        },500)
        $(".mesBg .lBox").animate({
            "height":"calc(100% - 3rem)",
        },500)
        $(".mesBg .bBox").animate({
            "left":"-101%",
        },500)
    }else if(num === 1){
        $(".mesBg .tBox").animate({
            "height":"0.5rem",
            "left":"0",
            "width":"5rem"
        },500)
        $(".mesBg .lBox").animate({
            "height":"100%",
        },500)
        $(".mesBg .bBox").animate({
            "left":"-101%",
        },500)
    }else if(num === 2){
        $(".mesBg .tBox").animate({
            "height":"0.3rem",
            "left":"0.6rem",
            "width":"100%"
        },500)
        $(".mesBg .lBox").animate({
            "height":"100%",
        },500)
        $(".mesBg .bBox").animate({
            "left":"0",
        },500)
    }else{
        console.log(num)
    }
}