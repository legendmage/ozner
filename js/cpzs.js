$(function () {
    initType();
    initProduct();

})

//商品分类
function productByType(obj, id) {
    if (!$(obj).hasClass('active')) {
        $("#cpzs .p-type li").removeClass('active');
        $(obj).addClass('active');
        initProduct(id);
    }
}



//初始化产品类别信息
function initType() {

    //获取商品分类列表
    $.utility.httpPost("http://myniuniu.net/Product.asmx/GetProductTypeList"
        , {
            "where": 'where isDelete=0 ',
            "pageIndex": 1,
            "pageSize": 4,
            "sort": 'order by [weight] desc ,createDate desc '
        }
        , function (reData) {
            if (reData.status == 200) {
                var data = JSON.parse(reData.data);
                $("#cpzs-type ul").html('');
                data.producttypelist.forEach(function (item) {
                    $("#cpzs-type ul").append('<li data-value="' + item.id + '" onclick="productByType(this,' + item.id + ')">' + item.typeName + '</li>');
                });
            }
        })
}

//初始化产品信息
function initProduct(typeId) {
    var where = "";
    if (typeId) {
        where = ' where productType.isDelete=0 and product.isDelete=0 and product.typeId= ' + typeId;
    } else {
        where = ' where productType.isDelete=0 and product.isDelete=0 ';
    }

    //获取商品列表
    $.utility.httpPost("http://myniuniu.net/Product.asmx/GetProductList"
        , {
            "where": where,
            "pageIndex": 1,
            "pageSize": 9,
            "sort": 'order by product.[weight] desc ,product.createDate desc '
        }
        , function (reData) {
            if (reData.status == 200) {
                var data = JSON.parse(reData.data);
                $("#cpzs-list ul").html('');
                data.productlist.forEach(function (item) {
                    var str = '<li>';
                    str += '<a class="p-item" href="' + item.outLink + '" target="_blank">';
                    str += '<div class="w-pl-pic">';
                    str += '<img src="http://myniuniu.net/' + item.imgUrl + '">';
                    str += '</div>';
                    str += '<h5 class="w-pl-title">' + item.name + '</h5>';
                    str += '<span class="buy">购买</span>';
                    str += '</a>';
                    str += '</li>';
                    $("#cpzs-list ul").append(str);
                });
                $("#cpzs-total").val(data.productlist1[0].total);
                $("#cpzs-pageindex").val(data.productlist1[0].pageIndex);
                initPage();
            }
        })

}

function initPage() {
    var str = '<li data-index="prev" onclick="clickPage(-1)">上一页</li>';
    var total = $("#cpzs-total").val();
    var index = $("#cpzs-pageindex").val();
    var forIndex = 0;
    if ((parseInt(total) % 9) == 0) {
        forIndex = parseInt(parseInt(total) / 9);
    } else {
        forIndex = parseInt(parseInt(total) / 9) + 1;
    }

    for (var i = 0; i < forIndex; i++) {
        if (index == (i + 1)) {
            str += '<li class="pageindex active" data-index="' + (i + 1) + '">' + (i + 1) + '</li>';
        } else {
            str += '<li class="pageindex" data-index="' + (i + 1) + '">' + (i + 1) + '</li>';
        }
    }
    str += '<li data-index="next">下一页</li>';

    $("#cpzs-page ul").html("");
    if (total > 0) {
        $("#cpzs-page ul").append(str);
    }
}


function clickPage(pIndex) {
    debugger
    var total = $("#cpzs-total").val();
    var index = $("#cpzs-pageindex").val();
    var forIndex = 0;
    if ((parseInt(total) % 9) == 0) {
        forIndex = parseInt(parseInt(total) / 9);
    } else {
        forIndex = parseInt(parseInt(total) / 9) + 1;
    }
    //上一页
    if (pIndex == -1 && index > 1 && index <= forIndex) {
        $('#cpzs-page ul li.pageindex').each(function () {
            var self = this;
            var value = $(self).attr('data-index');
            if (value == (index - 1)) {
                $(self).addClass('active');
            } else {
                $(self).removeClass('active');
            }
        });
    }
    //下一页
    if (pIndex == -2 && index >= 1 && index < forIndex) {
        $('#cpzs-page ul li.pageindex').each(function () {
            var self = this;
            var value = $(self).attr('data-index');
            if (value == (index + 1)) {
                $(self).addClass('active');
            } else {
                $(self).removeClass('active');
            }
        });
    }
    //点击页
    if (pIndex != index) {
        $('#cpzs-page ul li.pageindex').each(function () {
            var self = this;
            var value = $(self).attr('data-index');
            if (value == pIndex) {
                $(self).addClass('active');
            } else {
                $(self).removeClass('active');
            }
        });
    }
}
