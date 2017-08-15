'use strict';;
! function () {
  // 获取渲染数据
  getData();
  //下拉刷新
  srcollBar('.scroll');

  //获取渲染数据
  function getData() {
    var productUid = GetQueryString('uuid');
    console.log(productUid);
    $.ajax({
      url: '/webp2p_interface_mysql/investment/product/' + productUid + '/detail',
      type: 'get',
      dataType: 'json',
      data: {},
      success: function (data) {
        console.log(data);
        if (data.result === '0000') {
          //成功
          console.log(data.data.tipsStart);
          data.data.closeTime = getDate(data.data.closeTime, "-");
          data.data.pTime = data.data.saleTime + 86400000;
          data.data.endTime = data.data.pTime + data.data.freezePeriod * 86400000;
          data.data.endTime = getDate(data.data.endTime, "-");
          data.data.pTime = getDate(data.data.pTime, "-");
          data.data.saleTime = getDate(data.data.saleTime, "-");
          data.data.progress = parseInt(data.data.finishAmount / data.data.planAmount * 100);
          data.data.yInterestRate = (100 * data.data.yInterestRate + '').substr(0, 4);
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
    getUserData();
  }
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
  // 获取用户信息
  function getUserData() {
    $.ajax({
      url: '/webp2p_interface_mysql/investment/product/record?contractPrefix=F3M-1-&pageNumber=0&pageSize=5',
      type: 'get',
      dataType: 'json',
      data: {},
      success: function (data) {
        // console.log(data.lsirr[1].headImgUrl);
        if (data.result === '0000') {
          var invest_userStr = template('user_tpl', data);
          $('.con-icon').html(invest_userStr);
        }
      },
      error: function (data) {
        if (data.result === 'FAPP_1111') {
          console.log(data.message);
        }
      }
    })

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

  }
  //获取url参数
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  }

}();