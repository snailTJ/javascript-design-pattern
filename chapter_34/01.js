/**
 * 参与者模式
 *
 * 让一个函数在绑定一个特定的上下文环境,并且把多个参数转化单参数函数
 */

if (!Function.prototype.bind) {
  Function.prototype.bind = function(context) {
    // 保存当前第一个后面的所有参数
    var args = Array.prototype.slice.call(arguments, 1);
    var that = this;
    // 返回一个新函数
    return function() {
      // 将参数数组化
      var _args = args.concat(Array.prototype.slice.call(arguments));
      return that.apply(context, _args);
    }
  }
}

//以上的情况就是我们实现了一个bind函数
//bind函数特点
//  1.多参数变单参数
//  2.绑定一个函数的执行上下文
//  3.返回一个新的函数
//  4.由于保存了一些参数在闭包里,会消耗一部分资源
