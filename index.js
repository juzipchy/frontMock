const Mock = require('mockjs'),
	_ = require('underscore'),
	// delay = require('express-delay'),
	router = require('./router.js'),
	express = require('express'),
	app = express()
	// app.use(delay(100000))
	_.each(router, function (data, name) {
		console.log(name)
		if(data.type == 'GET'){
		    app.get(name , function(req, res) {
		        var text = Mock.mock(require(data.data))
		        res.send(text);
		    });
		}
		if(data.type == 'POST'){
		    app.post(name , function(req, res) {
		    	// console.log(req.files)
		        var text = Mock.mock(require(data.data))
		        res.send(text);
		    });
		}
	})

// app.use(router)
app.listen(3001, function (err, result){
    if(err) return console.log(err);
    console.log('mock listen at 3001')
})

module.exports = app;