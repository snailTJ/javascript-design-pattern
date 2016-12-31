/**
 * 简单模板模式
 */

// 命名空间,单体对象
var A = A || {};

// 模板渲染方法
A.formateString = function(str, data) {
    return str.replace(/\{#(\w+)#\}/g, function(match, key) {
      return typeof data[key] === undefined ? '' : data[key];
    })
  }
  // 主体展示容器
A.root = document.getElementById('container');
A.strategy = {
  'listPart': function(data) {
    // 魔窟啊容器
    var s = document.createElement('div');
    // 列表字符串
    var ul = '';
    // 列表数据
    var ldata = data.data.li;
    // 模板字符串
    var tpl = [
      '<h2>{#h2#}</h2>',
      '<p>{#p#}</P>',
      '<ul>{#ul#}</ul>'
    ].join('');
    // 列表选项
    var liTpl = [
      '<li>',
      '<span>{#span#}</span>',
      '</li>'
    ].join('');
    // 有id 的模块
    data.id && (s.id = data.id);
    //遍历列表数据
    for (var i = 0; i < ldata.length; i++) {
      // 如果列表里面有选项
      if (ldata[i].span) {
        // 列表字符串追加一项列表项
        ul += A.formateString(liTpl, ldata[i]);
      }
    }
    // 装饰列表数据
    data.data.ul = ul;
    // 渲染模板插入到模块中
    s.innerHTML = A.formateString(tpl, data.data);
    A.root.appendChild(s);
  }
}


var data = {
  data: {
    h2: 'h2标题',
    p: 'p段落',
    ul: 'ul',
    li: [{
      span: 'span1'
    }]
  },
  id: 1
}


A.strategy['listPart'](data);
