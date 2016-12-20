/**
 * 反柯里化
 *     词面意义上我们都能知道反柯里化的意义,目的是为了扩大适用范围,
 *     创建一个应用范围更广的函数,使本来针对一个对象使用的方法使用更多的对象
 */

//本质就是this.method()转化为method(this,args1,args2,args3...)
Function.prototype.uncurrying = function() {
    var that = this;
    return function() {
        //等价于obj.call()
        return Function.prototype.call.apply(that, arguments);
    }
}

//等价于push = Array.prototype.push.call
var push = Array.prototype.push.uncurrying();
var obj = {}
push(obj, '1', '2');
console.log(obj); //{0: "1", 1: "2", length: 2}
