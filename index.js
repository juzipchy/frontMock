const Mock = require('mockjs'),
	_ = require('lodash'),
	delay = require('express-delay'),
	posts = require('./route/post'),
	http = require('http'),
	gets = require('./route/get'),
	express = require('express'),
	fs = require('fs'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	actionRoutes = require('./route/actionroutes'),
	query = require('./db/query'),
	app = express();

	app.use('/public',express.static('dist'))
	app.use(bodyParser.json({limit: '1mb'})) //解析post数据
	app.use(cors())
	// query({}, function(data=[]){
	// 	data.map((item)=>{
	// 		if(item.type === 'get'){
	// 		    app.get(item.path , function(req, res) {
	// 		    	query({path: item.path, type: 'get'} , function(data={}){
	// 		    		data = data[0] || {};
	// 		        	var text = Mock.mock(data.results)
	// 		        	res.send(text);
	// 	        	});
	// 		    });
	// 		}
	// 		if(item.type === 'post'){
	// 		    app.post(item.path , function(req, res) {
	// 		    	query({path: item.path, type: 'get'} , function(data={}){
	// 		    		data = data[0] || {};
	// 		        	var text = Mock.mock(data.results)
	// 		        	res.send(text);
	// 	        	});
	// 		    });
	// 		}
	// 	})
	// });
	_.map(actionRoutes, (value, name)=>{
		if(value.type === 'POST' || value.type === 'post') {
				app.post(name , function(req, res, next) {
					const action = require('./actions/' + value.data)
					action(req, res, next);
		        }, function(req, res, next){
		        	// console.log(req, 'next')
		        });
		}else {
				app.get(name , function(req, res, next) {
					const action = require('./actions/' + value.data)
					action(req, res, next);
		        }, function(req, res, next){
		        	// console.log(req, 'next')
		        });
		}
		
	});
	app.use(delay(1,1000))
	_.each(posts, function (value, name) {
	    app.post(name , function(req, res) {
	    	let dataFormatted = JSON.parse(fs.readFileSync(`./data/${value.data}.json`));
				let text ;
					try {
						text = Mock.mock(dataFormatted)

					} catch (e) {
						text = dataFormatted;
					} finally {

					}
	        res.send(text);
	    });
	})
	_.each(gets, function (value, name) {
		    app.get(name , function(req, res) {
		    	let dataFormatted = JSON.parse(fs.readFileSync(`./data/${value.data}.json`));
					let text ;
						try {
							text = Mock.mock(dataFormatted)

						} catch (e) {
							text = dataFormatted;
						} finally {

						}
		        res.send(text);
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
