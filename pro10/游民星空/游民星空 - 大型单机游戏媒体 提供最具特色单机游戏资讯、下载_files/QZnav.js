!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){function c(a){return a}function d(a){return decodeURIComponent(a.replace(b," "))}function e(a){0===a.indexOf('"')&&(a=a.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return f.json?JSON.parse(a):a}catch(b){}}var b=/\+/g,f=a.cookie=function(b,g,h){var i,j,k,l,m,n,o,p,q,r;if(void 0!==g)return h=a.extend({},f.defaults,h),"number"==typeof h.expires&&(i=h.expires,j=h.expires=new Date,j.setDate(j.getDate()+i)),g=f.json?JSON.stringify(g):String(g),document.cookie=[f.raw?b:encodeURIComponent(b),"=",f.raw?g:encodeURIComponent(g),h.expires?"; expires="+h.expires.toUTCString():"",h.path?"; path="+h.path:"",h.domain?"; domain="+h.domain:"",h.secure?"; secure":""].join("");for(k=f.raw?c:d,l=document.cookie.split("; "),m=b?void 0:{},n=0,o=l.length;o>n;n++){if(p=l[n].split("="),q=k(p.shift()),r=k(p.join("=")),b&&b===q){m=e(r);break}b||(m[q]=e(r))}return m};f.defaults={},a.removeCookie=function(b,c){return void 0!==a.cookie(b)?(a.cookie(b,"",a.extend({},c,{expires:-1})),!0):!1}});

