/**
 * MVC模式(分离模型,视图,控制器)
 */

$(function() {
  // 初始化MVC对象
  var MVC = MVC || {};
  // 初始化MVC数据模型层
  MVC.model = function() {
    // 内部数据对象
    var M = {};
    // 服务都获取的数据
    M.data = {};
    // 配置数据,页面加载的时候提供
    M.config = {};
    // 其他对象提供调用接口(模型层对象操作方法)
    return {
      // 获取服务端数据
      getData: function(m) {
        // 根据字段获取数据
        return M.data(m);
      },
      //获取配置数据
      getConf: function(c) {
        // 根据配置数据字段获取配置数据
        return M.config(c);
      },
      // 设置服务器端数据
      setData: function(m, v) {
        M.data[m] = v;
        return this;
      },
      // 设置配置数据
      setConf: function(c, v) {
        M.config[c] = v;
        return this;
      }
    }
  }();
  // 初始化MVC视图层
  MVC.view = function() {
    // 模型层操作对象(需要数据模型层的数据)
    var M = M.data;
    // 内部创建视图的方法
    var V = {};
    // 获取视图接口的方法
    return function(v) {
      // 根据视图名称返回视图(由于获取的是一个方法,这里需要将该方法执行一遍以获取相应视图)
      V[v]();
    }
  }();
  // 初始化MVC控制器层
  MVC.controller = function() {
    var M = M.data;
    var M = M.view;
    //控制器创建对象(包含创建视图方法和一些交互)
    var C = {};
    // 执行控制器
    for (var i in C) {
      C[i] && C[i]();
    }
  }();
})
