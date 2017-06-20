const fs = require('fs');
const shell = require('shelljs');
const path = require('path')
const colors = require('../conf/colors')

const getRoutes = require('../route/get.json')
const postRoutes = require('../route/post.json')

module.exports = function(req, res, next) {
	let params = req.body;
	const {
		url,
		data,
		type
	} = params;

	let routes = type === 'GET' ? getRoutes: postRoutes;
	writeRoute(type, url, routes, data, (err, result) => {
		if(err) {
			res.send({
				status: false,
				message: '创建失败'
			});

			return;
		}
		res.send({
			status: true,
			message: '创建成功'
		})
	})
}

function writeRoute(type = 'GET', url, routes = {}, data = {}, callback) {

	let name = url.toLowerCase().split(/[\/\.]/).join(''); //mock文件名
	routes[url] = {
		data: name
	};

	fs.writeFile(path.join(__dirname, '../route/' + (type === 'GET' ? 'get' : 'post') + '.json'), JSON.stringify(routes), (err, result) => {
		if (err) {
			callback(err, result);
			return;
		}

		fs.writeFile(path.join(__dirname, '../data/' + name + '.json'), JSON.stringify(data), (err, result) => {
			callback(err, result)
		});
	});
}
