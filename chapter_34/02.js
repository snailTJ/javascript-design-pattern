/**
 * 反科里化
 *
 * 柯里化是特定绑定上下文提供针对性,是减少适用范围,但是反柯里化确实刚好相反
 * 是提高适用性
 */

if (!Function.prototype.uncurry) {
  Function.prototype.uncurry = function() {
    var that = this;
    return Function.prototype.call.apply(that, arguments);
  }
}
