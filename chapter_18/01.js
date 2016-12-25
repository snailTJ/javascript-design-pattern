/**
 * 观察者模式
 */

var Observer = (function() {
  var _message = {};
  return {
    //注册
    register: function(type, fn) {
      if (typeof _message[type] === 'undefined') {
        _message[type] = [fn]
      } else {
        _message[type].push(fn);
      }
      return this;
    },
    // 发布消息
    fire: function(type, args) {
      if (!_message[type]) {
        return;
      }
      //定义消息信息
      var events = {
        type: type,
        args: args || {}
      };
      for (var i = 0; i < _message[type].length; i++) {
        _message[type][i].call(this, events);
      }
    },
    // 移除
    remove: function(type, fn) {
      if (_message[type] instanceof Array) {
        //从最后一个消息动作遍历
        var i = _message[type].length;
        while (i--) {
          _message[type][i] === fn && _mesage[type].splice(i, 1);
        }
      }
    }
  }
})();


//测试
(function() {
  // 追加一条信息
  function addMessageItem(e) {var text = e.args.text;

    console.log(text);
    if (!text) return false;
    var ul = document.getElementById('msg');
    var li = document.createElement('li');
    var span = document.createElement('span');
    span.innerHTML = '移除';
    li.innerHTML = text;
    span.onclick = function() {
      this.parentNode.parentNode.removeChild(this.parentNode);
      Observer.fire('addCommentMessage', {
        num: -1
      })
    }
    li.appendChild(span);
    ul.appendChild(li);
  }
  Observer.register('addCommentMessage', addMessageItem);
})();


(function() {
  //更改用户消息数目
  function changeMsgNum(e) {
    var num = e.args.num;
    var nun_msg = document.getElementById('msg_num');
    nun_msg.innerHTML = parseInt(nun_msg.innerHTML) + num;
  };
  // 注册添加用户
  Observer
    .register('addCommentMessage', changeMsgNum)
    .register('removeCommentMessage', changeMsgNum)
})();

(function() {
  document.getElementById('user_submit').onclick = function() {
    var val = document.getElementById('user_input');
    if (val.value == '') {
      return;
    }
    Observer.fire('addCommentMessage', {
      text: val.value,
      num: 1
    })
    val.value = '';
  }
})()
