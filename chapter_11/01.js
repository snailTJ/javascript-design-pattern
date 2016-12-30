/**
 * 适配器模式
 */

var A = A || {};
// 通过id获取元素
A.g = function(id) {
  return document.getElementById(id);
};
// 为元素绑定事件
A.on = function(id, type, fn) {
  // 如果传递参数是字符串则以id处理，否则以元素对象处理
  var dom = typeof id === 'string' ? this.g(id) : id;

  if (dom.addEventListener) {
    dom.addEventListener(type, fn, false);
  } else if (dom.attachEvent) {
    dom.attachEvent('on' + type, fn);
  } else {
    dom['on' + type] = fn;
  }
};


// 如果此时我们把框架换成jquery了,此时我们之前的A.g就和jquery框架不见容
// 此时我们就需要一个适配器来包装A.g这个方法
//
A.go = fucntion(id) {
  return $('#' + id)[0];
}

// 遮掩话我们上面的代码依赖还是适用的,不需要去改代码,只需要天记一个适配器去包装现有的方法
