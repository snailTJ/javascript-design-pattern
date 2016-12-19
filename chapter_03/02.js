/**
 * 鸭式变形法
 */

(function() {
    /**
     * @param {string} name    接口的名字
     * @param {array} methods  接口定义的方法名数组
     */
    var Interface = function(name, methods) {
        if (arguments.length != 2) {
            throw new Error('interface must hava tao paramters...');
        }
        this.name = name;
        //定一个数组来接受所有接口定义的方法
        this.methods = [];
        for (var i = 0; i < methods.length; i++) {
            if (typeof methods[i] != 'string') {
                throw new Error('method name must be string...');
            }
            this.methods.push(methods[i])
        }
    };

    //定一个静态方法来实现接口和实现类的直接校验
    Interface.ensureImplements = function(object) {
        if (arguments.length < 2) {
            throw new Error('ensureImplements at least hava two paramters...');
        }
        for (var i = 1; i < arguments.length; i++) {
            var inter = arguments[i];
            if (inter.constructor != Interface) {
                throw new Error('must be interface');
            }
            //遍历函数集合
            for (var j = 0; j < inter.methods.length; j++) {
                var method = inter.methods[j];
                if (!object[method] || typeof object[method] != 'function') {
                    throw new Error('没有实现' + method + '方法');
                }
            }
        }
    }


    //应用
    //实例化接口类
    var aAnimals = new Interface('cat', ['eat', 'run']);
    var bAnimals = new Interface('bird', ['fly']);

    function Animals() {
        this.eat = function() {
            alert('eat');
            return this;
        };
        this.run = function() {
            alert('run');
            return this;
        };

        this.fly = function() {
            alert('bird');
            return this;
        };
        Interface.ensureImplements(this, aAnimals, bAnimals);
    }

    //检验
    var flyDog = new Animals();
    flyDog.fly().run();
})()
