'use strict';

/**
 * 在js中我们可以很随意的给对象或者类添扩展属性和方法,但却很难咋不改动函数代码的情况下,
 * 给该函数添加一些额外的功能,也就是在函数运行期间,我们很难切入到某个函数的环境
 */

//使用AOP(面向切面)函数
//主要是因为在js中会随着函数的调用.this指向发生变化,导致结果发生变化


/**
 * 在某个函数执行之前执行添加的功能函数
 */
Function.prototype.before = function(beforefn) {
    // 保存旧函数应用
    var _this = this;
    return function() {
        //执行新函数,利用apply保证this不被挟持
        beforefn.apply(this, arguments);
        return _this.apply(this, arguments);
    }
}

var func = function() {
    console.log('func');
}

func.before(function() {
    console.log('beforefn');
})()



/**
 * 在某个函数执行之后执行添加的功能函数
 */
Function.prototype.after = function(afterfn) {
    // 保存旧函数应用
    var _this = this;
    return function() {
        _this.apply(this, arguments);
        var ret = afterfn.apply(this, arguments);
        return ret;
    }
}

func.after(function() {
    console.log('afterfn');
})()
