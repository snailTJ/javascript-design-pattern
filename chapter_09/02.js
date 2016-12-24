/**
 * 具有局部变量的强大的单例
 *     js中static是一个保留字,所有我们在js要想实现静态变量的话,可以使用闭包
 */

var UserInfo = (function() {
  //利用闭包使单体有自己的私有局部变量
  var name = '';
  var code = '';
  //先模拟一个ajax操作
  var ajax = {};
  ajax.request = function(url, fn) {
      if (true) {
        fn('baidu.com', 'hujian')
      }
    }
    //利用ajax访问数据库取得数据
  ajax.request('www.baidu.com', function(n, c) {
    name = n;
    code = c;
  })
  return {
    name: name,
    code: code
  }
})()

console.log(UserInfo.name);
