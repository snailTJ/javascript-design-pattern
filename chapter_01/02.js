/**
 *call方法:
 *  主要就用来改变函数的运行上下文,就是函数内this的指向
 *  call方法还可以传递参数,形式如a.call(this,p1,p2,...)
 */
function Animals(name) {
    this.name = name;
    this.show = function() {
        console.log(this.name);
    }
}

var cat = new Animals('cat');
var dog = {
    name: 'dog'
}

// 此时我们需要dog调用show方法,但是dog没有show方法,此时,我们可以
// 利用call来实现我们的需求
cat.show.call(dog); //此时show方法的this由cat指向了dog
