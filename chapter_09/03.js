/**
 * 惰性单体
 *     有时候需要单体延迟创建
 */

var LazySingle = (function() {
  var userInfo = ''; //私有变量
  function init() {
    var name = '';
    var code = '';
    //先模拟一个ajax操作
    var ajax = {};
    ajax.request = function(url, fn) {
      if (true) {
        fn('baidu.com', 'hujian')
      }
    };
    //利用ajax访问数据库取得数据
    ajax.request('www.baidu.com', function(n, c) {
      name = n;
      code = c;
    })
    return {
      name: name,
      code: code
    }
  };
  return {
    getInstance: function() {
      if (userInfo) {
        return userInfo;
      } else {
        userInfo = init();
        return userInfo;
      }
    }
  }
})()

// 使用
console.log(LazySingle.getInstance().name);
