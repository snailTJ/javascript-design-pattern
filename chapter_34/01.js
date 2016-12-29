/**
 * 等待者模式
 *
 * 现在就是实现一个并发操作,等待所有的并成功在执行之后的操作
 */

// 等待者模式
var Waiter = function() {
  // 注册了的等待对象容器
  var dfd = [];
  // 成功回调方法的容器
  var doneArr = [];
  //失败回调方法容器
  var failArr = [];
  // 缓存Array方法slice
  slice = Array.prototype.slice;
  // 保存当前等待者对象
  var that = this;
  //监控对象类
  var Primise = function() {
    //监控对象是否解决成功状态
    this.resolved = false;
    // 监控是否解决失败状态
    this.rejected = false;
  };
  // 监控对象原型类方法
  Primise.prototype = {
    //解决方法
    resolve: function() {
      //设置当前监控对象
      this.resolved = true;
      // 如果没有监控对象则取消
      if (!dfd.length) return;
      //遍历所有注册了的监控对象

      //这里一定注意一定要从后面向前循环,不然会出错
      for (var i = dfd.length - 1; i >= 0; i--) {
        // 如果有任何一个监控对象没有解或者解决失败则返回
        if (dfd[i] && !dfd[i].resolved || dfd[i].rejected) {
          return;
        };
        // 清除监控对象
        dfd.splice(i, 1);
      }
      // 执行成功回调方法
      _exec(doneArr);
    },
    //解决失败
    reject: function() {
      // 设置当前对象解决失败
      this.rejected = true;
      // 如果没有监控对象则取消
      if (!dfd.length) return;
      // 清楚所有监控对象
      dfd.splice(0);
      //执行解决成功回调方法
      _exec(failArr);
    }
  };
  //创建监控对象
  that.Deferred = function() {
    return new Primise();
  };
  // 回调执行方法
  function _exec(arr) {
    // 回调方法很简单,就是遍历成功或者失败回调函数容器,然后依次执行内部的方法
    for (var i = 0; i < arr.length; i++) {
      try {
        arr[i] && arr[i]()
      } catch (e) {
        console.log(e)
      }
    }
  };
  // 监控异步方法 参数:监控对象
  this.when = function() {
    // 设置监控对象
    dfd = slice.call(arguments);
    // 获取监控对象数组长度
    for (var i = 0; i < dfd.length; i++) {
      // 如果不存在监控对象,或者监控对象已经已经解决,或者不是监控对象
      if (!dfd[i] || dfd[i].resolved || dfd[i].rejected || !dfd[i] instanceof Promise) {
        dfd.splice(i, 1);
      }
    }
    // 返回等待者对象
    return that;
  };
  // 解决成功回调函数添加
  this.done = function() {
    // 向成功回调函数容器中添加回调方法
    doneArr = doneArr.concat(slice.call(arguments));
    return that;
  };
  // 解决失败回调函数添加方法
  this.fail = function() {
    // 向失败回调函数容器中添加回调方法
    failArr = failArr.concat(slice.call(arguments));
    return that;
  }
};


// 测试
var waiter = new Waiter();
var first = function() {
  // 创建监听对象
  var dtd = waiter.Deferred();
  setTimeout(function() {
    console.log('first finish');
    // 发布解决成功该消息
    dtd.resolve();
  }, 1000);
  return dtd;
}();

var second = function() {
  var dtd = waiter.Deferred();
  setTimeout(function() {
    console.log('second finish');
    // 发布解决成功该消息
    dtd.resolve();
  }, 2000);
  return dtd;
}();

// 监听两个彩蛋工作状态
waiter.when(first, second).done(function() {
  console.log('success 1111');
}).fail(function() {
  console.log('fail');
})

//留了一个问题?怎样才能运用等待者模式监听两个ajax请求成功,并且成功函数中获取到成功的值?
