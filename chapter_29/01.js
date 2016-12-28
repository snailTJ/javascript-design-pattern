/**
 * 这里就是给一个未来生成的元素添加一个事件,原来我们是不可能实现的,但是
 * 利用委托模式我们就可以给未来元素的父元素绑定事件,然后通过冒泡来实现给未来
 * 元素绑定事件
 */

var div = document.getElementById('div');
div.onclick = function() {
  var e = e || window.event;
  var tar = e.target || e.srcElement;
  if (tar.nodeName.toLowerCase() === 'p') {
    tar.innerHTML = '我要改变这段内容'
  }
}

var p = document.createElement('p');
p.innerHTML = '增加一个段内容';
div.appendChild(p);
