/**
 *  组合模式应用的场景和特点：
 *  场景：
 *  1 存在一批组织成某种层次体系的对象
 *  2 希望对这批对象或其中的一部分对象实施一个操作
 *
 *  应用特点：
 *  1 组合模式中只有两种类型对象：组合对象、叶子对象
 *  2 这两种类型都实现同一批接口
 *  3 一般我们会在组合对象中调用其方法并隐式调用"下级对象"的方法（这里我们一般采用递归的形式去做）
 *
 */

/*
* 场景模拟：
*  -> 公司(Composite)
*       -> 北京分公司(Composite)
*                    -> 财务部门(Composite)
*                                -> 张1(叶子对象)
*                                -> 张2(叶子对象)
*                                -> 张3(叶子对象)
*
     -> 销售部门
*                                -> 张4(叶子对象)
*                                -> 张5(叶子对象)
*                                -> 张6(叶子对象)
        -> 长沙分公司
*                    -> 财务部门
*                                -> 张7(叶子对象)
*                                -> 张8(叶子对象)
*                                -> 张9(叶子对象)
*                    -> 销售部门
*                                -> 张10(叶子对象)
*                                -> 张11(叶子对象)
*                                -> 张12(叶子对象)
*
*    实际的任务具体是落实到人上去实施的 也就是说只有人才具有具体的方法实现
*/
// 接口对象
var Interface = require('./Interface.js');

// 创建组合对象接口实例
var CompositeInterface = new Interface('Composite', ['addChild', 'getChild']);
// 创建叶子对象接口实例
var LeafInterface = new Interface('Leaf', ['hardworking', 'sleeping']);

//创建组合对象
var Composite = function(name) {
  this.name = name;
  this.type = 'Composite'; //表示对象的类型
  this.children = []; //用来承接叶子对象
  // 所以每一个实例化对象我们都要验证是否实现CompositeInterface和接口
  Interface.ensureImplements(this, CompositeInterface, LeafInterface);
}

// 组合对象添加原型方法
Composite.prototype = {
  constructor: Composite,
  //实现CompositeInterface接口的addChild和getChild方法
  addChild: function(child) {
    this.children.push(child);
    return this;
  },
  getChild: function(name) {
    //用来接受叶子对象的类型
    var elements = [];
    //判断是不是叶子对象,如果是叶子对象就添加到数组中
    //如果不是,则递归继续调用
    var pushLeaf = function(item) {
        if (item.type == 'Composite') {
          // callee表示当前正在执行的函数(function),是arguments对象的成员,argumenst.length是实参的长度
          // arguments.callee.length是形参的长度
          // arguments.caller返回一个对函数的引用(在一个函数调用另外一个函数,会生成caller属性,指向调用他的函数对象,没有为null)
          //但是不可在严格模式下的函数内使用
          item.children.map(arguments.callee);
        } else if (item.type == 'Leaf') {
          elements.push(item);
        }
      }
      // /根据name 让指定name下的所有的类型为Leaf的对象去执行操作
    if (name && this.name != name) {
      this.children.each(function(item) {
        // 如果name是2级节点
        if (item.name === name && item.type == 'Composite') {
          item.children.map(pushLeaf);
        }
        //如果传递的name是3级,4级...
        if (item.name !== name && item.type == 'Composite') {
          item.children.map(arguments.callee);
        }
        //如果传递的是叶子对象
        if (item.name === name && item.type == 'Leaf') {
          elements.push(item);
        }
      })
    } else {
      //如果没有传递name,就让所有的Leaf去去执行操作
      this.children.map(pushLeaf);
    }
    return elements;
  },
  //实现LeafInterface接口的hardworking和sleeping方法
  hardworking: function(name) {
    //得到所有Leaf类型的对象数组
    var leafObject = this.getChild(name);
    for (var i = 0; i < leafObject.length; i++) {
      leafObject[i].hardworking();
    }
  },
  sleeping: function(name) {
    //得到所有Leaf类型的对象数组
    var leafObject = this.getChild(name);
    for (var i = 0; i < leafObject.length; i++) {
      leafObject[i].sleeping();
    }
  }
}

//叶子对象
var Leaf = function(name) {
  this.name = name;
  this.type = 'Leaf'; //表示叶子对象的类型
  //叶子对象要和组合对象实现一样的接口
  // 所以每一个实例化对象我们都要验证是否实现CompositeInterface和接口
  Interface.ensureImplements(this, CompositeInterface, LeafInterface);
}

Leaf.prototype = {
  constructor: Leaf,
  //实现CompositeInterface接口的addChild和getChild方法
  addChild: function() {
    //叶子对象不实现这个方法
    throw new Error('this method is disabled....')
  },
  getChild: function(name) {
    // 叶子对象自己只能查看自己
    if (this.name == name) {
      return this;
    }
    return null;
  },
  //实现LeafInterface接口的hardworking和sleeping方法
  hardworking: function() {
    console.log(this.name + '!努力挣钱娶媳妇');
  },
  sleeping: function() {
    console.log(this.name + '好累,还是睡一下');
  }
}


// 使用

// 创建叶子对象
var leaf1 = new Leaf('员工1');
var leaf2 = new Leaf('员工2');
var leaf3 = new Leaf('员工3');
var leaf4 = new Leaf('员工4');
var leaf5 = new Leaf('员工5');
var leaf6 = new Leaf('员工6');
var leaf7 = new Leaf('员工7');
var leaf8 = new Leaf('员工8');


// 创建公司部门
var dept1 = new Composite('部门1');
var dept2 = new Composite('部门2');
var dept3 = new Composite('部门3');
var dept4 = new Composite('部门4');

//部门添加员工
dept1.addChild(leaf1).addChild(leaf2);
dept2.addChild(leaf3).addChild(leaf4);
dept3.addChild(leaf5).addChild(leaf6);
dept4.addChild(leaf7).addChild(leaf8);

//创建子公司
var branchCom1 = new Composite('公司1');
var branchCom2 = new Composite('公司2');
//公司添加部门
branchCom1.addChild(dept1).addChild(dept2);
branchCom2.addChild(dept3).addChild(dept4);

//创建总公司
var company = new Composite('总部');
// 总部添加分公司
company.addChild(branchCom1).addChild(branchCom2);

//测试
//让整个所有的员工努力工作
company.hardworking();
// 让子公司1的所有员工去睡觉
branchCom1.sleeping();
