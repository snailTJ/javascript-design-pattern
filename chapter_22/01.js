/**
 * 访问者模式
 *
 * 创建一个访问器,将方法封装在内部
 */

var Visitor = (function() {
  return {
    // 截取方法
    splice: function() {
      var args = Array.prototype.splice.call(arguments, 1);
      return Array.prototype.splice.apply(arguments[0], args);
    },
    // 追加数据方法
    push: function() {
      var len = arguments[0].length || 0;
      var args = this.splice(arguments, 1);
      arguments[0].length = len + arguments.length - 1;
      return Array.prototype.push.apply(arguments[0], args);
    },
    // 弹出最后一个元素
    pop: function() {
      return Array.prototype.pop.apply(arguments[0]);
    }
  }
})();

// 使用(操作类数组)
var a = {};
Visitor.push(a, 1, 2, 3);
console.log(a)
