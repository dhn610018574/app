; !function () {
    getData();
    function getData() {
        $.ajax({
            url: '/webp2p_interface_mysql/investment/product/record',
            type: 'post',
            dataType: 'json',
            data: {
                contractPrefix:"F3M-1-", 
                pageNumber: "0", 
                pageSize: "10"
            },
            success: function (data) {
                console.log(data);
            },
            error: function () {
                console.log('error');
            }
        })
    }



    function upDown() {
        var userList = document.querySelector('#user-list');
        // 开始滑动的坐标
        var startX, startY;
        // 移动过程改变的坐标
        var moveX, moveY;
        // 滑动结束的坐标
        var endX, endY;
        // ul开始滑动的相对坐标
        var x, y = 0;

        userList.addEventListener('touchstart', function (e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            userList.style.transition = 'none';
        });

        userList.addEventListener('touchmove', function (e) {
            moveX = e.touches[0].clientX;
            moveY = e.touches[0].clientY;
            y = moveY - startY;
            if (y > 0 && y <= 200) {
                userList.style.transform = "translateY(" + y + "px)";
            }
        });

        userList.addEventListener('touchend', function (e) {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            userList.style.transition = 'all 0.5s';
            userList.style.transform = "translateY(0px)";
        });
    }

}();