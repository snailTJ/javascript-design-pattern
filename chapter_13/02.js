'use strict';

/**
 * 装饰者模式将一个对象嵌入到另一个对象之中，实际上相当于这个对象被另一个对像包装起来，形成一条包装链。
 * 请求随着这条包装链依次传递到所有的对象，每个对象都有处理这条请求的机会
 */
var plan = {
    fire: function() {
        console.log('发射导弹');
    }
}

var Decorator = function() {
    console.log('发射原子弹');
}

var fire = plan.fire;
plan.fire = function() {
    fire.call(plan);
    Decorator();
}
plan.fire();
