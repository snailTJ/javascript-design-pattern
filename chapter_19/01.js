/**
 * 状态模式

步骤:
    1.创建一个状态对象,内部保存着状态变量
    2.内部封装好每种动作对应的状态
    3.状态对象返回一个接口对象,它可以对内部的状态修改或者调用
 */

var MarryState = function() {
  // 1.内部状态私有变量
  var _currentStat = {};
  var states = {
    jump: function() {
      console.log('jump');
    },
    move: function() {
      console.log('move');
    },
    shoot: function() {
      console.log('shoot');
    },
    squat: function() {
      console.log('squat');
    },
  };
  //2.动作控制类
  var Action = {
    // 状态改变方法
    changeState: function() {
      // 动作经过传递多个多个参数实现
      var arg = arguments;
      // 重置内部状态
      _currentStat = {};
      // 如果有动作就添加动作
      if (arg.length) {
        for (var i = 0; i < arg.length; i++) {
          _currentStat[arg[i]] = true;
        }
      }
      return this;
    },
    // 执行动作
    goes: function() {
      console.log('触发一次动作');
      // 遍历内部状态保存动作
      for (var i in _currentStat) {
        // 如果该动作存在就执行
        states[i] && states[i]();
      }
      return this;
    }
  };
  // 3.返回返回接口方法change,goes
  return {
    changeState: Action.changeState,
    goes: Action.goes
  }
}();

// 使用
MarryState.changeState('jump', 'shoot').goes()
