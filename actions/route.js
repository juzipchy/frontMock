const Rx = require('rxjs')

let observer = Rx.Observable.create(function (observer) {
	let count = 1;
	console.log(count)
	setInterval(function(){
		observer.next(++count)
	},1000)

});

let a = observer.subscribe(function(data){
	console.log(data);
})

let b = observer.subscribe(function(data){
	console.log(data);
	if(data==5) b.unsubscribe();
})
