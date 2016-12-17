# bind 函数

bind()函数运行时候会创建一个新的函数(称为目标函数),当这个新的函数被调用的时候,bind的第一个参数将会作为它的运行this,之后的一序列参数将会在传递实传入作为它的参数

**语法**

```javascript
fun.bind(thisArg[,arg1[,arg2[,...]]])
```

如果将一个对象的方法拿出来赋值给一个变量然后调用,会丢失原来的对象的执行环境。相当于是执行一个匿名函数,此时this指向的是window,此时,我们如果想要把this绑定到一个对象上,可以使用bind函数。
```javascript
this.x = 9; 
var module = {
  x: 81,
  getX: function() { return this.x; }
};
var retrieveX = module.getX;
retrieveX(); // 返回 9, 
var boundGetX = retrieveX.bind(module);
boundGetX(); // 返回 81
```

bind()的另一个用法是使一个函数拥有预设的初始参数,他们会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们的后面
```javascript
function list() {
  return Array.prototype.slice.call(arguments);
}
var list1 = list(1, 2, 3); // [1, 2, 3]
var leadingThirtysevenList = list.bind(undefined, 37);

var list2 = leadingThirtysevenList(); // [37]
var list3 = leadingThirtysevenList(1, 2, 3); // [37, 1, 2, 3]
```

绑定函数也可以使用new操作符创建对象,此时提供给bind函数发的this值将失效,这将导致new出的实例对象,失去了目标函数的方法,所以需要继承目标函数的原型链方法,官方使用一个中间函数来实现继承
```javascript
if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
        var args = Array.prototype.slice.call(arguments, 1);
        var fTobind = this; //目标函数
        var fNOP = function() {};
        var fBound = function() {
            return fTobind.apply(this instanceof fNOP ? this : oThis || this, args.concat(Array.prototype.slice.call(arguments)));
        }
        // 为了让新生成的目标函数实例可以继承目标函数的方法
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound; //绑定函数
    }
}
```

从上面我们知道官方bind()方法,主要就是实现是三个功能

*   绑定上下文
*   生成新函数,并实现函数具有预设参数功能
*   可以使用new来构造实例

下面我们看一段代码,第一次看的时候我也是一脸懵逼,下面我们来看看下面这条代码到底发生了什么
```javascript
var bind = Function.prototype.call.bind(Function.prototype.bind);
```

我们可以这样理解这段代码``var bind=fn.bind(obj)``,fn相当于``Function.prototype.call``,obj相当于``Function.prototype.bind``。因为这条代码表示fn绑定obj,也就是说``fn.bind(obj)``也可以写成``obj.fn``此时函数中的this也是指向对象obj。

所以上面的那句代码也可以写成:
``var bind=Function.prototype.bind.call``

通过测试,我们知道``Function.prototype.call.bind(Function.prototype.bind)``返回的就是call(),函数,并且call函数上下文指向的到Function.prototype.bind,这个call可以这样用
```javascript
var bind = Function.prototype.call.bind(Function.prototype.bind);
console.log(bind); //返回call函数
var context = { foo: "bar" };

function returnFoo() {
    console.log(this.foo);
}
var amazing = bind(returnFoo, context);
amazing(); //bar
```

那为什么上面代码使用``bind(returnFoo, context)``,
因为bind可以看成``Function.prototype.bind.call``,
很明显bind是这样使用``Function.prototype.bind.call(obj, args)``,也就是相当于``obj.bind(args)``

如果``Function.prototype.bind.call``等价于``Function.prototype.call.bind(Function.prototype.bind)``,那为什么还要那么麻烦写成
``var bind = Function.prototype.call.bind(Function.prototype.bind)``

```javascript
var name = 'a';
var b = {
    name: 'b',
    show: function() {
        console.log(this.name);
    }
}
var b2 = b.show;
b2(); //a
var b3 = b.show.bind(b);
b3(); //b
```

上面代码我们可以看出``var bind=Function.prototype.bind.call``,此时bind函数上下文已经和Function.prototype.bind.call已经不一样了,但是这样写
``var bind = Function.prototype.call.bind(Function.prototype.bind)``,
bind是新生成的函数,上下文和``bind=Function.prototype.bind.call``是一样的

我们回头再来看上面那句代码发生了什么,一共可以为两点:

*   我们改变了call函数的上下文
*   返回一个函数接受一个函数和一个上下文为参数的函数