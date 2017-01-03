/**
 * MVVM模式
 *
 * 之前MVP是在通过管理器来创建视图,如果我们通过在页面中创建视图组件,让控制器去监听或者管理器去
 * 监听这些视图组件,并完成这些组件完成预期功能,这样的就是MVVM模式,但是需要我们对欧控制器层去做
 * 更复杂的封装(这里的控制器就是VM,就是视图模型层),
 */

/**
 * MVVM模式是对视图模型层的高度复用
 */
(function(window) {
  // 创建视图模型对象
  var VM = function() {
    // 组件创建策略对象
    var method = {
      // 进度条组件创建方法
      progressBar: function(dom, data) {
        // 进度条进度完成容器
        var progress = document.createElement('div');
        // 数据模型数据
        var param = data.data;
        // 设置进度完成容器尺寸
        progress.style.width = (param.position || 100) + '%';
        progress.style.height = 40 + 'px';
        progress.style.backgroundColor = 'blue';
        // 为进度条添加UI样式
        dom.className += ' ui-progressbar';
        // 进度完成容器元素插入进度容器
        dom.appendChild(progress);
      },
      slider: function() {}
    };
    /**
     * 获取视图层渲染数据的映射信息
     * dom  组件元素
     */
    function getBindData(dom) {
      // 获取自定义属性data-bind的值
      var data = dom.getAttribute('data-bind');
      // 将自定义属性data-bind值(json字符串转)转化为对象
      return !!data && (new Function("return (" + data + ")"))();
    }
    // 组件实例化方法
    return function() {
      // 获取页面中所有元素
      var doms = document.body.getElementsByTagName('*');
      // 元素自定数据句柄
      var ctx = null;
      // ui处理会向页面中插入元素,此时dom.length会发生改变,此时动态获取dom.length
      for (var i = 0; i < doms.length; i++) {
        // 获取元素自定义数据
        ctx = getBindData(doms[i]);
        // 如果元素是ui组件,则根据自定义属性中组件类型,渲染改组件
        ctx.type && method[ctx.type] && method[ctx.type](doms[i], ctx)
      }
    }
  }();
  //将视图模型绑定在模型对象上,供外部使用
  window.VM = VM;
})(window);

/**
 * eval('('+data+')')和new Function('return ('+data+')')()将json字符串转化为对象
 */

// 测试
var demo = {
  position: 50
}
VM();
