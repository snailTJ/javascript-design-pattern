/**
 * 命名空间方式实现单例
 *     利用命名空间保证全局只有一个实例
 */

var UserInfo = {
  name: 'hujian',
  code: '0001',
  deptName: 'blue',
  deptCode: 'blue01',
  getName: function() {
    return this.name;
  }
}
