/**
 * 利用外观模式启动电脑:启动CPU,启动内存,启动硬盘,然后启动电脑
 */


function CPU() {
    this.startUp = function() {
        console.log('启动cpu');
    }
}

function Memory() {
    this.startUp = function() {
        console.log('启动memory');
    }
}

function Disk() {
    this.startUp = function() {
        console.log('启动disk');
    }
}

function CPU() {
    this.startUp = function() {
        console.log('启动cpu');
    }
}

// 封装统一接口,实现上述几个步骤
function Computer() {
    var _cpu, _memory, _disk;
    _cpu = new CPU();
    _memory = new Memory();
    _disk = new Disk();
    this.startUp = function() {
        _cpu.startUp();
        _memory.startUp();
        _disk.startUp();
        console.log('电脑启动了...')
    }
}

//测试
var startComputer = new Computer();
startComputer.startUp();
