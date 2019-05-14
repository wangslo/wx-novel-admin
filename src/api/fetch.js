export default fetch = {
  api_url: process.env.API_ROOT,
  init(url,data,callback) {
    var _this = this
    $.ajax({
      type: 'POST',
      url: _this.api_url + url,
      xhrFields: {withCredentials: true},
      crossDomain: true,
      data: data,
      dataType: 'json',
      success: function (res) {
        callback(res)
      }
    })
  },
  login(params,callback) {
    return this.init('/novelcms/pub/dologin.html', params, callback);
  },
  getAccountList(params,callback) {
    return this.init('/novelcms/user/privileges.html', params, callback);
  },
}
