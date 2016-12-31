/**
 * 模板方法模式
 *
 * 归一化组件
 */

/**
 * Alert 基础类(模板对象)
 * @param {object} data [渲染数据]
 */
var Alert = function(data) {
  if (!data) {
    return;
  }
  // 设置内容
  this.content = data.content;
  // 创建提示面板
  this.pannel = document.createElement('div');
  // 创建提示内容组件
  this.contentNode = document.createElement('p');
  //创建确定按钮组件
  this.confirmBtn = document.createElement('span');
  // 创建关闭按钮组件
  this.closeBtn = document.createElement('b');
  // 为提示面板添加类
  this.pannel.className = 'alert';
  // 为关闭按钮添加类
  this.closeBtn.className = 'a-close';
  // 为确定按钮添加类
  this.confirmBtn.className = 'a-confirm';
  // 为确定按钮添加文案
  this.confirmBtn.innerHTML = data.confirm || '确定';
  // 为提示内容添加文本
  this.contentNode.innerHTML = this.content;
  // 点击确定按钮执行方法,如果data中有success方法则为success方法,否则为空函数
  this.success = data.success || function() {};
  // 点击关闭按钮执行方法
  this.fail = data.fail || {};
}

// 添加原型方法,init方法用来组装提示框,bindEvent方法来绑定点击确定或按钮关闭事件
Alert.prototype = {
  // 组装方法
  init: function() {
    //生成提示框
    this.pannel.appendChild(this.closeBtn);
    this.pannel.appendChild(this.contentNode);
    this.pannel.appendChild(this.confirmBtn);
    // 插入到页面中
    document.body.appendChild(this.pannel);
    // 绑定事件
    this.bindEvent();
    // 显示提示框
    this.show();
  },
  // 绑定事件
  bindEvent: function() {
    var that = this;
    // 关闭按钮点击事件
    this.closeBtn.onclick = function() {
        // 执行关闭取消的方法
        that.fail();
        // 隐藏弹层
        that.hide()
      }
      // 确定点击事件
    this.confirm.onclick = function() {
      // 执行关闭确认方法
      that.success();
      // 隐藏弹层
      that.hide();
    }
  },
  // 隐藏弹层的方法
  hide: function() {
    this.pannel.style.display = 'none';
  },
  // 显示弹层
  show: function() {
    this.pannel.style.display = 'block';
  }
}


// 以后所有的弹层就根据这个模板去实现
// 定义一个右侧提示框
var RightAlert = function(data) {
  // 继承基本提示框构造函数
  Alert.call(this, data);
  // 为确定按钮添加right类设置位置居右
  this.confirmBtn.className = this.confirmBtn.className + ' right';
};
// 继承原型方法
RightAlert.prototype = new Alert();
