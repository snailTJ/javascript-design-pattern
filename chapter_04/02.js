'use strict';

function createPop(info, member, size) {
    //创建一个对象,然后对这个对象进行扩展
    var o = new Object();
    o.info = info;
    o.member = member;
    o.size = size;
    o.getInfo = function() {
        console.log(this.info);
    }
    return o;
}

// 使用
var nba = createPop('nba', 5, 'big');
console.log(nba);
