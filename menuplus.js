
var menu = {};

/* 全站右下角菜单
 * 
 * 默认显示，不显示加随意标签加个属性： data-event="plus-dotShow"
 * 隐藏方法 ：menu.plus.hide()
 * 显示方法 ：menu.plus.show()
 *
*/
var plusAuto,plusHideAuto,plusHideTime = 10000;
    clearTimeout(plusHideAuto);
    plusHideAuto = setTimeout(function(){
        $('.plus-btn').css({right:'-.4rem',opacity:.8});
    },plusHideTime);
menu.plus = function(){
    $('.plus-tab').remove();
    if(!$('[data-event="plus-dotShow"]').length) menu.plus.add();
};
menu.plus.hide = function(){
    $('.plus-tab').hide();
};
menu.plus.show = function(){
    $('.plus-tab').show();
};
menu.plus.add = function(){   
    var html = '<div class="plus-tab plus-tab-first">'+
        '<div class="plus-shade"></div>'+
        '<div class="plus-list">'+
        '   <ul>'+
        '       <li class="transition icon icon-f" data-title="网站公告" data-uri="notice.html"></li>'+
        '       <li class="transition icon icon-e" data-title="常见问题" data-uri="help.html"></li>'+
        '       <li class="transition icon icon-d" data-title="安全保障" data-uri="safegurad.html"></li>'+
        '       <li class="transition icon icon-c" data-title="我的账户" data-uri="index.html?type=4"></li>'+
        '       <li class="transition icon icon-b" data-title="首页" data-uri="index.html"></li>'+
        '   </ul>'+
        '</div>'+
        '<div class="plus-btn transition"><div class="transition icon icon-a"></div></div>'+
    '</div>';
    /*菜单拖动*/ 
    $('body').append(html);
    var $handle = $('.plus-btn'),/*拖动对象*/
        isClick = false,/*左键是否按住*/
        defaultX,/*拖动前的x坐标*/
        defaultY,/*拖动前的y坐标*/
        mouseX,/*拖动后的x坐标*/
        mouseY,/*拖动后的y坐标*/
        divTop,/*弹窗拖动前的x坐标*/
        divLeft,/*弹窗拖动前的y坐标*/
        moved = false;/*是否移动过*/
    $handle.on('mousedown touchstart',function(e){/*PC\移动*/
        if($handle.parent('.plus-on').length) return;
        isClick = true;
        moved = false;
        defaultX = e.pageX ? e.pageX : e.touches[0].pageX;
        defaultY = e.pageY ? e.pageY : e.touches[0].pageY;
        divTop = $handle.offset().top;
        divLeft = $handle.offset().left;
        $handle.removeClass('transition');
    });
    $handle.on('touchmove',function(e){/*移动*/
        e.preventDefault();
        if(!isClick) return false;
        mouseX = e.touches[0].pageX;
        mouseY = e.touches[0].pageY;
        plusmove(isClick,mouseX,mouseY);        
    });
    $handle.on('touchend',function(e){/*移动*/
        isClick = false;
    });
    $(window).on('mousemove',function(e){/*PC*/
        e.preventDefault();
        if(!isClick) return false;
        mouseX = e.pageX;
        mouseY = e.pageY;
        plusmove(isClick,mouseX,mouseY);
    });
    $(window).on('mouseup',function(e){/*PC*/
        e.preventDefault();
        isClick = false;
    });
    $handle.on('click',function(){
        if(!moved) $handle.css({top:'',left:'',bottom:'',right:'',opacity:1});
        clearTimeout(plusHideAuto);
    });
    function plusmove(isClick,mouseX,mouseY){
        var left = parseInt(mouseX-defaultX)+divLeft;
        var top = parseInt(mouseY-defaultY)+divTop - $(window).scrollTop();
        moved = true;
        clearTimeout(plusHideAuto);
        if(left < 0)/*防止拖动出左边*/
          left = 0;
        if(top < 0)/*防止拖动出顶部*/
          top = 0;
        if(left+$handle.width() > $(window).width())/*防止拖动出右边*/
          left = $(window).width() - $handle.width();
        if(top+$handle.height() > $(window).height())/*防止拖动出底边*/
          top = $(window).height() - $handle.height();
        if(isClick){/*确认鼠标按住*/
            /*对象被缩放，修正*/
            left -= $handle.width();
            top -= $handle.height();
            /*对象被缩放，修正 end*/
          $handle.css({top:top,left:left,bottom:'auto',right:'auto',opacity:1});
        }
    };
    /*菜单拖动 end*/     
    $('.plus-btn,.plus-shade').on('click',function(){
        if(!moved) $('.plus-tab').toggleClass('plus-on').removeClass('plus-tab-first');
        clearTimeout(plusAuto);
        clearTimeout(plusHideAuto);
        if(!$('.plus-on').length){
            plusAuto = setTimeout(function(){
                $('.plus-list').css({'zIndex':-1});
            },500);
            if(!moved) plusHideAuto = setTimeout(function(){
                $handle.css({right:'-.4rem',opacity:.8}).addClass('transition');
            },plusHideTime);
        }else{
            $('.plus-list').css({'zIndex':105});
        }
    });
    $('.plus-list li').on('click',function(e){
        var uri = $(this).attr('data-uri');
        if(uri) window.location.href = uri;
    });
};
menu.plus();
