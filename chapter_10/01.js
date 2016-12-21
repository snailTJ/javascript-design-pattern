/**
 * 外观模式实现浏览器兼容
 */
function addEvent(dom, type, fn) {
    if (dom.addEventListener) {
        dom.addEventListener(type, fn, false);
    } else if (dom.attchEvent) {
        dom.attchEvent('on' + type, fn)
    } else {
        dom['on' + type] = fn;
    }
}
