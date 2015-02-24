title: nodejs, npm, gulp
speaker: LanceLi
url: https://github.com/nange/javascript-sharing
transition: move


[slide]

# Nodejs、Npm、Gulp
<small>author：LanceLi</small>


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
* 前端工程化


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


[slide]

# Gulp
## 前端工程化利器！


[slide]
# Gulp的服务端配置

prefix = /home/nange/npm-packages
