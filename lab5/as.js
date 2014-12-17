setTimeout(function() {
	var counter = 10, delay = 1000;
	Decreasing(counter, 1000);
}, 0);

function Decreasing(counter, delay) {
	if (counter) {
		console.log(counter.toString());
		counter--;
		setTimeout(function() {
			Decreasing(counter, 1000);
		}, 1000);
	}
}
