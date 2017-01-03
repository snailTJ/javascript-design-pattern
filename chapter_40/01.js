/**
 * MVP
 *     在mvc中我们知道往往为了渲染视图而直接引用或者修改数据层,在并且是在controller不知情的情况下
 *     所以现在我们使用MVP模式,将视图层和数据模型层解耦,让Presenter去管理所有的业务逻辑,这样数据层模型只能管理数据,
 *     视图层也只是创建视图模板
 */

/**
 * 和MVC相比不同之处在于使用管理器(presenter)统一管理view创建和model获取,解耦了view和modle的耦合
 */

(function(window) {
  // MVP构造函数
  var MVP = function() {};
  // 数据层
  MVP.model = function() {
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
  // 视图层
  MVP.view = function() {
    return function(str) {
      // 将参数字符串转换成期望模板
      return html;
    }
  }();
  // 管理层
  MVP.presenter = function() {
    var V = MVP.view;
    var M = MVP.model;
    var C = {};
    return {
      // 执行方法
      init: function() {
        for (var i in C) {
          C[i] && C[i](M, V, i);
        }
      }
    }
  }();
  // MVP入口
  MVP.init = function() {
      this.presenter.init();
    }
    // 暴露MVP对象
  window.MVP = MVP
})(window);
