/**
 * 柯里化?
 *     柯里化其实本身是固定一个可以预期的参数,并返回一个特定参数,提高参数复用性
 *     其次柯里化函数是一个高阶函数
 */

//这就是一个柯里化函数
function currying(fn) {
    var _args = Array.prototype.slice.call(arguments, 1);
    return function() {
        return fn.apply(null, _args.concat(Array.prototype.slice.call(arguments)))
    }
}

/**
 * 柯里化函数有什么用
 *     1.缩小了函数的实用性,提高复用性
 *     2.延迟执行
 *     3.固定易变因数
 */

//1.缩小了函数的实用性,提高复用性
function map1(handler, lists) {
    return lists.map(handler)
}

function handler(i) {
    return i * i;
}
//上述每次调用的时候都要传递handler参数,使用currying改下
var mapV = currying(map1, handler);
//然后每次调用级就只需要传递一个数组,不用传递handler函数
console.log(mapV([1, 2, 3])); //[1.4.9]


//2.延迟执行

function currying2(fn) {
    var _args = [];
    return function() {
        if (!arguments.length) {
            return fn.apply(null, _args);
        }
        _args = _args.concat(Array.prototype.slice.call(arguments));
    }
}

var total = 0;
var add = currying2(function() {
    var i = 0;
    len = arguments.length;
    for (i; i < len; i += 1) {
        total += arguments[i];
    }
})
add(1)
add(1)
add(1)
add();
console.log(total) //3


//3.固定易变因数
//bind函数就是就是绑定上下文

//总的来说,函数柯里化,是固定部分参数,返回一个接受剩余参数的函数,也称为部分计算函数,
//目的是为了缩小适用范围,创建一个针对性更强的函数
