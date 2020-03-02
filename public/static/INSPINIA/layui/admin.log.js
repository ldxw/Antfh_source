layui.use(['laypage', 'laytpl'], function () {
    var   laypage = layui.laypage
        , laytpl = layui.laytpl;


    var orderList = {
        init: function () {
            $("#btnSearch").click(function () {
                orderList.loadPage(1);
            });
            orderList.loadPage(1);
        },
        loadPage: function (pageIndex) {
            $.ajax("getList", {
                data: {
                    pageIndex: pageIndex
                    , pageSize: 15
                    , uid: $.trim($("#uid").val())
                    , module: $.trim($("#module").val())
                    , starttime: $.trim($("#starttime").val())
                    , endtime: $.trim($("#endtime").val())
                    , ts: (new Date().getTime())
                },
                type: "GET",
                dataType: 'json',
                beforeSend: function () {
                    layer.msg("加载中......", { icon: 16, time: 0 });
                },
                success: function (d) {
                    layer.closeAll();
                    laytpl($("#tempList").html()).render(d, function (html) {
                        $("#view").html(html);
                    });

                    laypage.render({
                        elem: 'page'
                        , limit: 15
                        , curr: d.data.current_page
                        , count: d.data.total
                        , layout: ['count', 'prev', 'page', 'next','skip']
                        , skip: true
                        , jump: function (obj, first) {
                            if (!first) {
                                var curr = obj.curr;
                                orderList.loadPage(curr);
                            }
                        }
                    });

                    $(document).ready(function() {
                        setTimeout(function() {
                            toastr.options = {
                                closeButton: true,
                                progressBar: true,
                                showMethod: 'slideDown',
                                timeOut: 4000
                            };
                            toastr.success('列表数据加载成功', '行为日志列表');

                        }, 1300);
                    });
                },
                error: function (x, t, e) {
                    layer.closeAll();
                }
            });
        }
    };
    orderList.init();
});
function pickedFunc() {
    $("#starttime").attr("value", $dp.cal.getNewDateStr());
}
function pickedFunc2() {
    $('#endtime').attr("value", $dp.cal.getNewDateStr());
}