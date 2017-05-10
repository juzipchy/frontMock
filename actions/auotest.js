const settings = require('../conf/autotestsettings')
const requst = require('superagent')
const _ = require('lodash')
const fs = require('fs')

const analysisDatas = [];



function isBadRequest(data) {
  return data.httpStatus >= 400 || 
        data.status != data.successValue ||
        data.data === '空'
}

//发请求

function fetchAll(settings=[]){
	return Promise.all(settings.map(item=>generatePromise(item)))
		.then(function(data){
			writeFile({
				status: 'true',
				data:data	
			})
		}, function(err){
			console.log(err)
		})
	
}


function writeFile(json={}){
	fs.writeFile('../data/autoTestUrlResult.json',JSON.stringify(json), function(err){
		if(err) return;
		console.log('success write')
	})
}	

function generatePromise(data) {
	return new Promise(function(resolve, reject){
		requst(data.type || 'GET', 'http://admin.sec.miui.com'+data.url)
			.query(data.params)
			.send(data.params)
			.end(function(err, res){

				let analysisData = Object.assign({}, data);
				analysisData.httpStatus = res.statusCode; //http code

				if(!err) {
				  let resData = res.body;
				  analysisData.status = resData.status;
				  analysisData.data = _.isEmpty(resData[data.resultKey]) ? '空': '不为空';
				}
				if(isBadRequest(analysisData)) {
				  analysisData.isBad = true;
				}
				resolve(analysisData)
			})
	});
}

fetchAll(settings)