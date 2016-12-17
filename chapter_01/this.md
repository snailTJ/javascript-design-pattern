## this 的秘密

在js中this指针在``逻辑上``上也是实例化的对象,但是在js中this指针确是更难理解,我觉得主要有是三种原因

---
*   **javascript里的函数是一个高阶函数，编程语言里的高阶函数是可以作为对象传递的，同时javascript里的函数还有可以作为构造函数，这个构造函数可以创建实例化对象，结果导致方法执行时候this指针的指向会不断发生变化，很难控制**

*   **this指针只有在使用new操作符后才会生效，但是javascript里的this在没有进行new操作也会生效，这时候this往往会指向全局对象window**

*   **javascript里call和apply操作符可以随意改变this指向，这看起来很灵活，但是这种不合常理的做法破坏了我们理解this指针的本意，同时也让写代码时候很难理解this的真正指向**

---
js中全局对象可以理解就是window对象(nodejs是global),既然window是对象,对象是被实例化出来的。只是在这个实例化过程是由js引擎完成，整个页面上的所有的对象都会被聚集在这个window对象上。
```javascript
function fn1(){
    console.log("I am fn1!");
}
var fn2 = function(){
    console.log("I am fn2!");
}
```
上面就是js中两种定义函数的方式,第一种称为``声明函数``,第二种称为``函数表达式``,这两种区别在于是关于js引擎预加载。

```javascript
console.log(fn1);//显示为fn1函数
console.log(fn2);// undefined
function fn1(){
   console.log("I am fn1!");
}
var fn2 = function(){
    console.log("I am fn2!");
}
```

**js中js有两大执行环境,一个是全局环境,一个是局部环境,执行环境是通过``上下文变量``体现的,其实这个过程是在函数执行前完成,预处理就是构造执行环境的两一个说法,总而言之,预处理和构造执行环境的主要目的就是明确变量定义,分清变量的边界但是在全局作用域构造或者全局预处理的对象对于声明式和字面量式的处理是不同的,声明函数会将变量定义和赋值同时完成,函数表达式只有变量的定义,并没有赋值。由于声明函数都会在全局作用域构造的时候完成,所以声明函数的都是在window对象上,也就是不管在哪里声明函数,声明函数最终都是属于window对象**
```javascript
function ftn03(){
    var fn1 = function(){
        console.log(this);// window
    };
    fn1();
}
fn1();
```
声明函数this指向window,其实表达式函数this指针也是指向window,特别是当表达式函数写在函数内部的时候,这点特别容易让我们忽略

**其实在js中任何匿名函数都是属于window对象,全局作用域构造时候完后成定义和赋值,但是匿名函数是没有名字和函数变量,但是在定义匿名函数的时候会返回自己的内存地址,如果此时有个变量接收了这个内存地址,那么匿名函数就能在程序里使用了,因为匿名函数也是在全局构造时候定义和赋值,所以匿名函数的this指针也是指向window对象,所在下面代码中函数内部this指向window,因为js变量名不管在哪个作用域有效,堆区的存储函数都是在全局执行环境被固定下来,变量名只是一个指代而已**

```javascript
function fn1() {
  var a = function() {
    console.log(this); //window
  }
  a();
}
fn1()
```
本质上,js中的this都是指向调用这个方法的对象,也就是实例化的对象,funciton中的this全局作用构造的时候是指向全局的,要想改变内部this指向,可以让funciton实例化,使用new操作符
```javascript
var obj = {
  show: function() {
    console.log(this==obj);//true
  }
}
obj.show();
var obj2 = new Object()
obj2.show = function() {
  console.log(this==obj2);//true
}
obj2.show();
```
上面代码中this不是指向window的,而是指向Object的实例。字面量定义分对象的方式是new Object的简写,二者是等价的,所有this都是指向new出来的新对象

那么在new操作之后让构造函数发生了什么变化才导致this指向的改变?
    1.  创下一个对象
    2.  将构造的作用域赋给新对象(因此this指向了这个new出来的新对象)
    3.  执行构造函数中的代码(为这个对象添加属性)
    4.  返回新对象
 
**我们定义对象通过使用字面表示法,简单的话我们可以很简单的知道this指向对象本身,但是这个有方法,方法的参数也可以是一个函数,这个函数里面也可能有this指针,传入的函数是实例化或者没有实例化,内部的this指向都是不同的,有时候我们还想咋传入函数里面通过this指向外部函数或者指向定义对象本身,这么多情况混合在一起就会导致this指向更加难以把控**

按照对象里的方法传入参数为例,可以理清上面的情况
    1.  传入的参数是函数的别名,那么函数的this就是指向window
    2.  传入参数是被new出的对象,那么this就是指向new出的对象本身
    3.  如果我们两把传入的的函数对象的this指针指向外部字面定义的对象,就需要call或者apply来显示指定this的指向
```javascript
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
```













