var timeout;
 document.addEventListener('touchstart', function(){
 	console.log('start')
 }, false); 

document.addEventListener('touchstart', function (argument) {
	console.log('start')
	window.timeout = setTimeout(function(){
		alert(1)
	}, 10000) //5000毫秒
}, false); 

document.addEventListener('touchend', function (argument) {
	console.log('end')
	clearTimeout(window.timeout)
}, false); 
