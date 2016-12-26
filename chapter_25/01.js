/**
 * 备忘录模式
 */

//备忘录类
var Page = function() {
  // 信息缓存对象
  var cahce = {};
  /**
   * 主函数
   * 参数 page 页码
   * 参数 fn 成功回调函数
   */
  return function(page, fn) {
    // 判断改页是否在缓存中
    if (cache[page]) {
      // 恢复在改页,显示改页内容
      showPage(page, cahce[page]);
      // 执行成功回调函数
      fn && fn();
    } else {
      // 若缓存不存在改页数据
      $.post('./data/getNewData.php', {
        page: page
      }, function(res) {
        if (code.errNo == 0) {
          // 显示该数据
          showPage(page, res.data);
          cache[page] = res.data;
        } else {
          // 处理异常
        }
      })
    }
  }
}
