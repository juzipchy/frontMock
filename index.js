const Mock = require('mockjs'),
	_ = require('lodash'),
	delay = require('express-delay'),
	posts = require('./route/post'),
	http = require('http'),
	gets = require('./route/get'),
	express = require('express'),
	fs = require('fs'),
	actionRoutes = require('./route/actionroutes'),
	query = require('./db/query'),
	app = express();
	app.use(delay(200, 1000))

	query({}, function(data=[]){
		data.map((item)=>{
			if(item.type === 'get'){
			    app.get(item.path , function(req, res) {
			    	query({path: item.path, type: 'get'} , function(data={}){
			    		data = data[0] || {};
			        	var text = Mock.mock(data.results)
			        	res.send(text);
		        	});
			    });
			}
			if(item.type === 'post'){
			    app.post(item.path , function(req, res) {
			    	query({path: item.path, type: 'get'} , function(data={}){
			    		data = data[0] || {};
			        	var text = Mock.mock(data.results)
			        	res.send(text);
		        	});
			    });
			}
		})

	});

	_.map(actionRoutes, (value, name)=>{
		app.get(name , function(req, res) {
			const action = require('./actions/' + value)
	        try{
	        	res.send(sendSuccess(action()));
	        }catch(e){
	        	res.send(sendError('test'));
	        }
        });
	});

// app.use(router)
app.listen(3001, function (err, result){
    if(err) return console.log(err);
    console.log('mock listen at 3001')
})

module.exports = app;

function sendSuccess(data={}) {
	return {
		status: true,
		data: data
	}
}

function sendError(reseans=''){
	return {
		status: false,
		reseans: reseans
	}
}