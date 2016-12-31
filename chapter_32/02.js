/**
 * 简单模板模式
 *
 * 优化01.js中的模板模式
 */

// 命名空间,单体对象
var A = A || {};

// 构建一个模板生成器
A.view = function(name) {
  // 模板库
  var v = {
    // 代码模板
    code: '<pre><code>{#code#}</code></pre>',
    // 图片模板
    img: '<img src="{#src#}" alt="{#alt#}" title="{#title#}"/>',
    // 带id和类的模板
    part: '<div id="{#id#} class="{#class#}">{#part#}</div>',
    // 组合模板
    theme: [
      '<div>',
      '<h1>{#title#}</div>',
      '{#content#}',
      '</div>'
    ].join('')
  };
  // 如果参数是一个数组,则返回多行模板
  if (Object.prototype.toString.call(name) == "[object Array]") {
    // 模板缓存器
    var tpl = '';
    // 变标识
    for (var i = 0; i < name.length; i++) {
      // 模板缓存器追加模板
      tpl += arguments.callee(name[i]);
    }
    // 返回最终模板
    return tpl;
  } else {
    // 如果模板库有该模版就返回,不然就返回
    return v[name] ? v[name] : ('<' + name + '>{#' + name + '#}</' + name + '>');
  }
}

//01.js的例子就可以改成这样

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
    var tpl = A.view(['h2', 'p', 'ul']);
    // 列表选项
    var liTpl = A.formateString(A.view('li'), { li: A.view('span') })
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
