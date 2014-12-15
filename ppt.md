title: javascript 面向对象
speaker: Lanceli
url: https://github.com/nange/javascript-sharing
transition: zoomin

[slide]

# javascript中的面向对象
----
author: Lanceli


[slide]

## Javascript基础
----
先了解一些javascript中几个比较难理解的知识点


[slide]

* # 变量的作用域

* # 难以琢磨的this

* # 理解闭包


[slide]

## 变量的作用域


[slide]

## javascript只有全局作用域和函数作用域
## 不支持块级作用域
----

```javascript
var a = 'hello';
function f() {
	var b = ' world';
	if (b) {
		var c = ' I am c.';
	}
	console.log(a + b + c); // hello world I am c.
}
f();
console.log(b); // Error. b is not defined.
```

在函数f内部可以访问全局变量a，并且可以访问到在if块级代码中定义的c变量。


[slide]

## 理解变量提升
----

```javascript
var a = 'hello';
function f() {
	console.log(a); // undefined
	var a = 'world';
	console.log(a); // world
}
f();

f2(); // f2...
function f2() {
	console.log('f2...');
}
```


[slide]

## 实际上上面的代码等价于：
----

```javascript
function f2() {
	console.log('f2...');
}
var a = 'hello';
function f() {
	var a;
	console.log(a); // undefined
	a = 'world';
	console.log(a); // world
}
f();

f2(); // f2...
```

这就是为什么第一个打印语句是undefined的原因。


[slide]

## 理解变量作用域链
----

对于嵌套函数而言，里层函数具有访问其外层函数作用域的能力，这就形成了变量作用域链。


[slide]

```javascript
function f() {
	var a = 'hello';
	function f2() {
		var b = ' world';
		console.log(a + b); // hello world
	}
	f2();
}
f();
```


[slide]

## Best Practice
----

* ### 尽量少用全局变量

* ### 始终使用var声明局部变量

* ### 避免使用with


[slide]

# 难以琢磨的this
----

this 是容易让人困惑的


[slide]

## 默认情况下this指向全局对象
----

默认情况下，this引用的是全局对象。

在浏览器里它指向的就是window对象（在node.js里就是global）。


[slide]

## 方法内部的this
----

如果有个对象中的某个成员是个function，
那么当你从这个对象上调用这个方法的时候this就指向了这个父对象。


[slide]

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


[slide]

## 事件调用方法内部的this
----

这种情况实质上只是上一种情况的扩展。假设有一个button被点击时，调用person1.say

```javascript
var btn = document.getElementById('button1');
btn.addEventListener('click', person1.say);
```

当点击button1时，上面的代码会打印'my name is undefined'


[slide]

实际上上面的代码等价于：

```javascript
var btn = document.getElementById('button1');
btn.onclick = person1.say;
```
这样就更好理解了。


[slide]

#### 构造函数中的this
----

当你用构造函数创建一个对象的实例时，那么构造函数里的this就是你新建的这个实例。

```javascript
var Person = function(name, age) {
    this.name = name;
    this.age = age;
};
var person1 = new Person('张三', 20);
console.log(person1.name + ' ' + person1.age); // 张三 20
```


[slide]

为了便于理解，可以把new的执行过程理解为：

```javascript
var that = {};
that.name = name;
that.age = age;
return that;
```

[slide]

#### call，apply和bind改变this的指向
----

```javascript
someFn.call(this, arg1, arg2, arg3);
```

```javascript
someFn.apply(this, [arg1, arg2, arg3]);
```

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


[slide]

# 理解闭包
----

概念：
一个拥有许多变量和绑定了这些变量的环境的表达式（通常是一个函数），
因而这些变量也是该表达式的一部分。


[slide]

其实闭包是建立在另外两个特性之上的：变量的作用域链和垃圾回收。

理解垃圾回收：
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


[slide]

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

像这种运行时的上下文就被称为闭包。


[slide]

## Best Practice

* ### 使用立即调用函数表达式创建局部作用域


[slide]

## javascript中的面向对象
----

javascript区别于传统的基于类的面向对象，它是基于原型的面向对象语言。


[slide]

## 理解prototype
#### 什么是prototype
----

prototype是函数上的一个属性，通常和构造函数一起搭配使用，在构造函数前使用new
关键字，创建生成的对象，将会获得这个函数原型上的属性和方法。


[slide]

```javascript
var Person = function(name, age) {
	this.name = name;
	this.age = age;
};

Person.prototype.say = function() {
	console.log(this.name + ' ' + this.age);
};

var p = new Person('张三', 20);
p.say(); // 张三 20
```

[slide]

为什么会这样，内部到底怎么发生了什么？ 一个对象怎么知道自己的原型是什么？

<br>
事实上在调用一个对象的属性和方法时，首先会找自己本身有没有这个属性和方法，
如果没有，则会从对象的'__proto__'属性指向的对象上查找。


[slide]

## 重新思考new关键字

```javascript
Function.method('new', function(Fun) {
	var that.__proto__ = Object.create(Fun.prototype);
	var other = Fun.apply(that, arguments);

	return typeof other == 'object' ? other : that;
});
```

[slide]
#### javascript中的继承
----
javascript中没有extends关键字，但javascript极其灵活，可以轻松模拟继承。

```javascript
var Person = function(name, age) {
	this.name = name;
	this.age = age;
};
Person.prototype.say = function() {
	console.log(this.name + ' ' + this.age);
};

var Employee = function(name, age, salary) {
	Person.call(this, name, age);
	this.salary = salary;
};
Employee.prototype = Object.create(Person.prototype);

Employee.prototype.saySalary = function() {
	console.log('I am happy. My get salary: ' + this.salary);
};

var emp = new Employee('张三', 20, 5000);
emp.say(); // 张三 20
emp.saySalary(); // I am happy. My get salary: 50000
```

[slide]

## Object.create内部是怎么实现的？

```javascript
Object.create = function(proto) {
	var F = function() {};
	F.prototype = proto;
	return new F;
};
```


[slide]

## Best Practice
----

* ### 在原型上定义方法实现
* ### 把状态定义到实例对象上


[slide]

## 实例
----

Talk is cheap, Show me the code !


[slide]

## 其他扩展

* ## requirejs
