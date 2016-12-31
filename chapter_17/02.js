/**
 * 模板方法模式
 *
 * 创建多类导航
 */


// 格式化字符串方法
function formateString(str, data) {
  return str.replace(/\{#(\w+)#\}/g, function(match, key) {
    return typeof data[key] === undefined ? '' : data[key];
  })
}

// 基础导航
var Nav = function(data) {
  // 基础模板样式模板
  this.item = '<a href="{#href#}" title="{#title#}">{#name#}</a>';
  // 创建字符串
  this.html = '';
  // 格式化字符串
  for (var i = 0; i < data.length; i++) {
    this.html += formateString(this.item, data[i]);
  }
  return this.html
}

// 消息提醒导航类
var NumNav = function(data) {
  // 消息提醒组件模板
  var tpl = '<b>{#num#}</b>';
  // 装饰数据
  for (var i = 0; i < data.length; i++) {
    data[i].name += data[i].name + formateString(tpl, data[i]);
  }
  // 继承基础导航类,并返回字符串
  return Nav.call(this, data)
}


// 使用
var nav = document.getElementById('content');

// 添加内容
nav.innerHTML = NumNav([
  { title: '百度一下', name: '百度', num: 10 }
]);
