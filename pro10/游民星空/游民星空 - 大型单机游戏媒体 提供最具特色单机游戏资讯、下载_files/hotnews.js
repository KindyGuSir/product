(function ($) {
    $.fn.HotNew = function (options) {
        return this.each(function () {
            var $this = $(this);
            var category_id = $this.attr("categoryid");
            var num = $this.attr("num");
            var url = "http://cm.gamersky.com/commentapi/hotnews?number=" + num;
            if (category_id != "" && category_id != undefined) {
                url += "&categoryId=" + category_id;
            }
            var arr = new Array();
            var countArr = new Array();
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: url,
                success: function (data) {
                    if (data.result.length > 0) {
                        var thisHtml = $this.find("#listTemplate").html();
                        var html = "";
                        for (var i = 0; i < data.result.length && i < num; i++) {
                            html += thisHtml.replace(/{ArticleUrl}/gm, data.result[i].url).replace(/{Title}/gm, data.result[i].title).replace(/{Count}/gm, data.result[i]["count"]).replace(/{FontHtml}/gm, data.result[i].font);
                        }
                        $this.html(html);
                    }
                }
            });
        });
    };
	$(document).ready(function(){
		$("#listTemplate").parent().HotNew();
	});
    
})(jQuery)