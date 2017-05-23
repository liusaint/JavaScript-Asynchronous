(function() {
	/* *注意这里的timeout值为0或10，执行的结果会不一样*/
	return;
	var promise = new Promise(function(resolve, reject) {
		console.log('timer1_begin', new Date().getTime())
		setTimeout(function() {
			console.log('in', new Date().getTime());
			if (Math.random() < 0.5) {
				resolve(6)
			} else {
				reject(4);
			}

		}, 0);

	})

	console.log(promise); //Promise { <pending> }
	console.log('timer2_begin', new Date().getTime())
	setTimeout(function() {
		console.log('out', new Date().getTime())
			// console.log(promise); // Promise { 6 } 或 Promise { <rejected> 4 }

		//resolved 之后注册的。
		// promise.then(function(value) {
		// 	console.log(value, 'resolved0');
		// }, function(value) {
		// 	console.log(value, 'rejected0');
		// })


	}, 0);

	//resolved 之前注册的。
	promise.then(function(value) {
		console.log(value, 'resolved', new Date().getTime());
	}, function(value) {
		console.log(value, 'rejected', new Date().getTime());
	})

})();


/*resolve中传递promise,p2的状态由p1决定
 */

(function() {
	return;
	var p1 = new Promise(function(resolve, reject) {

		setTimeout(function() {

			if (Math.random() < 0.5) {
				resolve(6)
			} else {
				reject(4);
			}

		}, 10);

	})

	var p2 = new Promise(function(resolve, reject) {
		resolve(p1);
	})

	p2.then(function(value) {
		console.log('p2 yes');
	}, function(value) {
		console.log('p2 no');
	})

	console.log(p1, p2, 1)
	setTimeout(function() {
		console.log(p1, p2, 2)
	}, 10)
})();


(function() {

	// return;
	// then中的return会传递到下一个then的success中。
	// promise的then，会在第一个有fail回调的then中执行，如果有return,会在下一个回调的success中执行。

	var p = new Promise(function(resolve, reject) {
		if (Math.random() < 0.5) {
			resolve(6)
		} else {
			reject(4);
		}

	});
	console.log(p);

	p.then(function(data) {
		console.log(data)
		return 6;
	}).then(
		function(data) {
			console.log(data);
			return {
				a: 1
			}
		},
		function(data) {
			console.log(data, 'fail');
			return {
				res: 'fail'
			};

		}
	).then(
		function(data) {
			console.log(data)
		},
		function(data) {
			console.log(data, 'fail')
		}
	)

})();