var app = require('koa')();
var serve = require('koa-static');
var router = require('koa-router');
var koaBody = require('koa-body-parser');
var session = require('koa-session');
var httpinvoke = require('httpinvoke');
var port = 80;
var tmpURL = 'http://172.17.103.79:8380/restsearch/template/search.jsp';
var restURL = 'http://172.17.103.79:8380/securerest/acp/search/RESTSearch';

var result = {
	"result":{
		"total":17,
		"start":0,
		"end":2,
		"timeConsumed":0.003369174,
		"title":"Search Customer User Result",
		"returnFields":[
			{"name":"firstName","description":"First Name","dataType":null,"label":null},
			{"name":"lastName","description":"Last Name","dataType":null,"label":null},
			{"name":"email","description":"Email","dataType":null,"label":null},
			{"name":"profileId","description":"Profile Id","dataType":null,"label":null},
			{"name":"age","description":"Age","dataType":null,"label":null},
			{"name":"birthDay","description":"BirthDay","dataType":"date","label":null},
			{"name":"auto_login","description":"Auto Login ","dataType":null,"label":null}
		],
		"results":[
			{"lastName":"zhou","auto_login":1,"email":"jordanzhou@aaxischina.com","profileId":"180002","age":12,"birthDay":"2015-04-04","firstName":"jordan"},
			{"lastName":"rr","auto_login":0,"email":"b1@b1.com","profileId":"1340004","age":45,"firstName":"ee"}
		]
	},
	"code":200,
	"msg":"service successfully with response",
	"success":true
}

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
	// console.log(this.request.body)
	// var ctx = this;
	// var res = yield httpinvoke(restURL, 'POST', {
	// 	input: ctx.request.body,
 //        inputType: 'json',
 //        converters: converters
	// });
	// this.body = res.body;
	this.body = result;
});


app.listen(port);
console.log('ACMC Demo is on port ' + port + '!');
