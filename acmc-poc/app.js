var app = require('koa')();
var serve = require('koa-static');
var router = require('koa-router');
var koaBody = require('koa-body-parser');
var session = require('koa-session');
var httpinvoke = require('httpinvoke');
var port = 80;

app.use(serve('./app'));
app.use(koaBody());
app.keys = ['demo'];
app.use(session(app));
app.use(router(app));


app.get('/', function *() {
  httpinvoke('http://example.org', 'GET').then(function(res) {
    console.log('Success', res.body, res.statusCode, res.headers);
  }, function(err) {
      console.log('Failure', err);
  });

});


server.listen(port);
console.log('Chart Demo is on port ' + port + '!');
