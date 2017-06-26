var fs = require('fs');
var shell = require('shelljs');
var colors = require('../conf/colors')

let restart = 'echo lanshan123 | sudo -S nginx -s reload',
	open = 'echo lanshan123 | sudo -S nginx'

let servers = [
	{
		listen: 80,
		locations: [
			{
				path: '/',
				proxy_pass: 'http://127.0.0.1:3000'
			},{
				path: '~ ^/(mqsas|mqsasdata|mqsasABTest|knowledge|whiteList|mqsasback|test1|myDeviceClound)/',
				using: 'mqsas',//
				proxy_passes: {
					zhangyang: 'http://10.232.39.9:8082',
					liuxiwen: 'http://10.232.33.9:8082',
					localhost: 'http://127.0.0.1:3001',
					linlin: 'http://10.232.33.23:8082',
					mqsas: 'http://sys.pt.miui.com',
					zhicai: 'http://10.232.32.7:8082',
					anqi: 'http://10.232.39.18:8082',
					dawei: 'http://10.232.33.44:8088',
					liuyilan: 'http://10.232.33.8:8082'
				}
			}
		]
	 }
]

function  assemble(servers=[], using="mqsas") {
	return servers.map((server)=>{ //servers解析
		let locations = server.locations || [];

		return `
server {
	listen ${server.listen};
	server_name  localhost www.localhost admin www.admin;

	${
		locations.map((location)=>{//locations解析
			let proxy_passes = location.proxy_passes || {};
			let proxy_pass = proxy_passes[using] || location.proxy_pass;
			console.log(`${location.path} `.debug +`is using: ` + `${using} -- ${proxy_pass}`.warn)
			return `
	location  ${location.path} {
		client_max_body_size    1000m;
		proxy_read_timeout 10000s;
		proxy_pass ${proxy_pass};
	}
			`
		}).join(' ')
	}
}
			`
	}).join(' ')

}

function exec(command='say hello') {
	return shell.exec(command).code;
}
exports.route = '/action/rewriteServer'
module.exports = function rewriteServer(req, res, next) {
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
