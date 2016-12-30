/**
 * 桥接模式(事件监控)
 *
 * 桥接模式:使抽象部分和实现部分分离,使它们可以独立地变化
 */

addEvent(elemnt, 'click', fn);

function fn(e) {
  var id = this.id;
  request('Get', 'https://github.com?id=' + id, function() {
    // 处理逻辑
  })
}

// 上述代码中很明显id是依赖fn的上下文环境,所以我们使用桥接模式让抽象的click时间和回调函数fn分离


addEvent(elemnt, 'click', fnBridge);


function fn(id, callback) {
  request('Get', 'https://github.com?id=' + id, function(res) {
    callback(res);
  })
}
// 这就是就是桥接函数,连接了click和具体实现fn,让抽象和实现分离,并且把id改成参数,
// 这样的就可以让他们独立变化了
function fnBridge(e) {
  fn(id, function() {
    // 具提逻辑
  })
}
