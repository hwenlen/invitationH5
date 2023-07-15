$(function () {
    var framedType = 1; // 相框类型1、2、3、4

    /*swiper*/
    var swiper = new Swiper(".swiper-container", {
        speed: 400,
        followFinger: false,
        on: {
            slideChangeTransitionStart: function () {
                //选择的是哪种海报
                framedType = this.activeIndex + 1;
            }
        }
    });
    
    /*获取指定相框的宽高 修改截图区尺寸*/
    var clipSize = function () {
        var arr = [];
        arr[0] = $("#framed" + framedType).outerWidth() / 2;
        arr[1] = $("#framed" + framedType).outerHeight() / 2;
        return arr;
    }
    /*配置qrcode*/
    var makeQrcodeConfig = function(ID){
        return new QRCode(ID, {
            width: 113,
            height: 113,
            colorDark : "#333",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    }
    var makeqrCode1 = makeQrcodeConfig("qrCode1");
    var makeqrCode2 = makeQrcodeConfig("qrCode2");
    var makeqrCode3 = makeQrcodeConfig("qrCode3");
    var makeqrCode4 = makeQrcodeConfig("qrCode4");
    
    /*对应地方生成二维码*/
    var makeqrCodeAll = function(URL){
        // 跳转地址
        var invitationURL = URL || BaseURL+'?imgid=1';
            
        switch (framedType) {
            case 1:
                $("#qrCode1").parent(".qr-code-box").show();
                makeqrCode1.clear(); 
                makeqrCode1.makeCode(invitationURL); 
                break;
            case 2:
                $("#qrCode2").parent(".qr-code-box").show();
                makeqrCode2.clear(); 
                makeqrCode2.makeCode(invitationURL); 
                break;
            case 3:
                $("#qrCode3").parent(".qr-code-box").show();
                makeqrCode3.clear(); 
                makeqrCode3.makeCode(invitationURL); 
                break;
            case 4:
                $("#qrCode4").parent(".qr-code-box").show();
                makeqrCode4.clear(); 
                makeqrCode4.makeCode(invitationURL); 
                break;
            default:
                break;
        }
    }
    
    /*截图配置*/
    var clipAreas = new PhotoClip("#clipArea", {
        size: [200, 200],
        file: "#file",
        view: "#view",
        ok: "#clipBtn",
        done: function (dataURL) {
            $(".down-img").attr('src','');
            $(".down-img").hide();
            $("#framed" + framedType).css({
                backgroundImage: 'url(' + dataURL + ')'
            });
            
            //生成对应二维码
            makeqrCodeAll();
            
//            $.ajax({
//                url: BaseURL + '/customer/uploadImage',
//                type : "POST",
//                data: {
//                    uid: '',
//                    image_url: dataURL
//                },  
//                success:function(res){
//                    if(res.code == 200){
//                        
//                    }
//                }
//            });
            /*截取海报*/
            playbill();
            /*清除弹窗上的图片*/
            clipAreas.clear();
        }
    });

    /*不选的时候，点击遮罩*/
    $("#clipArea_box").click(function () {
        $("#clipArea_box").hide();
        $(".down-img").attr('src','');
        $(".down-img").hide();
    })

    /*上传图片*/
    $("#fileBtn").click(function () {
        $("#file").click();
        $("#clipArea_box").show();
        // 修改截图区尺寸
        clipAreas.size(clipSize()[0], clipSize()[1])
    })

    /*生成海报*/
    var playbill = function () {
        var shareContent = document.getElementById('framedBox'+framedType),//需要截图的包裹的（原生的）DOM 对象
            width = shareContent.clientWidth, //获取dom 宽度
            height = shareContent.clientHeight, //获取dom 高度
            canvas = document.createElement("canvas"), //创建一个canvas节点
            scale = 1; //定义任意放大倍数 支持小数
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
            useCORS: true // 开启跨域配置
        };
        html2canvas(shareContent,canvasOption).then(function(canvas){
            var url = canvas.toDataURL("image/png", 1.0);
            $(".down-img.down-img-"+framedType).show();
            $(".down-img.down-img-"+framedType).attr('src',url);
        });
    }
})