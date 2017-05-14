var promise = new Promise(function(resolve, reject) {

	setTimeout(function() {

		if (Math.random() < 0.5) {
			resolve(6)
		} else {
			reject(4);
		}


	}, 1000);

})

console.log(promise); //Promise { <pending> }
setTimeout(function() {
	console.log(promise); // Promise { 6 } 或 Promise { <rejected> 4 }

	//resolved 之后注册的。
	promise.then(function(value) {
		console.log(value, 'resolved0');
	}, function(value) {
		console.log(value, 'rejected0');
	})
}, 1000);

//resolved 之前注册的。
promise.then(function(value) {
	console.log(value, 'resolved');
}, function(value) {
	console.log(value, 'rejected');
})