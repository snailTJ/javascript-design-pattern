/**
 * 我们都只到slice函数的用法,对一个数组调用slice，可以返回一个从start index到end index的数组
 * 下面我们来看看一些奇怪的代码
 */
var a = [1, 2, 3];
// 把slice赋值给一个变量
var slice = Array.prototype.slice;
//因为slice默认是绑定了山下文this,所以下面代码会报错
// var arrayA = slice(a, 0, 1); //TypeError: Array.prototype.slice called on null or undefined
// 如果我们此时使用call或者apply显示改变其上下文就可以实现
var arrayA = slice.call(a, 0, 1);
console.log(arrayA); //[1]
// 但是现在我们这样做,把call绑定到slice上
var slice = Function.prototype.call.bind(Array.prototype.slice);

//slice就可以把第一个参数作为上下文了
var arrayB = slice(a, 0, 2);
console.log(arrayB); //[1,2]


/**
 * 继承看下面代码,看看发发生了什么?
 *     1.改变了call的指向
 *     2.返回接受一个函数和上下文为参数的函数
 */

var bind = Function.prototype.call.bind(Function.prototype.bind);
console.log(bind); //返回call函数
var args = { foo: "bar" };

function obj() {
    console.log(this.foo);
}
var amazing = bind(obj, args);
amazing(); //bar