!function(){
  var JSON2;if(!JSON2){JSON2={}}"use strict";function f(a){return a<10?"0"+a:a}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(a){escapable.lastIndex=0;return escapable.test(a)?'"'+a.replace(escapable,function(b){return typeof meta[b]==="string"?meta[b]:"\\u"+("0000"+b.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(j,e){var c,b,l,a,g=gap,d,h=e[j];if(h&&typeof h==="object"&&typeof h.toJSON==="function"){h=h.toJSON(j)}if(typeof rep==="function"){h=rep.call(e,j,h)}switch(typeof h){case"string":return quote(h);case"number":return isFinite(h)?String(h):"null";case"boolean":case"null":return String(h);case"object":if(!h){return"null"}gap+=indent;d=[];if(Object.prototype.toString.apply(h)==="[object Array]"){a=h.length;for(c=0;c<a;c+=1){d[c]=str(c,h)||"null"}l=d.length===0?"[]":gap?"[\n"+gap+d.join(",\n"+gap)+"\n"+g+"]":"["+d.join(",")+"]";gap=g;return l}if(rep&&typeof rep==="object"){a=rep.length;for(c=0;c<a;c+=1){if(typeof rep[c]==="string"){b=rep[c];l=str(b,h);if(l){d.push(quote(b)+(gap?": ":":")+l)}}}}else{for(b in h){if(Object.prototype.hasOwnProperty.call(h,b)){l=str(b,h);if(l){d.push(quote(b)+(gap?": ":":")+l)}}}}l=d.length===0?"{}":gap?"{\n"+gap+d.join(",\n"+gap)+"\n"+g+"}":"{"+d.join(",")+"}";gap=g;return l}}if(typeof JSON2.stringify!=="function"){JSON2.stringify=function(d,b,c){var a;gap="";indent="";if(typeof c==="number"){for(a=0;a<c;a+=1){indent+=" "}}else{if(typeof c==="string"){indent=c}}rep=b;if(b&&typeof b!=="function"&&(typeof b!=="object"||typeof b.length!=="number")){throw new Error("JSON2.stringify")}return str("",{"":d})}}if(typeof JSON2.parse!=="function"){JSON2.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON2.parse")}};
  
  var isTrim=function (s) {return s.replace(/(^\s*)|(\s*$)/g,"");};  //清除空格
  $.fn.QZUserLogin= function (options){//获取登录用户名
    var $NotLog = $("#QZNotLog"), $HasLog = $("#QZHasLog"),$userLayer = $("#QZuserLayer");
    var htm = "", day = new Date(), hr = day.getHours();
    if (hr == 0) { htm = "午夜时分，鬼出没时段！"; }
    else if (hr == 1) { htm = "凌晨1点了！该休息了！"; }
    else if (hr == 2) { htm = "工作狂，还在忙吗？"; }
    else if (hr == 3) { htm = "午夜3点！还不睡觉吗？"; }
    else if (hr == 4) { htm = "凌晨4点了，您累了！"; }
    else if (hr == 5) { htm = "5点多了，还没睡啊？"; }
    else if (hr == 6) { htm = "早上好！新一天开始啦！"; }
    else if (hr == 7) { htm = "吃早饭了吗？"; }
    else if (hr >= 8 && hr <= 11) { htm = "上午好！祝您工作愉快！"; }
    else if (hr == 12) { htm = "中午好！你吃饭了吗？"; }
    else if (hr == 13 || hr == 14) { htm = "下午好，开始上班了！"; }
    else if (hr >= 15 && hr <= 18) { htm = "下午好！祝您工作愉快！"; }
    else if (hr == 19) { htm = "肚子饿了，该吃晚饭了！"; }
    else if (hr >= 20 && hr <= 22) { htm = "晚上好！"; }
    else if (hr == 23) { htm = "不早了，该睡觉了？"; }
    $userLayer.find(".time").html(htm);
    
    var userOK=function(responseJson){
      $HasLog.show().find(".uname img").attr("src", responseJson.userface).after(responseJson.username);
      $userLayer.find(".user1 .name").html(responseJson.username);
      $userLayer.find(".user1 .img img").attr("src", responseJson.userface);
      $userLayer.find(".user1 .binding .email").addClass(responseJson.emailClass);
      $userLayer.find(".user1 .binding .phone").addClass(responseJson.phoneClass);
      $userLayer.find(".user1 .binding .weixin").addClass(responseJson.weixinClass).attr("data-okorno", responseJson.weixinClass);
      $userLayer.find(".user1 .binding .qq").addClass(responseJson.qqClass).attr("data-okorno", responseJson.qqClass);
      $userLayer.find(".user1 .binding .sina").addClass(responseJson.sinaClass).attr("data-okorno", responseJson.sinaClass);
      if (responseJson.weixinClass == "ok") {$userLayer.find(".user1 .binding .weixin").attr("title", "已绑定");}
      if (responseJson.qqClass == "ok") {$userLayer.find(".user1 .binding .qq").attr("title", "已绑定");}
      if (responseJson.sinaClass == "ok") {$userLayer.find(".user1 .binding .sina").attr("title", "已绑定");}
      if (responseJson.phoneClass == "ok") {$userLayer.find(".user1 .binding .phone").attr("title", "已绑定");}
      if (responseJson.emailClass == "ok") {$userLayer.find(".user1 .binding .email").attr("title", "已绑定");}
      $userLayer.find(".user2 .zl").attr("href", responseJson.articleUrl);
      if (responseJson.iscolumn == false) {$userLayer.find(".user2 .zl").remove();}
    }
    
    if ($.cookie("UserCookie") !== undefined && $.cookie("UserCookie") !== null) {
      var responseJson = $.parseJSON($.cookie("UserCookie")),len=responseJson.username.replace(/[^\x00-\xff]/g,"01").length;
      userOK(responseJson);
      return;
    }
    $.ajax({
      type:"GET",dataType:"jsonp",url: "http://i.gamersky.com/api/logincheck",
      success:function(responseJson) {
        if (responseJson.status == "ok") {
          if ($HasLog.length == 0) {return;}
          if (responseJson.userface == "") {
            responseJson.userface = "http://image.gamersky.com/avatar/original/game/game001.jpg";
          }
          var len=responseJson.username.replace(/[^\x00-\xff]/g,"01").length;
          userOK(responseJson);
          $.cookie("UserCookie", JSON2.stringify(responseJson), { expires: 7, path: '/',domain:'.gamersky.com'});
        } else {
          $NotLog.show();
        }
      }
    });
  };
  $('.QZlogin').QZUserLogin();//获取登录用户名
  
  $.fn.FocusBlur = function (options) {
    var $this=$(this),$name=$("#QZuserName"),$pass=$("#QZpassword");
    $name.val($name.data("val"));$pass.val($pass.data("val"));
    $this.on("focus","input",function(){
      var $This=$(this),val=$This.val(),vals=$This.data("val"),inputname=$This.attr("name");
      if(val==vals){
        $This.val("").addClass("cur");
        if(inputname=="password" && $This.attr("type")=="text"){
          var htm=$This.parent().html().replace("type=\"text\"","type=\"password\"");
          $This.parent().html(htm).find("input").focus();
        }
      }
    }).on("blur","input",function(){
      var $This=$(this),val=$This.val(),vals=$This.data("val"),inputname=$This.attr("name");
      if(!isTrim(val)){
        $This.val(vals).removeClass("cur");
        if(inputname=="password" && $This.attr("type")=="password"){
          $This.parent().html($This.parent().html().replace("type=\"password\"","type=\"text\"")).find("input").val(vals);
        }
      }
    });
  };
  $.fn.QZloginForm = function (options){//登录用户
    var $this = $(this);
    var urlParam = function(name, url) {
      if (!url) {url = window.location.href;}
      var results = new RegExp("[\\?&]" + name + "=([^&#]*)").exec(url);
      if (!results) {return 0;}
      return results[1] || 0;
    };
    $this.FocusBlur();  //光标移入
    $this.on("click","#QZqqLogin",function(event) {
      event.preventDefault();
      var returnUrl = window.location.href;
      if (urlParam("from")) {returnUrl = urlParam("from");}
      window.location.href = "http://i.gamersky.com/oauth/authorizelogin?authorizetype=qq&returnUrl=" + encodeURI(returnUrl);
    }).on("click","#QZsinaLogin",function(event) {
      event.preventDefault();
      var returnUrl = window.location.href;
      if (urlParam("from")) {returnUrl = urlParam("from");}
      window.location.href = "http://i.gamersky.com/oauth/authorizelogin?authorizetype=sina&returnUrl=" + encodeURI(returnUrl);
    }).on("click", "#QZweixinLogin", function (event) {
      event.preventDefault();
      var returnUrl = window.location.href;
      if (urlParam("from")) { returnUrl = urlParam("from"); }
      window.location.href = "http://i.gamersky.com/oauth/authorizelogin?authorizetype=weixin&returnUrl=" + encodeURI(returnUrl);
    }).on("keyup", "#QZuserName,#QZpassword", function (event) {
      if (event.keyCode == 13) {$("#QZbtn").click();}
    }).on("click","#QZbtn",function(event) {
      event.preventDefault();
      var $userName = $("#QZuserName"),userName=$userName.val();
      var $passWord = $("#QZpassword"),passWord=$passWord.val();
      var QZcookie = $("#QZcookie").attr("checked")?"Year":"None";
      
      if (!isTrim(userName) || userName==$userName.data("val")) {alert("请填写用户名！"); $userName.focus(); return;}
      if (!isTrim(passWord) || passWord==$passWord.data("val")) {alert("请填写密码！"); $passWord.focus(); return;}

      $.ajax({
        type:"GET",dataType:"jsonp",url: "http://i.gamersky.com/api/userlogin",
        data:{logindata:JSON2.stringify({username:userName,password:passWord,checkcode:"",expiration:QZcookie})},
        success:function(responseJson) {
          switch (responseJson.status) {
            case "ok": $('.QZshade,.QZlogin').hide(); location.reload(); break;
            case "err": alert(responseJson.body); break;
          }
        }
      });
    });
   };
  
  $('.QZlogin').QZloginForm();//登录用户
  if ((navigator.userAgent.match(/iPad/i))) {
    $("#QZHasLog .uname").on("click",function(event){event.preventDefault();});
    $('.navtt,#QZHasLog').click(function(event){
      var e=window.event||event;e.stopPropagation?e.stopPropagation():e.cancelBubble=!0; 
      $(this).addClass('cur');
      $("#QZuserLayer").css("marginLeft","-200px").find(".zx").css("background-position","230px 0");
    });
    $(document).on("touchstart",function(e){
      if(!$('.navtt,#QZHasLog').is(e.target) && $('.navtt,#QZHasLog').has(e.target).length === 0){
        $('.navtt,#QZHasLog').removeClass('cur');
      }
    });
  }else{
    $('.navtt,#QZHasLog').hover(function(){$(this).addClass('cur')},function(){$(this).removeClass('cur')});
  }
  $('#QZNotLog').on('click','.Login',function(event){event.preventDefault();$('.QZshade,.QZlogin').show();});
  $(".QZshade").click(function(event){event.preventDefault();$('.QZshade,.QZlogin').hide();});
  $("#QZsign").click(function(event){
    event.preventDefault();
    $.removeCookie("UserCookie", { path: '/',domain:'.gamersky.com'});
    $.ajax({
      type: "GET",dataType: "jsonp",url: "http://i.gamersky.com/api/userlogout",
      success: function (logoutJson) {
        if (logoutJson.status == "ok") {location.reload();}
      }
    });
  });
}();

