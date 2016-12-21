/**
 * js中我们没有接口概念,所以现在实现没有接口的建造者
 * 构建一个人(一个胖的年轻程序员,一个瘦的老司机)
 */

//Director
function Director(builder) {
    if (!this instanceof Director) return new Director(builder);
    var _builder = builder;
    this.builder = function() {
        _builder.builderName();
        _builder.builderWork();
        _builder.builderAge();
        _builder.builderShape();
        return _builder.builderPerson();
    }
}

//产品
function Person() {
    if (!this instanceof Person) return new Person();
    this.name = '';
    this.work = '';
    this.age = '';
    this.shape = '';
    this.getPerson = function() {
        console.log('我是' + this.name + ',我是一名' + this.age + this.shape + this.work + '.')
    }
}
//构建者
function BuilderOne() {
    if (!this instanceof BuilderOne) return new BuilderOne();
    var _person = new Person();
    this.builderName = function() {
        _person.name = 'A';
    };
    this.builderWork = function() {
        _person.work = '程序员';
    };
    this.builderAge = function() {
        _person.age = 18;
    };
    this.builderShape = function() {
        _person.shape = '胖的';
    };
    this.builderPerson = function() {
        return _person;
    }
}

function BuilderTwo() {
    if (!this instanceof BuilderTwo) return new BuilderTwo();
    var _person = new Person();
    this.builderName = function() {
        _person.name = 'B';
    };
    this.builderWork = function() {
        _person.work = '老司机';
    };
    this.builderAge = function() {
        _person.age = 80;
    };
    this.builderShape = function() {
        _person.shape = '瘦的';
    };
    this.builderPerson = function() {
        return _person;
    }
}

var builderOne = new BuilderOne();
var director1 = new Director(builderOne);
var person1 = director1.builder();
person1.getPerson();

var builderTwo = new BuilderTwo();
var director2 = new Director(builderTwo);
var person2 = director2.builder();
person2.getPerson();
