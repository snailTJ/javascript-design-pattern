/**
 * 同步模块开发
 *
 * 步骤
 * 1.首先创建一个模块管理器,为其定义define方法
 * 2.定义模块调用方法
 */

// 定义模块管理器单体对象
var F = F || {};
/**
 * 定义模块方法(理论上,模块方法应该放在闭包实现,可以隐藏内部信息)
 * @parmas str 模块路由
 * @params fn  模块方法
 */
F.define = function(str, fn) {
  //解析模块路由
  var parts = str.split('.');
  // old为当前的祖父模块,parent为当前父模块
  // 如果在闭包中,为了屏蔽对模块的直接访问,建议将模块添加给闭包内部私有变量
  var old = parent = this;
  var i = len = 0;
  // 如果第一个模式是模块管理器单体对象,则移除
  if (parts[0] === 'F') {
    parts = parts.slice(1);
  }
  // 屏蔽对define与module模块方法的重写
  if (parts[0] === 'define' || parts[0] === 'module') {
    return;
  }
  // 遍历路由并轻易每层模块
  for (len = parts.length; i < len; i++) {
    // 如果父模块不存在当前模块
    if (typeof parent[parts[i]] === 'undefined') {
      // 声明当前模块
      parent[parts[i]] = {};
    }
    // 缓存下一层级的祖父模块
    old = parent;
    // 缓存下一级的父模块
    parent = parent[parts[i]]
  }
  // 如果定义了fn方法
  if (fn) {
    // 此时i等于parts.length,故减1
    old[parts[--i]] = fn();
  }
  // 返回模块单体对象
  return this;
}

// 创建模块
F.define('string', function() {
  // 接口方法
  return {
    // 清楚两边字符串空白部分
    trim: function(str) {
      return str.replace(/^\s+|\s+$/g, '');
    }
  }
})


/**
 * 模块调用方法
 */

F.module = function() {
  // 将转化为数组
  var args = [].slice.call(arguments);
  // 获取回调函数
  var fn = args.pop();
  // 获取依赖模块,如果args[0]是数组,则依赖模块为args[0],否则依赖模块为arg
  var parts = args[0] && args[0] instanceof Array ? args[0] : args;
  // 依赖模块列表
  var modules = [];
  // 模块路由
  modIDs = '';
  //依赖模块索引
  var i = 0;
  // 依赖模块长度
  var ilen = parts.length;
  // 父模块,模块路由层级索引,模块路由层级长度
  var parent, j, jlen;
  // 遍历模块依赖
  while (i < ilen) {
    // 如果是模块路由
    if (typeof parts[i] === 'string') {
      // 设置当前模块父对象(F)
      parent = this;
      // 解析模块路由,并屏蔽掉模块父对象
      modIDs = parts[i].replace(/^F\./, '').split('.');
      // 遍历模块路由层级
      for (j = 0; j < modIDs.length; j++) {
        // 重置父模块
        parent = parent[modIDs[j]] || false;
      }
      //将模块添加到依赖模块列表中去
      modules.push(parent);
    } else {
      // 如果是模块对象,直接加入依赖列表中
      modules.push(parts[i]);
    }
    i++;
  }
  // 执行回调函数
  fn.apply(null, modules);
}


F.module('string.trim', function(trim) {
  var a = 'woshi      ';
  console.log(a.length);
  console.log(trim(a).length);
})

/**
 * 总结
 *
 * 这样的情况下,开发的时候每个人就可以放在自己的模块中,然后其他人需要的时候就依赖这个模块
 * 但是,依赖的模块必须提前写好
 *
 */
