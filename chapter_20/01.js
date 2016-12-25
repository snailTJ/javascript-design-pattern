/**
 * 策略模式
 */

// 表单验证策略对象
var InputStrategy = function() {
  // 策略对象
  var strategy = {
    // 是否为空
    notNull: function() {};
    // 是否是一个数字
    number: function() {};
    // 是否是本地电话
    phone: function() {}
  };
  // 返回一个接口方便对策略算法的调用
  return {
    // 验证接口type算法的value值
    check: function(type, value) {
      // 去吃收尾空白行
      value = value.replace(/^\s+|\s+$/g, '');
      return strategy[type] ? strategy[type]() : '该类型没有检测的方法';
    },
    //添加一个接口去增加策略
    addStrategy: function(type, fn) {
      strategy[type] = fn;
    }
  }
}();
