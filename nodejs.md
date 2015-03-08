title: nodejs, npm, gulp
speaker: LanceLi
url: https://github.com/nange/javascript-sharing
transition: move


[slide]

# Nodejs
<small>author：LanceLi</small>


[slide]
# List {:&.flexbox.vleft}

* Nodejs是什么
* Nodejs底层模型
* Nodejs适用场景
* NPM
* 前端工程化(Gulp)


[slide]

# Nodejs是什么 {:&.flexbox.vleft}
Node.js® is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient


[slide]

# Nodejs底层模型 {:&.flexbox.vleft}

* 单线程异步IO
* 事件循环


[slide]

# 单线程异步IO {:&.flexbox.vleft}

* 单线程是指javascript代码执行在单线程上
* 理解异步同步和阻塞非阻塞是不同的概念


[slide]

# 事件循环
<img src="/event-loop.jpg">


[slide]

## Nodejs适用场景分析
----
* IO密集型（不适合计算密集型） {:&.moveIn}
* 和其他系统集成，作为胶合层
* 前端工程化(Gulp)

[slide]

## 一个简单的服务器例子
----
向客户端输出Hello World
```javascript
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<h1>Hello World</h1>');
}).listen(80, '127.0.0.1');
console.log('Server running at http://127.0.0.1/');
```


[slide]

# Npm {:&.flexbox.vleft}

>#### npm is the package manager for javascript.

>#### www.npmjs.com

>package.json


[slide]

# Gulp
## 前端工程化利器！(对比grunt)


[slide]

# 安装
----
全局安装Gulp(命令行工具):
```
npm install -g gulp
```

项目里面安装Gulp:
```
npm install --save-dev gulp
```

[slide]

# 创建Gulp任务
----
gulpfile.js是定义任务的地方，以压缩js为例：
```
var gulp = require('gulp'),
   uglify = require('gulp-uglify');

gulp.task('minify', function () {
   gulp.src('js/app.js')
      .pipe(uglify())
      .pipe(gulp.dest('build'))
});
```


[slide]
# 补充：Gulp的服务端配置
##服务器端可能遇到的问题：无法使用sudo权限


解决办法：手动配置指定全局包路径

```
npm config set prefix /home/username/npm-packages
```
