
/*这里是一些要用到的全局变量，包括空白块blank，与空白块相邻的可移动块movable
当前拼图尺寸size，以及游戏是否开始shuffled。
其实这些全局变量都可以不使用。只是为了编程方便，使得程序更加简洁*/
var blank = {
	X_pos: 300,
	Y_pos: 300
}
var movable = new Array();
var size = 4;
var shuffled = false;
function $(id) {
	return document.getElementById(id);
}

function puzzle_fixed(puzzle, X_pos, Y_pos) {
	puzzle.style.top = Y_pos.toString()+'px';
	puzzle.style.left = X_pos.toString()+'px';
}

function move(target, x_from, y_from, x_to, y_to, counter) {
	counter++;
	movableReset();
	if (counter > 20) {
		return;
	}
	else if (x_from == x_to)
		setTimeout(function() {
			puzzle_fixed(target, x_from, y_from+(y_to-y_from)*counter/20);
			move(target, x_from, y_from, x_to, y_to, counter)
	}, 10);
	else if (y_from == y_to)
		setTimeout(function() {
			puzzle_fixed(target, x_from+(x_to-x_from)*counter/20, y_from);
			move(target, x_from, y_from, x_to, y_to, counter)
	}, 10);
}

function puzzle_slide(target) {
	var x_from = parseInt(target.style.left);
	var y_from = parseInt(target.style.top);
	var x_to = blank.X_pos, y_to = blank.Y_pos;
	blank.X_pos = x_from;
	blank.Y_pos = y_from;
	var counter = 0;
	move(target, x_from, y_from, x_to, y_to, counter);
}

function puzzle_finish() {
	var puzzles = $("puzzlearea").children;
	var finished = true;
	for (var i = 0; i < puzzles.length; i++) {
		if (i%size*(400/size) != parseInt(puzzles[i].style.left)) {
			finished = false;
			break;
		} else if (parseInt(i/size)*(400/size) != parseInt(puzzles[i].style.top)) {
			finished = false;
			break;
		}
	}
	return finished;
}

function movableReset() {
	movable.splice(0);
	if (puzzle_finish() && shuffled) {
		alert("You Win!");
		document.body.style.backgroundImage = "url(images/Win.jpg)";
		return;
	}
	var puzzles = $("puzzlearea").children;
	var X_pos = blank.X_pos, Y_pos = blank.Y_pos;
	for (var i = 0; i < puzzles.length; i++) {
		if (X_pos == parseInt(puzzles[i].style.left)) {
			if (Y_pos == parseInt(puzzles[i].style.top)-400/size)
				movable.push(puzzles[i]);
			if (Y_pos == parseInt(puzzles[i].style.top)+400/size)
				movable.push(puzzles[i]);
		} else if (Y_pos == parseInt(puzzles[i].style.top)) {
			if (X_pos == parseInt(puzzles[i].style.left)-400/size)
				movable.push(puzzles[i]);
			if (X_pos == parseInt(puzzles[i].style.left)+400/size)
				movable.push(puzzles[i]);
		}
	}
}

function puzzle_initiall() {
	var puzzles = $("puzzlearea").children;
	movable.splice(0);
	if (size*size > puzzles.length) {
		for (var i = puzzles.length+1; i < size*size; i++) {
			var div = document.createElement("div");
			$("puzzlearea").appendChild(div);
			$("puzzlearea").children[i-1].innerText = i.toString();
		}
	} else if (size*size < puzzles.length) {
		var i = size*size-1;
		while (i < puzzles.length)
			$("puzzlearea").removeChild($("puzzlearea").children[i]);
	}
	// puzzles.splice(0);
	puzzles = $("puzzlearea").children;
	for (var i = 0; i < puzzles.length; i++) {
		puzzles[i].className = "puzzlepiece";
		puzzles[i].style.height = puzzles[i].style.width = (400/size-4).toString()+'px';
		puzzle_fixed(puzzles[i], i%size*(400/size), parseInt(i/size)*(400/size));
		puzzles[i].style.backgroundPosition = (-i%size*(400/size)).toString()+'px ' + (-parseInt(i/size)*(400/size)).toString()+'px';
		if (i == size*size-2 || i == (size-1)*size-1) movable.push(puzzles[i]);
		blank.X_pos = blank.Y_pos = 400/size*(size-1);
	}
}

function reverse_button() {
	$("size").disabled = !$("size").disabled;
	$("bgi").disabled = !$("bgi").disabled;
	$("shufflebutton").disabled = !$("shufflebutton").disabled;
}

window.onload = function() {
	puzzle_initiall();
}

document.onmouseover = function(evt) {
	var evt = evt || window.event
    var target = evt.srcElement || evt.target;
	for (var i in movable) {
		if (target == movable[i]) movable[i].className += " movablepiece";
	}
}

document.onmouseout = function(evt) {
	var evt = evt || window.event
    var target = evt.srcElement || evt.target;
	if (target.className.indexOf(" movablepiece") >= 0) {
		target.className = target.className.substring(0, target.className.indexOf(" movablepiece"));
	}
}

document.onclick = function(evt) {
	var evt = evt || window.event
    var target = evt.srcElement || evt.target;
	if (target.className.indexOf(" movablepiece") >= 0) {
		target.className = target.className.substring(0, target.className.indexOf(" movablepiece"));
		puzzle_slide(target);
	} else if (target.id == "shufflebutton") {
		var random_puzzle = Math.floor(Math.random()*(movable.length)), times = 0;
		reverse_button();
		random_slide(movable[random_puzzle], times);
	}
}

document.onchange = function(evt) {
	var evt = evt || window.event
    var target = evt.srcElement || evt.target;
	var id = target.id;
	var value = target.options[target.selectedIndex].value;
	if (id == "size") {
		size = parseInt(value);
		puzzle_initiall();
		var bgi = $("bgi").options[$("bgi").selectedIndex].value;
		var puzzles = $("puzzlearea").children;
		for (var i = 0; i < puzzles.length; i++)
			puzzles[i].style.backgroundImage = "url(images/"+bgi+".jpg)";
	} else if (id == "bgi") {
		var puzzles = $("puzzlearea").children;
		for (var i = 0; i < puzzles.length; i++)
			puzzles[i].style.backgroundImage = "url(images/"+value+".jpg)";
	}
}

function random_slide(target, times) {
	if (times++ > size*size*2) {
		// reverse_button();
		Timecount();
		shuffled = true;
		return;
	}
	puzzle_slide(target);
	var random_puzzle = Math.floor(Math.random()*(movable.length-1));
	setTimeout(function() {
		while (target == movable[random_puzzle])
			random_puzzle = (random_puzzle+1)%movable.length;
		random_slide(movable[random_puzzle], times);
	}, 300);
}

function Timecount() {
	var startTime = new Date();
	display(startTime);
}

function display(startTime) {
	var nowTime = new Date();
	var ms = nowTime.getTime() - startTime.getTime();
	ms %= 1000;
	var s = nowTime.getSeconds() - startTime.getSeconds();
	var min = nowTime.getMinutes() - startTime.getMinutes();
	var usedTime = min+" : "+s+" : "+ms;
	if (shuffled && puzzle_finish()) {
		return;
	}
	// console.log(min+" : "+s+" : "+ms);
	$("display_time").innerHTML = usedTime;
	setTimeout(function() {
		display(startTime);
	}, 100);	
}


