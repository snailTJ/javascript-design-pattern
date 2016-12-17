var name = 'window';
var obj = {
    name: 'obj',
    show1: function(o) {
        o.show()
    },
    show2: function(o) {
        o()
    },
    show3: function(o) {
        o.call(this)
    }
}

function Person(name) {
    this.name = name;
    this.show = function() {
        console.log(this.name);
    }
}
o = new Person('o');
obj.show1(o); //o是被new出来的对象.所有this指向new出来对象,输出o
obj.show2(function() { //参数是一个声明函数,所以内部this指向是window
    console.log(this.name);
});
obj.show3(function() { //参数是声明函数,但是使用call改变了内部this指向到obj
    console.log(this.name);
});
