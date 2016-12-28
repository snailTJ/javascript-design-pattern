/**
 * 数据分发
 *     这样的话我门就可以把五次请求一次性完成,完后分别处理对象的请求,
 *     这样的话就节约的多次请求的开销
 */

var Deal = {
  banner: function(res) {
    // 处理逻辑
  },
  aside: function(res) {
    // 处理逻辑
  },
  article: function(res) {
    // 处理逻辑
  },
  member: function(res) {
    // 处理逻辑
  },
  message: function(res) {
    // 处理逻辑
  }
}

$.get('./deal.php', function(res) {
  // 数据包分发
  for (var i in Deal) {
    Deal[i] && Deal[i](res[i]);
  }
})
