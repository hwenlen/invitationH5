$(function(){
    //随机数区间
    function rnd(m,n){
        return parseInt(Math.random()*(n-m)+m);
    }
    var ColorArr = ['222,102,44','220,144,41','113,159,207'];
    
    var Round = '<div class="round"></div>';
    var roundNum1 = 28;
    var roundNum2 = 50;
    //顶部光圈
    for(let i = 0; i<roundNum1; i++){
        $('#roundWrapTop').append(Round);
        let R1 = rnd(0,3);   //颜色种类随机
        let R2 = rnd(6,10)/10;  //透明度与动画时间随机
        let R3 = rnd(8,16)/100;    //宽高随机
        let R4 = rnd(0,99);      //定位 左右
        let R5 = rnd(0,80);      //定位 上下
        
        $('#roundWrapTop .round').eq(i).css({
            background: 'rgba('+ColorArr[R1]+','+R2+')',
            boxShadow: '0 0 0.06rem rgba('+ColorArr[R1]+','+R2+')',
            width: R3+'rem',
            height: R3+'rem',
            left: R4+'%',
            top: R5+'%',
            animation: 'Twinkle '+R2*8+'s '+ R2 +'s linear infinite'
        });
    }
    //底部光圈
    for(let i = 0; i<roundNum2; i++){
        $('#roundWrapBottom').append(Round);
        let R2 = rnd(1,3)/10;;
        let R3 = rnd(14,24)/100;
        let R4 = rnd(0,99);
        let R5 = rnd(0,96);
        
        $('#roundWrapBottom .round').eq(i).css({
            background: 'rgba('+ColorArr[1]+','+R2+')',
            boxShadow: '0 0 0.06rem rgba('+ColorArr[1]+','+R2+')',
            width: R3+'rem',
            height: R3+'rem',
            left: R4+'%',
            top: R5+'%',
            animation: 'Twinkle '+R2*40+'s '+ R2*5 +'s linear infinite'
        });
    }
    
    
})