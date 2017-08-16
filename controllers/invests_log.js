; !function () {
    getData();
    dropDown();
    function getData() {
        $.ajax({
            url: '/webp2p_interface_mysql/investment/product/record?contractPrefix=F3M-1-&pageNumber=0&pageSize=10',
            type: 'get',
            dataType: 'json',
            data: {},
            success: function (data) {
                console.log(data);
                if (data.result === '0000') {
                    data.data.lsirr.forEach(function (value, index) {
                        data.data.lsirr[index].investDate = getDate(data.data.lsirr[index].investDate, '-');
                    })
                    var invests_log_tplStr = template('invests_log_tpl', { list: data.data.lsirr });
                    var invest_totalStr = '<h2>共<strong>' + data.data.count + '</strong>位用户投资</h2>'
                    $('#user-list').html(invests_log_tplStr);
                    $('.users').html(invest_totalStr);
                }
            },
            error: function (data) {
                if (data.result === 'FAPP_1111') {
                    console.log(data.message);
                }
            }
        });
    }
    // 下拉刷新
    function dropDown() {
        var concatList = document.querySelector('.concat-list');
        var userList = document.querySelector('#user-list');
        // 开始滑动的坐标
        var startX, startY;
        // 移动过程改变的坐标
        var moveX, moveY;
        // 滑动结束的坐标
        var endX, endY;
        // ul开始滑动的相对坐标
        var x, y = 0;

        concatList.addEventListener('touchstart', function (e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            userList.style.transition = 'none';
        });

        concatList.addEventListener('touchmove', function (e) {
            moveX = e.touches[0].clientX;
            moveY = e.touches[0].clientY;
            y = moveY - startY;
            console.log(y);
            if (y > 0 && y <= 300) {
                userList.style.transform = "translateY(" + y + "px)";
            }
        });

        concatList.addEventListener('touchend', function (e) {
            var top = userList.offsetTop;
            console.log(top);
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            userList.style.transition = 'all 0.5s';
            userList.style.transform = "translateY(0px)";
            if (top > 70 && y>100) {
                getData();
            }
        });

    }

    //js转换时间戳
    function getDate(inputTime, style) {
        var date = new Date(inputTime);
        var Y = date.getFullYear() + style;
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + style;
        var D = date.getDate() + ' ';
        var h = date.getHours() < 10 ? ('0' + date.getHours() + ':') : ':';
        var m = date.getMinutes() < 10 ? ('0' + date.getMinutes() + ':') : ':';
        var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m + s;
    }

}();