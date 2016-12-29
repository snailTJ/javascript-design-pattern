/**
 * 惰性模式
 *     事件绑定可能在一些浏览器上需要兼容版本,所以我们可能需要每次都去判断
 *     但是如果我们对这个绑定的方法重新定义,这样就不会只在第一次加载的时候判断一次就可以了
 */

/**
 * 第一种 加载即执行
 *
 * 这种一加载就会执行,会有一些消耗
 */
A.on = function(dom, type, fn) {
  if (document.addEventListener) {
    // 返回重新定义的方法
    return function(dom, type, fn) {
      dom.addEventListener(type, fn, false);
    }
  } else if (document.attachEvent) {
    return function(dom, type, fn) {
      dom.attachEvent('on' + type, fn);
    }
  } else {
    return function(dom, type, fn) {
      dom['on' + type] = fn;
    }
  }
}();


/**
 * 第二种 惰性执行
 *
 *  只有当绑定事件的时候才会执行
 */

A.on = function(dom, type, fn) {
  if (document.addEventListener) {
    // 返回重新定义的方法
    A.on = function(dom, type, fn) {
      dom.addEventListener(type, fn, false);
    }
  } else if (document.attachEvent) {
    A.on = function(dom, type, fn) {
      dom.attachEvent('on' + type, fn);
    }
  } else {
    A.on = function(dom, type, fn) {
      dom['on' + type] = fn;
    }
  }
  A.on(dom.type, fn);
};
