module.exports = Interface;
/**
 * js接口
 * @param {[type]} name    接口名字
 * @param {[type]} methods 接口方法
 */
function Interface(name, methods) {
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
