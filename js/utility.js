$(function () {
    var utility = {
        httpGet: function (url, data, callback) {
            data = data || {};
            callback = callback || function () { };
            $.ajax({
                url: url,
                type: "GET",
                data: data,
                dataType: "json",
                contentType: "application/json",
                success: function (res) {
                    callback({
                        status: 200,
                        data: res.d
                    })
                },
                error: function (xhr) {
                    callback({
                        status: xhr.status,
                        data: xhr.responseJSON
                    })
                }

            })
        },
        httpGetAsync: function (url, data, callback) {
            data = data || {};
            callback = callback || function () { };
            $.ajax({
                url: url,
                type: "GET",
                async: false,
                data: data,
                dataType: "json",
                contentType: "application/json",
                success: function (res) {
                    callback({
                        status: 200,
                        data: res.d
                    })
                },
                error: function (xhr) {
                    callback({
                        status: xhr.status,
                        data: xhr.responseJSON
                    })
                }

            })
        },
        httpPost: function (url, data, callback) {
            data = data ? JSON.stringify(data) : "{}";
            callback = callback || function () { };
            $.ajax({
                url: url,
                type: "POST",
                data: data,
                dataType: "json",
                contentType: "application/json",
                success: function (res) {
                    callback({
                        status: 200,
                        data: res.d
                    })
                },
                error: function (xhr) {
                    callback({
                        status: xhr.status,
                        data: xhr.responseJSON
                    })
                }

            })
        },
        httpPostAsync: function (url, data, callback) {
            data = data ? JSON.stringify(data) : "{}";
            callback = callback || function () { };
            $.ajax({
                url: url,
                type: "POST",
                async: false,
                data: data,
                dataType: "json",
                contentType: "application/json",
                success: function (res) {
                    callback({
                        status: 200,
                        data: res.d
                    })
                },
                error: function (xhr) {
                    callback({
                        status: xhr.status,
                        data: xhr.responseJSON
                    })
                }

            })
        },

        //日期格式化
        dateFtt: function (fmt, date) {
            var o = {
                "M+": date.getMonth() + 1,                 //月份   
                "d+": date.getDate(),                    //日   
                "h+": date.getHours(),                   //小时   
                "m+": date.getMinutes(),                 //分   
                "s+": date.getSeconds(),                 //秒   
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
                "S": date.getMilliseconds()             //毫秒   
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }

    }

    $.utility = utility;


    //数组扩展
    //移除制定元素
    Array.prototype.remove = function (val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };


})