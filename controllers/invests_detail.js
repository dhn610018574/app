'use strict';;
! function () {
  // 获取渲染数据
  getData();
  //下拉刷新
  // srcollBar('#wrapper');
  // 遮罩层逻辑
  model();

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
  //获取页面上移的距离  
  function getScrollTop() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
      scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
      scrollTop = document.body.scrollTop;
    }
    return scrollTop;
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
  //下拉刷新
  function srcollBar(ele) {

    // 外围大盒子
    var infoWrap = document.querySelector(ele);
    //　火车头
    var scrollCar = infoWrap.querySelector('.scroll');

    var startY = 0; // 记录滑动开始的值
    var centerY = 0;

    var downMax = 100; // 下拉的最大值
    // var upMax = -(scrollCar.offsetHeight - infoWrap.offsetHeight + downMax); // 上拉的最大值

    // 向上的反弹值
    var bounceUpMax = -(scrollCar.offsetHeight - infoWrap.offsetHeight);

    // 这句话一定要放在事件的前面
    if (test()) {
      return;
    }

    // 绑定touch事件
    scrollCar.addEventListener('touchstart', touchstartHandler);
    scrollCar.addEventListener('touchmove', touchmoveHandler);
    scrollCar.addEventListener('touchend', touchendHandler);

    function touchstartHandler(e) {

      // 开始的手指落点
      startY = e.changedTouches[0].clientY;
    };

    function touchmoveHandler(e) {

      // 清除过渡
      scrollCar.style.transition = null;

      // 滑动的距离
      var dy = e.changedTouches[0].clientY - startY;

      var tempY = centerY + dy;

      // 在move里面判断，当滑动到一定的值的时候就不允许在往上或者往下滑动
      if (tempY >= downMax) {
        tempY = downMax;
      // } else if (tempY <= upMax) {
        // tempY = upMax;
      }
      scrollCar.style.transform = 'translateY(' + tempY + 'px)';
    };

    function touchendHandler(e) {

      var dy = e.changedTouches[0].clientY - startY;
      // 将最终的位置赋值给centerY 以便下一次移动的时候基于上一次的位置在滑动
      centerY += dy;

      // 反弹的逻辑
      if (centerY > 0) {
        // 同步centerY 为了move的时候基于这个值
        centerY = 0;
        scrollCar.style.transition = 'transform .5s';
        scrollCar.style.transform = 'translateY(' + centerY + 'px)';
      } else if (centerY < bounceUpMax) {
        // 同步centerY 为了move的时候基于这个值
        centerY = bounceUpMax;
        scrollCar.style.transition = 'transform .5s';
        scrollCar.style.transform = 'translateY(' + centerY + 'px)';
      }
    };

    function test() {
      return scrollCar.offsetHeight <= infoWrap.offsetHeight
    }
  }

  function model(){
    var modal = document.querySelector('.modal');
    modal.style.height = window.innerHeight + 'px';

    // 注册单击事件
    var btn = document.querySelector("#alert");

    btn.addEventListener('click', function (e) {
        modal.style.display="block";
        e.preventDefault();
    });
    // 关闭弹窗
    var close = document.querySelector('#close');
    close.addEventListener('click', function (e) {
        modal.style.display="none";
    });

    // checkbox背景更换
    var checkbox = document.querySelector('.checkbox');
    var flag = true;
    checkbox.addEventListener('click', function (e) {
        this.style.backgroundImage = flag ? 'url(../public/image/checked.png)' : 'url(../public/image/uncheck.png)';
        flag = !flag;
    });
  }

}();