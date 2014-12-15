## 难以琢磨的this

this是javascript里很容易让人困惑的对象，有必要总结一下可以改变this指向的情况。

#### 默认情况下this指向全局对象

默认情况下，this引用的是全局对象。
在浏览器里它指向的就是window对象（在node.js里就是global）。


#### 方法内部的this

如果有个对象中的某个成员是个function，
那么当你从这个对象上调用这个方法的时候this就指向了这个父对象。

如下：
```javascript
var person1 = {
    name: '张三',
    say: function() {
        console.log('my name is: ' + this.name);
    }
};
person1.say(); // my name is 张三
```
这很符合我们的预期，但是当下面这样呢：

```javascript
var person1 = {
    name: '张三',
    say: function() {
        console.log('my name is: ' + this.name);
    }
};
person1.say(); // my name is 张三

var person2 = {
    name: '李四'
};
person2.say = person1.say;

person2.say(); // my name is 李四
```
为什么person2.say()打印的不是‘my name is 张三'？
其实对于这种情况，我们只需要记住一点，看到底是谁在调用这个方法，谁在调用，this就指向谁！

对于person1.say()，由于是person1调用的方法say(),因此say()方法里面的this指向person1；
同理，对于person2.say()，this自然就指向的是person2.


#### 事件调用方法内部的this

这种情况实质上只是上一种情况的扩展。假设有一个button被点击时，调用person1.say，如下：
```javascript
var btn = document.getElementById('button1');
btn.addEventListener('click', person1.say);
```
当点击button1时，上面的代码会打印'my name is undefined'；这是因为调用say方法的person1，
事件绑定函数内部的this会被设置为触发这个事件的元素，也就是这里的button。实际上上面的代码
等价于：
```javascript
var btn = document.getElementById('button1');
btn.onclick = person1.say;
```
这样就更好理解了。


#### 构造函数中的this

当你用构造函数创建一个对象的实例时，那么构造函数里的this就是你新建的这个实例。
如下：
```javascript
var Person = function(name, age) {
    this.name = name;
    this.age = age;
};
var person1 = new Person('张三', 20);
console.log(person1.name + ' ' + person1.age); // 张三 20
```
new 操作符改变了函数的执行方式，为了便于理解，可以把new的执行过程理解为：
```javascript
var that = {};
that.name = name;
that.age = age;
return that;
```


#### call，apply和bind改变this的指向

call、apply、bind方法存在于Function的prototype中，
它们允许我们在调用一个方法的时候传入一个this的值。

call方法的参数先是指定this参数，其后跟着的是方法调用时要用到的参数，这些参数是各自分开的。
如下：
```javascript
someFn.call(this, arg1, arg2, arg3);
```

apply的第一个参数同样也是this的值，而其后跟着的是调用这个函数时的参数的数组。如下：
```javascript
someFn.apply(this, [arg1, arg2, arg3]);
```

比如：
```javascript
var person1 = {
    name: '张三',
    say: function() {
        console.log('my name is: ' + this.name);
    }
};
var person2 = {
    name: '李四'
};

person1.say.call(person2); // my name is 李四
```

而bind函数不同于call和apply。
bind函数其实是返回一个新函数，而这个新函数中的this值正是用bind的参数来指定的。
