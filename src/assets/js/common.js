export default {
  appid: 'wx45a447d8dc271447',
  h5_url: 'http://test-dev.dftoutiao.com/janfly_html/wx-novel/',
  // appid: 'wxc9703ea13ecfacab',
  // h5_url: 'http://static.dpqct.com/wxc9703ea13ecfacab/',
  getDate: function(value){
    var s = '';
    var date = new Date();
    date.setTime(value);
    // 计算本地时间与GMT时间的偏移量
    var len = date.getTime();
    var offset = date.getTimezoneOffset() * 60000;
    var utcTime = len + offset;
    date = new Date(utcTime + 3600000 * 8) // 按照东八区获得时间

    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    s = y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
    return s;
  }
}

