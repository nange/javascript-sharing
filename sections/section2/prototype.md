## 理解prototype

#### 什么是prototype

prototype是函数上的一个属性，通常和构造函数一起搭配使用，在构造函数前使用new
关键字，创建生成的对象，将会获得这个函数原型上的属性和方法。

比如：
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

为什么会这样，内部到底怎么发生了什么？ 一个对象怎么知道自己的原型是什么？

事实上在调用一个对象的属性和方法时，首先会找自己本身有没有这个属性和方法，
如果没有，则会从对象的\__proto\__属性指向的对象上查找。

重新思考new关键字，如果把new看成一个方法的话，而不是关键字，那么它的实现会像这样：
```javascript
Function.method('new', function(Fun) {
	var that.__proto__ = Object.create(Fun.prototype);
	var other = Fun.apply(that, arguments);

	return typeof other == 'object' ? other : that;
});
```

#### javascript中的继承

javascript中没有extends关键字，但javascript极其灵活，可以轻松模拟继承。

如下：

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

Object.create内部是怎么实现的？ 如下：
```javascript
Object.create = function(proto) {
	var F = function() {};
	F.prototype = proto;
	return new F;
};
```

#### 面向对象的核心

面向对象的核心是抽象和接口。 这是面向对象的本质部分，继承并不是面向对象的核心，
继承只是在一定程度上帮助我们更好的编写代码而已（这种方式不一定非得是继承，比如go语言，
同样支持面向对象，但不支持继承，而是采用组合的方式同样可以实现继承的功能）。

抽象出一个适当的模型和定义一个适当的接口，可以极大的提高代码重用性和可维护性。

#### 最佳实践

* ### 在原型上定义方法实现
* ### 把状态定义到实例对象上



#### links

* 下一章：[实例](example.md)
