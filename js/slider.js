
$(function ($) {

    var m = {
        //轮播
        sliderImgWithNumber: function () {
            var currentElement = $(".slider .slider-item.active-img");
            var nextElement = currentElement.next();

            var currentNumber = $(".slider .slider-item-number.active-number");
            var nextNumber = currentNumber.next();
            //判断是否 下个图片是否存在  不存在，从第一张开始轮播
            if (nextElement.length > 0) {
                nextElement.addClass("active-img");
                currentElement.removeClass("active-img");

                nextNumber.addClass("active-number");
                currentNumber.removeClass("active-number");
            } else {
                $(".slider .slider-item").removeClass("active-img");
                var fristElement = $(".slider .slider-item")[0];
                $(fristElement).addClass("active-img");

                $(".slider .slider-item-number").removeClass("active-number");
                var fristNumber = $(".slider .slider-item-number")[0];
                $(fristNumber).addClass("active-number");
            }
        }
    }

    //adv 自动轮播
    var sliderInterVal = setInterval(m.sliderImgWithNumber, 5000);


    //鼠标点击时，重新开始计时器
    $(".slider-item-number").click(function () {
        clearInterval(sliderInterVal);
        $(".slider .slider-item-number").removeClass("active-number");
        $(this).addClass("active-number");

        var index = this.value;
        $(".slider .slider-item").removeClass("active-img");
        var currentImg = $(".slider .slider-item")[index - 1]
        $(currentImg).addClass("active-img");
        //开启轮播
        sliderInterVal = setInterval(m.sliderImgWithNumber, 5000);

    })

})


