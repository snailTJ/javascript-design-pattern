/**
 * 面向对象创建对象的时候忘了加new,所有我们现在利用一种安全的创建对象的模式
 * 就是看看当前this是不是当前对象的实例
 */

function Book(title, time, type) {
    if (!this instanceof Book) return new Book(title, time, type);
    this.title = title;
    this.time = time;
    this.type = type;
}

//上面这情况下不管你有没有加上new都不会出现问题
