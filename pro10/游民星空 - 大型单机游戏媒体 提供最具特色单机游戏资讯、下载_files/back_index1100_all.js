(function() {
	//背景广告
	var bgImg, bgUrl, TongJi, bgHtm = "";
	var bgtop = "http://image.gamersky.com/webimg15/adtop.png"; //顶部图片阴影
	var bgClose = "http://image.gamersky.com/webimg15/close_index.gif"; //关闭按钮
	var bgWH = $(window).height(); //可见窗口高度
	var bgTH = $(".bgAdWrap").offset().top;
	var bgCookieName = "ADback"; //Cookie名称
	var bgmin = 1,
		bgmax = 2; //1~2之间的循环
	var bgCkie = cookie(bgCookieName);
	var bgnum = bgCkie != null ? Number(bgCkie) == bgmax ? bgmin : (Number(bgCkie) + 1) : bgmin;
	var bgDate = new Date(),
		NewTimeStamp = bgDate.getTime();
	bgDate.setTime(NewTimeStamp + 60 * 1000 * 60 * 24); //cookie保存24小时
	cookie(bgCookieName, bgnum, {
		path: "/",
		expires: bgDate
	});

	switch (bgnum) {
		case 1:
			bgImg="http://img2.gamersky.com/bgpic/37wanbg_1008.jpg";	//广告大图片
			bgUrl="http://g.00tera.com/s/1/187/1251.html?uid=507800";	//连接地址
			TongJi="598844";
			break;
		case 2:
			bgImg="http://img2.gamersky.com/bgpic/37wanbg_1008.jpg";	//广告大图片
			bgUrl="http://g.00tera.com/s/1/187/1251.html?uid=507800";	//连接地址
			TongJi="598844";
			break;
	}

	$(".bgAdWrap").height(80).html('<a style="display:block;width:100%;height:100%;background:url(#);" target="_blank" href="' + bgUrl + '" data-itemid="' + TongJi + '" class="countHit countHitSql"></a>');

	bgHtm += '<div id="ADback" style="width:100%;height:' + bgWH + 'px;position:fixed;_position:absolute;left:0;top:' + bgTH + 'px;background:url(' + bgImg + ') center 0 no-repeat;">';
	bgHtm += '<a style="display:block;width:100%;height:' + bgWH + 'px;background:url(' + bgtop + ') repeat-x;" target="_blank" href="' + bgUrl + '" data-itemid="' + TongJi + '" class="countHit countHitSql"></a>';
	bgHtm += '<div class="Close" style="width:70px;height:28px;cursor:pointer;position:absolute;right:0;top:0;z-index:2;background:url(' + bgClose + ') no-repeat;"></div>';
	bgHtm += '</div>';
	//$("body").prepend(bgHtm);
	document.write(bgHtm);

	var $ADback = $("#ADback"),
		isIE6 = function() {
			return !!window.ActiveXObject && !window.XMLHttpRequest;
		} //判断IE6;
	$ADback.on("click", ".Close", function() {
		$ADback.remove();
		$("#ad_banner1").length == 0 && $(".bgAdWrap").removeAttr("style").html('');
	});

	function ADback() {
		var wt = $(window).scrollTop(),
			t = wt >= bgTH ? isIE6() == true ? wt : 0 : bgTH - wt;
		$ADback.css("top", t);
	}

	$(window).resize(function() {
		$ADback.css("height", $(window).height());
	}).scroll(ADback).trigger("scroll");

})();