const Rx = require('rxjs/Rx'),
	_ = require('lodash'),
	query = require('../db/query'),
	fs = require('fs')

//直接通过require来获取
var FileReader = function FileReader(filename) {
    return Rx.Observable.create(function (observer) {
    	let result = require(filename);
    	if(!result) {
    		observer.error({reason:'no such file'});
    	}else {
    		observer.next(result);
    	}
    	observer.complete('completed');
    });
};


//数据库查询
var DbQuery = function(queryData={}){
	return Rx.Observable.create(function (observer) {
    	query(queryData, (data)=>{
    		console.log(data)
    		data.forEach((item)=>{
    			observer.next(item);
    		});
		})
    });
	
}


exports.FileReader = FileReader;

// module.exports = FileReader('../route/get.js').map((data)=>{
// 	return _.map(data, (value, name)=>{
// 		return name;
// 	});
// });

module.exports = DbQuery({path:'/mqsasdata/getDropframelvpkn.do'}).map((data)=>data.results);