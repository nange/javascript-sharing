var app = require('koa')();
var serve = require('koa-static');
var router = require('koa-router');
var koaBody = require('koa-body-parser');
var session = require('koa-session');
var httpinvoke = require('httpinvoke');
var port = 80;
var tmpURL = 'http://172.17.103.79:8380/restsearch/template/search.jsp';
var restURL = 'http://172.17.103.79:8380/securerest/acp/search/RESTSearch';


app.use(serve('./app'));
app.use(koaBody());
app.keys = ['demo'];
app.use(session(app));
app.use(router(app));


var converters = {
    'text json': JSON.parse,
    'json text': JSON.stringify
};

app.get('/tpl/search.jsp', function *() {
  var res = yield httpinvoke(tmpURL + this.search, 'GET');
  this.body = res.body;
});

app.post('/securerest/acp/search/RESTSearch', function *() {
	console.log(this.request.body)
	var ctx = this;
	var res = yield httpinvoke(restURL, 'POST', {
		input: ctx.request.body,
        inputType: 'json',
        converters: converters,
        headers: {
	        'Content-Type': 'application/x-www-form-urlencoded'
	    }
	});
	console.log(res.body);
	this.body = res.body;
});


app.listen(port);
console.log('ACMC Demo is on port ' + port + '!');
