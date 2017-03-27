const insert = require('./insert'),
	update = require('./update')
	query = require('./query');

// insert({a:1, b:[], c:{d:1, e: []}},'documents', (data)=>{
// 	console.log(data);
// })



// query({a:1}, function (data) {
// 	console.log(data)
// })

update({a:1}, {b:2}, function(data){
	console.log(data)
})
