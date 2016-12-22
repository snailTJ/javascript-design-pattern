'use strict';

/**
 * 利用享元模式生产n辆车,如果不用享元的话,可能会new出n个汽车对象,这样的话就会导致内存无限增长,
 * 性能可想而知
 *
 * 利用享元模式的情况下
 * 每类对象只会new一次,因为所有的配置(内部状态)都一样的
 *
 */

//享元对象
var Flyweight = (function() {
    //Cars对象存储器,存储了所有car对象
    var Cars = {};
    //内部状态,是不会随着业务场景改变而改变
    var Car = function(d) {
        this.wheel = d.wheel;
        this.price = d.price;
        this.color = d.color;
        this.seat = d.seat;
    };
    //以logo(品牌)为类构建Car类别
    var _factory = function(d) {
        if (!Cars[d.logo]) {
            Cars[d.logo] = new Car(d);
        };
        //返回改品牌的类别
        return Cars[d.logo];
    };
    var carItem = {
        allCars: {},
        //添加一辆车,与具体的业务场景有关,会发生变化
        addCar: function(data) {
            if (this.allCars[data.id]) return this.allCars[data.id];
            // 外部状态
            this.allCars[data.id] = {
                id: data.id,
                logo: data.logo,
                car: _factory(data)
            }
        },
        getCars: function() {
            return Cars;
        }
    };
    return carItem;
})()

var data = [
    { id: 1, wheel: 4, price: 50000, color: 'red', logo: 'benz', seat: 8 },
    { id: 2, wheel: 4, price: 40000, color: 'blue', logo: 'bmw', seat: 4 },
    { id: 3, wheel: 4, price: 50000, color: 'red', logo: 'ford', seat: 2 },
    { id: 4, wheel: 4, price: 50000, color: 'red', logo: 'ford', seat: 2 },
]

for (var i in data) {
    Flyweight.addCar(data[i]);
}

console.log(Flyweight.allCars);
