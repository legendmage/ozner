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
            }
        })

}