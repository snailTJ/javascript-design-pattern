'use strict';

/**
 * 装饰者模式
 *     在不改变原有对象的基础给原对象添加属性和方法
 */

//原始的飞机类
var Plan = function() {}
Plan.prototype.fire = function() {
    console.log('发射普通导弹');
}

//装饰类
var Decorator = function(plan) {
    this.plan = plan;
}

Decorator.prototype.fire = function() {
    this.plan.fire();
    console.log('发射原子弹');
}

//使用,这样就会在原基础上增加原子当的发射
var plan = new Plan();
var decorator = new Decorator(plan);
decorator.fire();
