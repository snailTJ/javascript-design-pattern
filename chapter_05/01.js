/**
 * 工厂方法模式
 */


//安全模式创建工厂类
var Factory = function(type, content) {
  if (!(this instanceof Factory)) return new Factory(type, content);
  var s = new this[type](content);
}

//工厂原型中设置常见所有类型数据对象的基类
Factory.prototype = {
  constructor: Factory,
  Java: function(content) {},
  UI: function(content) {
    this.content = content;
    (function(content) {
      var div = document.createElement('div');
      div.innerHTML = content;
      div.style.border = '1px solid blue';
      document.getElementById('container').appendChild(div);
    })(content)
  },
  Javascript: function(content) {},
}

//这样以后我们要添加其他的类的话我们就需要在Factory这个工厂类原型里添加既可以了

var data = [
  { type: 'UI', content: 'UI哪家强' }
]

for (var i = 0; i < data.length; i++) {
  Factory(data[i].type, data[i].content);
}
