/**
 *异步模块模式
 */

// 闭包环境
(function(F) {
  // 模块缓存器,存储已创建的模块
  var moduleCache = {};

  // 获取文件路径
  var getUrl = function(moduleName) {
    return String(moduleName).replace(/\.js$/g, '') + '.js';
  };

  // 加载脚本
  var loadScript = function(src) {
    var _script = document.createElement('script');
    _script.type = 'text/javascript';
    _script.charset = 'UTF-8';
    _script.async = true;
    _script.src = src;
    document.getElementsByTagName('head')[0].appendChild(_script);
  }

  /**
   * 设置模块并执行模块构造函数
   * @param {[type]}   moduleName [模块id名称]
   * @param {[type]}   params     [依赖模块]
   * @param {[type]}   callback     [模块构造函数]
   */
  var setModule = function(moduleName, params, callback) {
    // 模块容器,模块文件加载完成回调函数
    var _module, fn;
    if (moduleCache[moduleName]) {
      // 获取模块
      _module = moduleCache[moduleName];
      // 设置模块已经加载完成
      _module.status = 'loaded';
      // 矫正模块接口
      _module.exports = callback ? callback.apply(_module, params) : null;
      // 执行模块文件加载完成回调函数
      while (fn = _module.onload.shift()) {
        fn(_module.exports)
      }
    } else {
      // 模块不存在(匿名模块),则直接执行构造函数
      callback && callback.apply(null, params);
    }
  }

  /**
   * 异步加载依赖模块文件
   * @param  {[type]}   moduleName [模块的路径]
   * @param  {Function} callback   [模块加载完成后的回调函数]
   */
  var loadModule = function(moduleName, callback) {
    // 依赖的模块
    var _module;
    // 如果依赖模块被要求加载
    if (moduleCache[moduleName]) {
      // 获取模块信息
      _module = moduleCache[moduleName];
      // 如果模块加载完成
      if (_module.status === 'loaded') {
        // 执行回调函数
        setTimeout(callback(_module.exports), 0);
      } else {
        // 缓存模块所在文件加载完成回调函数
        _module.onload.push(callback);
      }
    } else {
      // 模块第一次被依赖
      moduleCache[moduleName] = {
        // 模块的id
        moduleName: moduleName,
        // 模块对应加载状态
        status: 'loading',
        // 模块的接口
        exports: null,
        // 模块对应文件加载完成回调函数缓冲器
        onload: [callback];
      };
      // 加载对应模块对应文件
      loadScript(getUrl(moduleName));
    }
  }

  /**
   * 创建或者调用模块方法
   * @param  {[type]}   url      [模块url]
   * @pram  {[type]}   modDeps  [依赖模块]
   * @param  {Function} callback [模块主函数]
   */
  F.module = funtion(url, modDeps, callback) {
    var args = Array.prototype.call(arguments);
    var callback = args.pop();
    // 获取依赖模块(数组)
    var deps = (arguments.length && args[args.length - 1] instanceof Array ? args.pop() : []);
    //获得模块的url(模块id)
    var url = args.length ? args.pop() : null;
    // 依赖模块序列
    var parmas = [];
    // 未加载的依赖模块统计数
    var depsCount = 0;
    // 依赖模块中的序列索引值
    var i = 0;
    // 依赖模块的长度
    var len;
    // 获取依赖模块长度
    if (len = deps.length) {
      // 遍历依赖模块
      while (i < len) {
        (function(i) {
          // 增加未加载模块数量统计
          depsCount++;
          // 异步加载模块
          loadModule(deps[i], function(mod) {
            // 依赖模块序列中添加依赖模块接口引用
            parmas[i] = mod;
            // 依赖模块记载完成,未加载模块统计减1
            depsCount--;
            // 如果加载模块全部加载完成
            if (depsCount == 0) {
              // 在模块缓存器中矫正该模块,并执行构造函数
              setModule(url, parmas, callback)
            }
          })
        })(i);
        i++;
      }
    } else {
      // 无模块依赖
      // 在模块缓存器中矫正该模块,并执行构造函数
      setModule(url, [], callback)
    }
  }

})(function() {
  // 创建模块管理器F,并保存在全局作用域中
  return window.F = {};
}());
