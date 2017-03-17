const Mock = require('mockjs'),
	_ = require('underscore'),
	// delay = require('express-delay'),
	posts = require('./route/post'),
	http = require('http'),
	gets = require('./route/get'),
	express = require('express'),
	fs = require('fs'),
	app = express();
	// app.use(delay(100000))
	_.each(posts, function (value, name) {
	    app.post(name , function(req, res) {
	    	let dataFormatted = JSON.parse(fs.readFileSync(`./data/${value}.json`));
	        var text = Mock.mock(dataFormatted)
	        res.send(text);
	    });
	})
	_.each(gets, function (value, name) {
		    app.get(name , function(req, res) {
		    	let dataFormatted = JSON.parse(fs.readFileSync(`./data/${value}.json`));
		        var text = Mock.mock(dataFormatted)
		        res.send(text);
		    });
		})



// app.use(router)
app.listen(3001, function (err, result){
    if(err) return console.log(err);
    console.log('mock listen at 3001')
})

module.exports = app;