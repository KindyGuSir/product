$(function(){
  //搜索下拉
  function Search(div){
    var $div=$(div);
    $div.find(".radio").on("click","input",function(){
      var i=$div.find(".radio input").index($(this));
      $div.find(".form").attr("class","form none").eq(i).toggleClass("none block");
      $div.find(".form").eq(i).find(".Sinput").val($(".form").eq(i==0?1:0).find(".Sinput").val());
    }).find(".con").on("click","a",function(event){
      event.preventDefault();
      var $this=$(this),i=$this.parents(".con").find("a").index($this);
      $div.find(".radio").removeClass("cur").find(".txt").html($this.html());
      var value=$div.find(".form.block").find(".Sinput").val();
      $div.find(".form").removeClass("block").addClass("none").eq(i).toggleClass("none block").find(".Sinput").val(value);
    });
    $div.on("keyup","input",function(event){if (event.keyCode == 13) {$(this).parent().find(".Sbutton").click();}});
    $div.on("click",".Sbutton",function(event){
      event.preventDefault();
      var $this=$(this),s=$this.parent().find("input[name='s']").val(),q=$this.parent().find("input[name='q']").val();
      window.open('_blank').location=$this.parent().attr("data-action")+(s!=undefined?"?s="+encodeURI(s):"&q="+encodeURI(q));
    });
  }
  Search(".SearchL");//搜索下拉
  
  function Swiping(str1,str2,str3){//通用一级切换
    var $str1=$(str1),setTimer,speed=200;//延迟0.2秒
    $str1.find(str2).on("mouseover","a",function(){
      var $this=$(this),i=$this.index();
      setTimer=setTimeout(function(){
        $this.addClass("cur").siblings().removeClass("cur");
        $this.parents(str1).find(str3).removeClass("block").addClass("none").eq(i).toggleClass("none block");
      },speed);
    }).on("mouseout","a",function(){clearTimeout(setTimer);});
  }
  Swiping(".Mid0",".Mid0nav",".Mid0cont");  //热门游戏 经典游戏 A-Z 文字切换
  Swiping(".Mid1M",".Mid1Mnav",".Mid1Mcon");  //新闻文字列表 文字切换
  Swiping(".Mid2_R",".Mid2Rnav",".Mid2Rpic");  //热点图文推荐 文字切换
  Swiping(".Mid3R_L",".Mid3RLnav",".Mid3RLpic_txt");  //单机资讯 文字切换
  Swiping(".Mid3R_R",".Mid3RRnav",".Mid3RR_FSB");    //游戏发售表 文字切换
  Swiping(".Mid5_R",".MidRnav",".pic_list");      //新番更新 文字切换
  Swiping(".SJgame_M",".SJgameMnav",".SJgameMpic");    //游戏评测 图文切换
  Swiping(".SJgame_R",".SJgameRnav",".txt_pic");      //手游排行榜 文字切换
  Swiping(".Mid7",".Mid7nav",".Mid7img");      //COS美图 文字切换
  
  /*需要删除*/
  Swiping(".Mid6_L",".Mid6Lnav",".Mid6Lpic_txt");    //评测解说 文字切换
  Swiping(".Mid6_R",".Mid6Rnav",".txt_pic");      //手游排行榜 文字切换
  
  $.fn.extend({
    magnifier:function(ul,li) {
      var width = {
        normal:125,
        active:255,
        gap:130
      }, height = {
        normal:78,
        active:160
      }, gap = {
        horizontal:5,
        vertical:5
      }, item_inline = 1, self = this.each(function() {
        var topic = $(this),
            list = topic.find(ul).css({position:"relative"}),
            item = list.find(li).css({position:"absolute"}),
            item_active = item.filter(".is-active"),
            isMoving = !1;
        item_active.css({
          top:0,
          left:0,
          width:width.active,
          height:height.active
        }).attr("data-x", "0").attr("data-y", "*"), item.not(item_active).each(function(i) {
          var y = i >= item_inline ? 1 :0, x = y ? i - item_inline :i;
          $(this).css({
            top:i >= item_inline ? height.normal + gap.vertical :0,
            left:x * (width.normal + gap.horizontal) + width.active + gap.horizontal,
            width:width.normal,
            height:height.normal
          }).attr("data-x", x + 1).attr("data-y", y);
        });
        var getPosition = function(target) {
          return {
            x:target.attr("data-x"),
            y:target.attr("data-y")
          };
        }, reflow = function(item_prev, item_active) {
          var pos_prev = getPosition(item_prev), pos_active = getPosition(item_active), temp = pos_prev.y;
          pos_prev.y = pos_active.y, pos_active.y = temp, item_prev.attr("data-y", pos_prev.y), 
          item_active.attr("data-y", pos_active.y);
          var min = Math.min(pos_prev.x, pos_active.x), max = Math.max(pos_prev.x, pos_active.x), item_group = item.not(item_prev).not(item_active).filter(function() {
            var pos_current = getPosition($(this));
            return pos_current.y != pos_prev.y && pos_current.x >= min && pos_current.x <= max;
          }), fixed = pos_active.x < pos_prev.x ? 1 :-1;
          item_group.each(function() {
            $(this).attr("data-x", $(this).attr("data-x") - 0 + fixed);
          });
        };
        list.on("mouseover mousemove", li+":not(.is-active)", function() {
          if (!isMoving) {
            isMoving = !0;
            var item_prev = item_active.removeClass("is-active");
            item_active = $(this).addClass("is-active"), reflow(item_prev, item_active);
            var pos_prev = getPosition(item_prev), pos_active = getPosition(item_active);
            item_prev.css({
              zIndex:""
            }).stop().animate({
              top:(height.normal + gap.vertical) * pos_prev.y,
              left:(width.normal + gap.horizontal) * pos_prev.x + (pos_prev.x < pos_active.x ? 0 :width.gap),
              width:width.normal,
              height:height.normal
            }, function() {
              isMoving = !1;
            }), item_active.css({
              zIndex:9
            }).stop().animate({
              top:0,
              left:(width.normal + gap.horizontal) * pos_active.x,
              width:width.active,
              height:height.active
            }), item.not(item_prev).not(item_active).each(function() {
              var pos_current = getPosition($(this));
              $(this).css({
                width:width.normal,
                height:height.normal
              }).stop().animate({
                top:(height.normal + gap.vertical) * pos_current.y,
                left:(width.normal + gap.horizontal) * pos_current.x + (pos_current.x < pos_active.x ? 0 :width.gap)
              });
            });
          }
        });
      });
    }
  });
  //$(".ui-topic").magnifier(".ui-list",".ui-item");/*精彩栏目 图片切换*/
  
  function Slide(str1,str2){
    var $str1=$(str1),$str2=$(str2),len=$str1.length-1,timer,i=0;
    function ymxkmove(){
      $str2.fadeOut(0).eq(i).fadeIn(0);
      $str1.removeClass("cur").eq(i).addClass("cur");
    }
    function ymxkauto(){if(i==len){i=0;}else{i++;}ymxkmove();}    
    timer=setInterval(function(){ymxkauto();},5000);
    $(str1+","+str2).hover(function(){if(timer){clearInterval(timer);}},function(){timer=setInterval(function(){ymxkauto();},5000);});
    $str1.click(function(){i=$(this).index();ymxkmove();if(timer){clearInterval(timer);}});
  }
  
  function NumPage(str1,str2){//数字切换
    var htm="",len=$(str1).length;
    for(var i=1;i<=len;i++){htm+="<a href='javascript:;'"+(i==1?" class='cur'":"")+">"+i+"</a>";}
    $(str2).html(htm);
    Slide(str2+" a",str1);
  }
  NumPage(".Mid1R_pic li",".Mid1Rnav");    //活动/专题 数字切换
  NumPage(".Mid5R_DMZQ",".Mid5Rnav");      //动漫专区 数字切换
  
  function PingFen1(str1,str2){//评分1
    var $str1=$(str1);
    try{var n=$str1.find(str2).html();
      if(n.indexOf(".")!=-1){n=Number(n.split(".")[1])>0&&Number(n.split(".")[1])<5?n.split(".")[0]+".5":Number(n).toFixed();}
      n=n.replace(/.{0}/,"n").replace(".","-");
      $str1.find(str2).attr("class",str2.replace(".","")+" "+n);
    }catch(ex){return;}
  }
  PingFen1(".YMPC li.pic",".pnum");      //游民评测1
  
  function PingFen2(str1,str2,str3,str4){//评分2
    try{$(str1).each(function(i){
      var $this=$(this),w=$this.find(str2).width(),num=$this.find(str3).html();
      $this.find(str4).animate({width:(w*num/10)},500);
    });}catch(ex){return;}
  }
  PingFen2(".YMPC li.lx0",".jindu",".num",".tiao");  //游民评测2
  
  function fy(con,n,m){
    var $con=$(con);
    $con.find(".Ptxt").attr("class","Ptxt none").eq(n).toggleClass("none block");
    $con.find(".page-num").find("a").removeClass("cur").eq(n).addClass("cur");
    if(n==0){
      $con.find(".Pprev").addClass("cur");
    }else if(n==m){
      $con.find(".Pnext").addClass("cur");
    }else{
      $con.find(".Pprev").removeClass("cur");
      $con.find(".Pnext").removeClass("cur");
    }
  }
  function HomePage(con){//首页翻页
    var $con=$(con);
    if($con.find(".Home-Page").length>0){
      var htm="",m=$con.find(".Ptxt").length-1,n=0;
      for(var i=0;i<=m;i++){htm+="<a href='javascript:;'"+(i==0?" class='cur'":"")+"></a>";}
      $con.find(".page-num").html(htm);
      var ww=$con.find(".page-num").find("a").outerWidth(true)*(m+1);
      $con.find(".Home-Page").css({"width":ww+$con.find(".page-turn").outerWidth()*2});
      $con.find(".page-num").find("a").click(function(){if($(this).attr("class")=="cur"){return false;}n=$(this).index();fy(con,n,m);});
      
      $con.find(".Pprev").click(function(){if(n>0){n--;fy(con,n,m);}});
      $con.find(".Pnext").click(function(){if(n<m){n++;fy(con,n,m);}});
    }
  }
  $(".Mid1Mcon").each(function(o){HomePage(".Mid1Mcon:eq("+o+")");});  //首页 翻页
  
  function UpDate(str1,str2,str3){
    var $str=$(str1),len=$str.find(str3).length-1,i=0;
    $str.on("click",str2,function(){
      var $this=$(this);$this.addClass("cur");
      setTimeout(function(){$this.removeClass("cur");},500);
      if(i<len){i++;}else{i=0;}
      $str.find(str3).stop(false,true).fadeOut(400).eq(i).fadeIn(400);
    });
  }
  UpDate(".Mid4_R",".update",".Mid4R_img li");      //热门网游 换一批
  UpDate(".SJgame_R",".update",".SJgameRimg li");      //热门专区 换一批
  
  function PicTxt(str1,str2,str3){
    $(str1).on("mouseover",str2,function(){
      $(this).removeClass("block").addClass("none").siblings().removeClass("none").addClass("block");
      $(this).parent().find(str3).removeClass("block").addClass("none");
      $(this).next(str3).toggleClass("none block");
    });
  }
  PicTxt("ul.txt_pic","li.txt","li.img");    //右侧 手游排行榜 图文切换
  
  function SwipingDay(str1,str2){
    var now=new Date(),i=now.getDay();
    $(str1).removeClass("cur").eq(i).attr("class","cur");
    $(str2).removeClass("block").addClass("none").eq(i).toggleClass("none block");
  }
  SwipingDay(".MidRnav a",".pic_list");  //定义星期
  
  function Slides(str1,str2,str3){
    var $str1=$(str1),timer,i=0,j=0,m=0,len=$(str1).find(str3).find("a").length,w=$(str1).find(str3).find("a").eq(0).width(),jdW=$(str1).find(".JinDu").width();
    $str1.find(str2).css({"z-index":0,"opacity":0}).eq(0).css({"z-index":1,"opacity":1});
    $str1.find(str3).find("a").eq(0).addClass("cur");
    $str1.find(str3).before('<div class="smlfd"></div>');
    $str1.find(".num").html(len);
    for(var o=0;o<len;o++){$str1.find(str3).find("a").eq(o).attr("data-num",o);}
    function ymxkmove(str){
      if(i!=j){
        $str1.find(str2).eq(j).css({"z-index":0});
        $str1.find(str2).eq(i).css({"z-index":1}).stop().animate({"opacity":1},300,function(){$str1.find(str2).eq(j).css({"opacity":0});j=i;});
        $str1.find(".tiao").removeAttr("style").stop().animate({"width":jdW},5000);

        if(str=="Next"){
          $str1.find(str3).stop().animate({"left":-w},300,function(){
            $(this).css({"left":0}).find("a").eq(0).appendTo($(this));
            $str1.find(str3).find("a").removeClass("cur").eq(m).addClass("cur");
          });
          $str1.find(".current").html(i+1);
        }else if(str=="Prev"){
          $str1.find(str3).find("a").eq(len-1).prependTo($str1.find(str3));
          $str1.find(str3).css({"left":-w}).stop().animate({"left":0},300,function(){
            $(this).css({"left":0}).find("a").removeClass("cur").eq(m).addClass("cur");
          });
          $str1.find(".current").html(i+1);
        }else{
          $str1.find(".current").html(parseInt($str1.find(str3).find("a").eq(m).attr("data-num"))+1);
          $str1.find(str3).find("a").removeClass("cur").eq(m).addClass("cur");
        }
      }
    }
    
    if($("div").hasClass("Slides_ad_top")==true){
      var timers=setInterval(function(){
        if($(".Slides_ad_con").hasClass("none")==true){
          clearInterval(timers);clearInterval(timer);
          $str1.find(".tiao").stop().animate({width:jdW},5000);
          timer=setInterval(function(){clickNext("Next");},5000);
        }
      },1000);
    }else{
      $str1.find(".tiao").stop().animate({width:jdW},5000);
      timer=setInterval(function(){clickNext("Next");},5000);
    }
    function clickPrev(str){if(i==0){i=len-1;}else{i--;}ymxkmove(str);}
    function clickNext(str){if(i==len-1){i=0;}else{i++;}ymxkmove(str);}
    $str1.find("a.Lbtn").click(function(){if(i==j){clearInterval(timer);clickPrev("Prev");timer=setInterval(function(){clickNext("Next");},5000);}});
    $str1.find("a.Rbtn").click(function(){if(i==j){clearInterval(timer);clickNext("Next");timer=setInterval(function(){clickNext("Next");},5000);}});
    $str1.find(str3).on("click","a",function(){
      if($(this).hasClass("cur")==false&&i==j){
        clearInterval(timer);
        i=parseInt($(this).attr("data-num"));m=$(this).index();ymxkmove("");
        $(".smlfd").stop().animate({"left":(m*96)+"px"},200);
        timer=setInterval(function(){clickNext("Next");},5000);
      }
    });
    $str1.hover(function(){
      //clearInterval(timer);
      $str1.find("a.Lbtn").stop().animate({"left":0},500);
      $str1.find("a.Rbtn").stop().animate({"right":0},500);
    },function(){
      //timer=setInterval(function(){clickNext("Next");},5000);
      $str1.find("a.Lbtn").stop().animate({"left":-34},500);
      $str1.find("a.Rbtn").stop().animate({"right":-34},500);
    });
  }
  Slides(".Slides",".Bimg li",".Simg");  //首页幻灯片

  function Today(str1,str2,str3){
    var $str1=$(str1),mydate=new Date(),MM=(mydate.getMonth()+1).toString(),DD=mydate.getDate().toString(),
      Month=(MM.length==1?"0"+MM:MM)+"-"+(DD.length==1?"0"+DD:DD);
    $str1.each(function(i){
      $str1.eq(i).find(str2).each(function(j){
        if(Month==$(this).find(str3).html()){$str1.eq(i).find(str2).eq(j).addClass("cur");}
      });
    });
  }
  Today(".Mid3RR_FSB","li",".time");  //游戏发售表 星期定位

});
//黑白切换
var cookiename="Cookieheibai",heibai=cookie(cookiename),body='<body class="'+(heibai!=null?heibai:"bai")+'">';
//兼容ipad
(function(){
  if ((navigator.userAgent.match(/iPad/i))) {
    $('html').addClass('ipadhack');
  }
})();
