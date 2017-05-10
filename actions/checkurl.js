var fs = require('fs');
var shell = require('shelljs');
var colors = require('../conf/colors')

exports.route = '/action/checkurl'
module.exports = function checkUrl(req, res, next) {
	let query = req.query;
	let proxy_pass = query.using || 'mqsas'
	fs.writeFile("server", assemble(servers, proxy_pass), (err, result)=>{
		console.log('restart ngix'.error)
		let resultCode = exec(restart);
		if(resultCode !== 0) {
			res.send({status: false})
		}else {
			res.send({status: true})
		}
	});
	return ;
}

