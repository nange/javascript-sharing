title: Font-end Technical Practice
speaker: LanceLi
url: https://github.com/nange/javascript-sharing
transition: move


[slide]
# Font-end Technical Practice
<small>author：LanceLi</small>


[slide]
# List {:&.flexbox.vleft}

* HTML、CSS、JS
* 工程化工具
* 前端新开发模式探索


[slide]
# 语意化标签 {:&.flexbox.vleft}

* video
* audio
* article
* section
* nav
* aside
* time
* header
* footer
* address
* ......


[slide]
# 模板引擎 {:&.flexbox.vleft}

handlerbarjs，mustache


[slide]

```javascript
<script id="entry-template" type="text/x-handlebars-template">
  <div class="entry">
    <h1>{{title}}</h1>
    <div class="body">
      {{body}}
    </div>
  </div>
</script>

var source   = $("#entry-template").html();
var template = Handlebars.compile(source);
var context = {title: "My New Post", body: "This is my first post!"};
var html    = template(context);
```

```html
<div class="entry">
  <h1>My New Post</h1>
  <div class="body">
    This is my first post!
  </div>
</div>
```


[slide]
# 对HTML的一些误解 {:&.flexbox.vleft}
----
* 不要在页面上使用script
* 不要在标签上使用onclick，onsubmit等等
* 不要把HTML，css，js放在同一目录下

----
不要被这些教条限制了思维。重要的是理解问题的本质。


[slide]
# CSS预处理器
----
sass，less


[slide]
# 变量

```css
// sass 语法
$blue : #1875e7;			　	
div {						
　color : $blue;			  
}							

// less 语法
@blue: #1875e7;
div {
　color : @blue;
}

// result
div {
　color : #1875e7;
}

```

[slide]
# 混合(类似于函数或者宏)

```css
// sass 语法
@mixin left($value: 10px) {
　float: left;
　margin-right: $value;
}
div {
　　@include left(20px);
}						

// less 语法
.left(@value: 10px) {
  float: left;
　margin-right: @value;
}
div {
  .left(20px)
}

// result
div {
　float: left;
  margin-right: 20px;
}

```


[slide]
# css框架 {:&.flexbox.vleft}

bootstrap等等。


[slide]
# 组织和管理js {:&.flexbox.vleft}

requirejs，seajs，ES6 module


[slide]

```javascript
// requirejs
//math.js
define(function() {
	// .....
	return {
		pi: 3.14,
		sum: function(x, y) {
			return x+y;
		}
	}
});
//app.js
require(['math'], function(math) {
	math.sum(math.pi, 10);
});


// ES6 module
//math.js
export function sum(x, y) {
  return x + y;
}
export var pi = 3.141593;

//app.js
import {sum, pi} from "lib/math";
sum(pi, 10);

```

[slide]
# 前端工程化

开发还有什么挑战。。

[slide]

# gulp {:&.flexbox.vleft}

打包 压缩 测试 复制 编译。。。

```javascript
gulp.task('concat-js', function () {
  gulp
	.src('bizacmc.war/app/**/*.js')
	.pipe(concat('app.js', {newLine: '\r\n'}))
    .pipe(gulp.dest('bizacmc.war/dist'));
});

gulp.task('watch', function() {
	gulp.watch('bizacmc.war/app/**/*.js', ['concat-js']);
});
```


[slide]
# 这些不是终点
----
新的开发模式探索。


[slide]
## 基于angularjs的前后端完全分离的开发模式

