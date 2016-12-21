/**
 * 现在我们要使用建造者模式建造出一辆车
 * 这个实在有接口的情况下实现的建造者模式
 */

var Interface = require('./Interface.js');

//产品类
//产品类不需要知道如果去生产产品,但可以在任何时候知道产品的具体情况
function Car() {
    if (!this instanceof Car) return new Car();
    var wheel, frame, engine;
    this.setWheel = function(val) {
        wheel = val;
    };
    this.setFrame = function(val) {
        frame = val;
    };
    this.setEngine = function(val) {
        engine = val;
    };
    this.getWheel = function() {
        return wheel;
    };
    this.getFrame = function() {
        return frame;
    };
    this.getEngine = function() {
        return engine;
    };
    this.getcar = function() {
        console.log(wheel);
        console.log(frame);
        console.log(engine);
    }
}

// 抽象建造者类
function Builder() {
    if (!this instanceof Builder) return new Builder();
    this.builder = new Interface('builder', ['builderFrame', 'buildEngine', 'builderWheel', 'builderCar'])
}

//指导者,指定构建者去构建
function Director(builder) {
    if (!this instanceof Director) return new Director();
    var _builder = builder;
    this.builder = function() {
        _builder.buildEngine();
        _builder.builderFrame();
        _builder.builderWheel();
        return _builder.builderCar();
    }
}


//具体建造者类,实现产品的具体构建过程
function BuildBMW() {
    if (!this instanceof BuildBMW) return new BuildBMW();
    var builder = new Builder();
    var _car = new Car();
    this.builderFrame = function() {
        _car.setFrame('宝马车架');
    };
    this.buildEngine = function(engine) {
        _car.setEngine('宝马发动机');
    };
    this.builderWheel = function(wheel) {
        _car.setWheel('宝马轮子');
    };
    this.builderCar = function() {
        return _car;
    };
    // 检验是否实现了接口全部的方法
    Interface.ensureImplements(this, builder.builder);
}


// 使用
var buildBMW = new BuildBMW();
var director = new Director(buildBMW);
var car = director.builder();
car.getcar()
