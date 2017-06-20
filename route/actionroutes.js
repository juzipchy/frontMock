const route = {
	'/mock/get/test': {
		type: 'GET',
		data: 'test'
	},
	'/action/start': {
		data: 'start'
	},
	'/action/rewriteServer': {
		data: 'rewriteserver'
	},
	'/action/checkurl': {
		data: 'checkUrl'
	},
	'/action/createmock': {
		data: 'createmock',
		type: 'POST'
	},
	'/action/collecterror': {
		data: 'collecterror',
		type: 'POST'
	}
}

module.exports = route;
