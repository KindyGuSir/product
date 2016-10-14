///<reference path="/js/jquery-1.8.3.js"/>

Number.prototype.toFixed = function (decimalPlaces) {
    var factor = Math.pow(10, decimalPlaces || 0);
    var v = (Math.round(this * factor) / factor).toString();
    if (v.indexOf('.') >= 0) {
        return v + factor.toString().substr(v.length - v.indexOf('.'));
    }
    return v + '.' + factor.toString().substr(1);
};

(function ($) {
    $.fn.ShowVote = function (options) {
        return this.each(function () {
            var $this = $(this);
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://db5.gamersky.com/Vote/ShowVote.aspx",
                data: {
                    id: $this.attr("voteId"),
                    json: "1"
                },
                success: function (data) {
                    $this.find("#voteId").val($this.attr("voteId"));
                    var html = "<li class='tit'><div class='t1'>选项</div><div class='t2'>比例</div><div class='t3'>票数</div></li>";
                    for (var i = 0; i < data.items.length; i++) {
                        var item = data.items[i];
                        html += '<li class="txt">';
                        html += '<div class="t1">';
                        html += (i + 1) + "、";
                        html += item.Title;
                        html += '</div><div class="t2"><div class="bili"></div><div class="jindu"><div class="tiao"></div></div></div><div class="t3"><span class="votes">' + item.TotalNumber + '</span>票</div></li>';
                    }
                    $(".Rtit").find(".Znum").html(data.total);
                    $this.find("ul").html(html);

                    var Znum = 0;
                    $("ul.Rcon .votes").each(function (i) { Znum += parseInt($(this).html()); });
                    $(".Rtit").find(".Znum").html(Znum);
                    $("ul.Rcon li.txt").each(function (i) {
                        var jdw = $(this).find(".jindu").width(), num = parseInt($(this).find(".votes").html());
                        $(this).find(".tiao").animate({ width: (jdw * (num / Znum)) }, 500);
                        $(this).find(".bili").html((num / Znum * 100).toFixed(2) + "%");
                    });
                }
            });
        });
    };

    $(document).ready(function () {
        $("#votebar").ShowVote();
        $("#btnVote").click(function () {
            var cla = $("#ID").val();
            var issuccess = true;
            var ary = new Array();
            var checkedElement = $(".votelist li.txt").find("input:checked");
            if (checkedElement.length == 0) {
                alert("请选择投票项！");
                issuccess = false;
                return false;
            }
            if (checkedElement.length == 1) {
                ary.push($(".votelist li.txt").find("input:checked").val());
            }
            if (checkedElement.length > 1) {
                for (var i = 0; i < checkedElement.length; i++) {
                    ary.push(checkedElement[i].value);
                };
            }
            if (!issuccess || ary.length <= 0) {
                return;
            }
            $.ajax({
                type: "GET",
                url: "http://db5.gamersky.com/Vote/ShowVote.aspx",
                dataType: "jsonp",
                data: {
                    json: "2",
                    id: cla,
                    vote: ary.join(",")
                },
                success: function (responseJson) {
                    switch (responseJson.status) {
                        case "ok":
                            alert("感谢你的投票");
                            break;
                        case "err":
                            alert(responseJson.message);
                            break;
                    }
                }
            });
        });
    });
})(jQuery);