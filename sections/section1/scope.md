## 变量的作用域

#### javascript只有全局作用域和函数作用域，不支持块级作用域。

如下：
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


#### 理解变量提升

如下：
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
在函数f中第一个打印结果并没有得到我们预期的hello，而是打印了undefined；
而调用f2()也没有报错，即使f2的定义在调用之后。

这些都是因为变量提升导致的。实质上上面的代码等价于：
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


#### 理解变量作用域链

对于嵌套函数而言，里层函数具有访问其外层函数作用域的能力，这就形成了变量作用域链。

如下：
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
从打印结果可以看出在f2中可以可以访问在上级函数f中定义的变量。

在javascript中，对于一个变量的查找，首先会在当前的function中，要是当前的function总找
不到，则继续向上，到其外层function查找，如果还无法找到，则继续执行此逻辑，直到查找到顶层
全局作用域window为止。这就形成了变量的作用域链。


#### 最佳实践

1. 尽量少用全局变量
2. 始终使用var声明局部变量
3. 避免使用with
