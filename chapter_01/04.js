/**
 * bind方法作用
 *     1.生成一个新的函数(称为绑定该函数),这个新的函数不论怎么调用都有同样的this值
 *     2.使一个函数具有预设的初始参数,这些参数会做为bind()的第二参数跟着this后面,
 *       并且这些参数会被插入到目标函数的参数列表开始位置,传递给绑定函数的参数会跟着他们后面
 */

//官方bind函数
if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
        var args = Array.prototype.slice.call(arguments, 1);
        var fTobind = this; //目标函数
        var fNOP = function() {};
        var fBound = function() {
            return fTobind.apply(this instanceof fNOP ? this : oThis || this, args.concat(Array.prototype.slice.call(arguments)));
        };
        // 为了让新生成的目标函数实例可以继承目标函数的方法
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound; //绑定函数
    }
}

// 自己实现一个bind函数
function bind(that) {
    var _this = this;
    // 由于参数的不确定性,统一用arguments来处理,这里的arguments只是一个类数组对象,有length属性
    // 使用slice方法将类数组转化为数组
    var args = Array.prototype.slice.call(arguments, 1);
    return function() {
        //生成的新函数支持动态参数
        _this.apply(that || window, args.concat(Array.prototype.slice.call(arguments)))
    }
}
Function.prototype.bind = bind;
