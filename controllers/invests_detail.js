'use strict';;
! function () {
  // 获取渲染数据
  getData();
  //下拉刷新
  // srcollBar('.scroll');
  // 遮罩层逻辑
  // modal();

  //获取渲染数据
  function getData() {
    var productUid = 1019;
    $.ajax({
      url: '/webp2p_interface_mysql/investment/product/' + productUid + '/detail',
      type: 'get',
      dataType: 'json',
      data: {},
      success: function (data) {
        if (data.result === '0000') {
          //成功
          console.log(data);
          data.data.closeTime = getDate(data.data.closeTime, "-");
          data.data.pTime = data.data.saleTime + 86400000;
          data.data.endTime = data.data.pTime + data.data.freezePeriod * 86400000;
          data.data.endTime = getDate(data.data.endTime, "-");
          data.data.pTime = getDate(data.data.pTime, "-");
          data.data.saleTime = getDate(data.data.saleTime, "-");
          var tplStr = template('detail_tpl', data);
          $('.scroll').html(tplStr);
        }
      },
      error: function (data) {
        if (data.result === 'FAPP_1111') {
          console.log(data.message);
        }
      }
    });
  }
  // //获取页面上移的距离  
  // function getScrollTop() {
  //   var scrollTop = 0;
  //   if (document.documentElement && document.documentElement.scrollTop) {
  //     scrollTop = document.documentElement.scrollTop;
  //   } else if (document.body) {
  //     scrollTop = document.body.scrollTop;
  //   }
  //   return scrollTop;
  // }
  //js转换时间戳
  function getDate(inputTime, style) {
    var date = new Date(inputTime);
    var Y = date.getFullYear() + style;
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + style;
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D;
  }
  //下拉刷新
  function srcollBar(ele) {

    var userList = document.querySelector(ele);
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
    getData();
  }

  // function modal() {
  //   var modal = document.querySelector('.modal');
  //   modal.style.height = window.innerHeight + 'px';

  //   // 注册单击事件
  //   var btn = document.querySelector("#alert");

  //   btn.addEventListener('click', function (e) {
  //     modal.style.display = "block";
  //     e.preventDefault();
  //   });
  //   // 关闭弹窗
  //   var close = document.querySelector('#close');
  //   close.addEventListener('click', function (e) {
  //     modal.style.display = "none";
  //   });

  //   // checkbox背景更换
  //   var checkbox = document.querySelector('.checkbox');
  //   var flag = true;
  //   checkbox.addEventListener('click', function (e) {
  //     this.style.backgroundImage = flag ? 'url(../public/image/checked.png)' : 'url(../public/image/uncheck.png)';
  //     flag = !flag;
  //   });
  // }

}();