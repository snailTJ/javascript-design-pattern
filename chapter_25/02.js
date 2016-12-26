'use strict';

//缓存类
var Cache = (function() {
  var _cache = {};
  return {
    /**
     * 设置缓存
     * @param {string} key   键
     * @param {string} val   值
     * @param Boolen} cover 是否覆盖
     */
    set(key, val, cover) {
      if (!_cache[key] || cover) {
        _cache[key] = val;
      }
    },
    /**
     * 获取缓存
     * @param  {[string]}   键
     * @return {[sting]}    返回值
     */
    get(key) {
      return _cache[key] || '';
    },
    /**
     * 清楚缓存
     * @param  {[string]}   键
     */
    del(key) {
      delete _cache[key];
    }
  }
})()


// 使用
Cache.set('a', '1111');
console.log(Cache.get('a'));
Cache.del('a')
console.log(Cache.get('a'));
