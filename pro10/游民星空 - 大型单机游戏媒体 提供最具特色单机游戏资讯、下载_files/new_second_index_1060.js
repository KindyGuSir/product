(function(adhtW, adhtH, relh, adhtImg, adhtUrl, TongJi, bnCookie, tads, adhtPic, adlink, adhtSuffix, divHtml, adtag) {
    adhtW = 1060; //宽度
    adhtH = 2000; //初始高度
    relh = 90; //实际高度

    adhtImg = "http://g.00tera.com/b/1/683/11373/edjd9md.swf?uid=507967"; //素材地址
    adhtUrl = "http://g.00tera.com/s/1/683/11373.html?uid=507967"; //连接地址,不填写链接，本行不生效
    TongJi = "598424";　　　　　 //统计ID

    bnCookie = $("script:last").attr("src").replace(/(.*\/)*([^.]+).*/ig, "$2"); /*Cookie名称*/
    tads = bnCookie + TongJi + Math.floor(Math.random() * 10e10 + new Date().getTime()); //ID

    adhtSuffix = adhtImg.replace(/(.+)[\\/]/, "").split(".")[1]; //获取图片或flash后缀名
    adhtSuffix = adhtSuffix.indexOf("?") != -1 ? adhtSuffix.split("?")[0] : adhtSuffix;

    if (adhtSuffix == "jpg" || adhtSuffix == "gif" || adhtSuffix == "png") {
        adhtPic = "<img src='" + adhtImg + "' width='" + adhtW + "' height='" + relh + "' border='0' />";
    } else if (adhtSuffix == "swf") {
        adhtPic = "<embed src='" + adhtImg + "' width='" + adhtW + "' height='" + adhtH + "' wmode='transparent' quality='high' type='application/x-shockwave-flash'></embed>";
    }

    if (adhtUrl == '' || adhtUrl == undefined || adhtUrl == null) {
        adlink = "";
    } else {
        adlink = "<a style='display:block;width:100%;height:100%;background:url(#);position:absolute;left:0;top:0;' href='" + adhtUrl + "' target='_blank' data-itemid='" + TongJi + "' class='countHit countHitSql'></a>";
    }
    adtag = "<div style='width:26px;height:12px;position:absolute;left:0;bottom:0;background:url(http://image.gamersky.com/webimg15/adtag.png);'></div>";
    divHtml = "<div id='" + tads + "' style='opacity:0;width:" + adhtW + "px;height:" + adhtH + "px;position:fixed;'>" + adhtPic + adlink + adtag + "</div>";

    function insertGG(gg) {
        if ((navigator.userAgent.match(/iPad/i))) {
            if (adhtSuffix == "swf") {
                return false;
            } else {
                document.write(gg);
            }
        } else {
            document.write(gg);
        }
    }
    insertGG("<div style='margin:0 auto;width:" + adhtW + "px;height:" + relh + "px;'>" + divHtml + "</div>");

    setTimeout(function() {
        $("#" + tads).css({
            "height": relh,
            "position": "relative",
            "opacity": 1
        }).find("embed").attr("height", relh);
    }, 500);
})();