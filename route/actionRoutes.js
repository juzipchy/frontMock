const route = {
	'/mock/get/test': {
		type: 'GET',
		data: 'test'
	},
	'/action/start': {
		data: 'start'
	},
	'/action/rewriteServer': {
		data: 'rewriteServer'
	},
	'/action/checkurl': {
		data: 'checkUrl'
	},
	'/action/createmock': {
		data: 'createmock',
		type: 'POST'
	}
}

module.exports = route;