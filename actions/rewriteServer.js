var fs = require('fs');
var shell = require('shelljs');

let restart = 'echo _12345679 | sudo -S nginx -s reload',
	open = 'echo _12345679 | sudo -S nginx'

let servers = [
	{
		listen: 80,
		locations: [
			{
				path: '/',
				proxy_pass: 'http://127.0.0.1:3000'
			},{
				path: '~ ^/(mqsas|mqsasdata|mqsasABTest|knowledge|whiteList|mqsasback|test1|myDeviceClound)/',
				using: 'localhost',//
				proxy_passes: {
					liuxiwen: 'http://10.232.33.9:8082',
					localhost: 'http://127.0.0.1:3001',
					linlin: 'http://10.232.33.21:8082',
					anqi: 'http://10.232.39.18:8082',
					mqsas: 'http://admin.sec.miui.com',
					zhicai: 'http://10.232.32.7:8082'
				}
			}
		]
	 }
]

function  assemble(servers=[]) {
	return servers.map((server)=>{ //servers解析
		let locations = server.locations || [];

		return `
server {
	listen ${server.listen};
	server_name  localhost www.localhost;

	${
		locations.map((location)=>{//locations解析
			
			let proxy_passes = location.proxy_passes || {};
			let proxy_pass = proxy_passes[location.using] || location.proxy_pass;

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
	shell.exec(command)
}

module.exports = function rewriteServer(argument) {
	fs.writeFile("server", assemble(servers), (err, result)=>{
		console.log('restart ngix')
		exec(restart);
	});
	return ;
}

