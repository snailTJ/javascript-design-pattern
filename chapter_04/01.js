'use strict';


/**
 * 简单工厂模式,我们只需要知道工厂函数就可以了,不需要关心创建的这些对象依赖哪些类
 */

//篮球基类
var Baseketball = function() {
    this.info = '篮球盛行于美国';
}

Baseketball.prototytpe = {
    getMember: function() {
        console.log('五个人')
    },
    getBallSize: function() {
        console.log('篮球很大')
    }
}

//足球基类
var FootBall = function() {
    this.info = '足球在全世界流行';
}

FootBall.prototytpe = {
    getMember: function() {
        console.log('11')
    },
    getBallSize: function() {
        console.log('足球很大')
    }
}

//网球基类
var Tennis = function() {
    this.info = '网球球员很多美女';
}

Tennis.prototytpe = {
    getMember: function() {
        console.log('2个人')
    },
    getBallSize: function() {
        console.log('篮球很小')
    }
}


//创建运动工厂
var SportsFactory = function(name) {
    switch (name) {
        case 'NBA':
            return new Baseketball();
        case 'wordCup':
            return new FootBall();
        case 'NBA':
            return new Tennis();
    }
}

//使用
var nba = SportsFactory('NBA')
console.log(nba.info);
