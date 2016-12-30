/**
 * 参数适配器
 *
 * 有时候我们调用函数的时候要传递很多参数,可能我们也不记得参数的前后位置,
 * 这样的话就会出问题,所以我们往往使用一个对象去传递参数
 */

function a(name, title, age, color, size, prize) {}

//现在我们把所有的参数放到一个对象上.
function b(obj) {

}

// 但是此时我们往往不知道我们这个对象中包含哪些参数,所以我们现在就用一个适配器去适配
// 没有的话就走适配器,其实就相当于给了一个默认参数值
// 这样的情况下就不会出现之前参数的位置问题
function c(obj) {
  var _default = {
    name: '雨夜清荷',
    title: '设计模式',
    age: '20',
    color: 'pink',
    size: 100,
    prize: 50
  }

  for (var i in obj) {
    _default = obj[i] || _default[i];
  }

  // 业务代码
}
