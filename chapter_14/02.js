/**
 * 桥接模式(多类连接)
 *
 * 如果一个对象有两个或者多个维度的抽象,这样的话我们可以把每一个维度的抽象出来,
 * 使每一个维度的变化都独立出来,在利用桥接模式,定义一个桥接类,通过桥接类我们可以
 * 得到我们需要的对象
 *
 */

/**
 * 假如现在有不同的人开着不同的车在不同的路上
 *     得出一个什么样的人开什么样的车在什么样的路上
 *
 * 三个维度
 *     人
 *     车
 *     路
 */

// 抽闲人类
function Person(person) {
  this.person = person;
}
// 抽象车类
function Car(car) {
  this.car = car;
}

// 抽象路
function Road(road) {
  this.road = road;
}

// 桥接类(具体实现)
function Bridge(person, car, road) {
  this.person = new Person(person);
  this.car = new Car(car);
  this.road = new Road(road);
}
Bridge.prototype.init = function() {
  console.log('一个' + this.person.person + '开着' + this.car.car + '在' + this.road.road);
}

var obj = new Bridge('男的', 'bmw', '小路');
obj.init()
