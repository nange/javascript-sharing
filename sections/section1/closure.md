## 理解闭包

概念：
一个拥有许多变量和绑定了这些变量的环境的表达式（通常是一个函数），
因而这些变量也是该表达式的一部分。

光看概念会让人不知所措，其实闭包是建立在另外两个特性之上的：变量的作用域链和垃圾回收。

变量作用域链前面已经讲过来，主要是需要理解垃圾回收。先看下面这段代码：
```javascript
function f() {
    var person = {
        name: '张三',
        say: function() {
            console.log('my name is：' + this.name);
        }
    };
    person.say();
}
f();
```

在执行函数f时，会在内存的堆空间申请一块内存用于存放person对象。栈空间同样会申请一定空间
来存放堆的引用，栈空间结构大概如下：
<table>
<thead>
    <tr>
        <th>变量名</th>
        <th>变量值</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>person</td>
        <td>x01020203(堆地址，即指向堆空间的指针)</td>
    </tr>
</tbody>
</table>

当函数f执行完毕时，栈空间的内存立即被回收，指向堆的引用自然也断了。此时堆空间所占用的内存
就处于等待被垃圾收集器回收的阶段。这段内存无法再通过程序访问到。

这是垃圾回收简单的过程，但是当一个堆空间的对象还被栈空间的变量引用到时，垃圾收集器是无法
回收堆空间内存的。由于这个特性再加上变量的作用域链，就可能出现如下代码：
```javascript
var fn = function() {
    var person = {
        name: '张三',
        say: function() {
            console.log('my name is:' + this.name)
        }
    }；
    return function() {
        person.say();
    };
}();

```
在上面的代码中，fn赋值为了一个立即执行的函数，这个函数又返回了一个匿名的函数，但是立即执行
函数执行后，person对象所占内存空间依旧得不到释放，因为返回的匿名函数内部还持有person对象
的引用，像这种运行时的上下文就被称为闭包。


#### 最佳实践

1. 使用立即调用函数表达式创建局部作用域


#### links

* 下一章：[javascript中的面向对象](../section2/section2.md)
