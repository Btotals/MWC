window.onload = function() {
	counter = 0, delay = 200;
	$("Stop").disabled = true;
}
/*木有用jquery，只是嫌document.getElementById()太长自定义了一个美刀函数OTZ*/
window.onchange = function() {
	var e = e || window.event;
	var target = e.target || e.srcElement;
	if (target.nodeName.toLowerCase() == "input") {
		if (target.type == "radio") {
			var RadioList = target.parentNode.children;
			for (var i = 0; i < RadioList.length; i++)
				if (RadioList[i].nodeName.toLowerCase() == "input")
					RadioList[i].checked = "";
			target.checked = "checked";
			$("displayarea").className = target.value;
		}
	} else if (target.nodeName.toLowerCase() == "select") {
		var value = target.options[target.selectedIndex].value;
		var dis = $("displayarea");
		counter = 0;
		if (value != "Custom")
			dis.value = ANIMATIONS[value];
	}
}

window.onclick = function() {
	var e = e || window.event;
	var target = e.target || e.srcElement;
	if (target.type == "button") {
		if (target.value == "Start") {
			StateChange();
			flames = new Array(), StartIndex = 0;
			var selected = document.getElementsByTagName("select")[0];
			var value = selected.options[selected.selectedIndex].value;
			if (value == "Custom") {
				var dis = $("displayarea");
				var playing = dis.value;
			} else {
				var playing = ANIMATIONS[value];
			}
			while (playing.indexOf("=====\n", StartIndex) >= 0) {
				var EndIndex = playing.indexOf("=====\n", StartIndex);
				flames.push(playing.substring(StartIndex, EndIndex));
				StartIndex = EndIndex+6;
			}
			flames.push(playing.substring(StartIndex, playing.length-1));
			Douga = setInterval(function() {
				$("displayarea").value = flames[counter];
				if (counter < flames.length-1) {
					counter++;
				} else {
					counter = 0;
				} 
			}, delay);
		} else if (target.value == "Stop") {
			clearInterval(Douga);
			StateChange();
		}
	} else if (target.type == "checkbox") {
		delay = 250 - delay;
		clearInterval(Douga);
		Douga = setInterval(function() {
			$("displayarea").value = flames[counter];
			if (counter < flames.length-1) counter++;
			else counter = 0;
		}, delay);
	}
}

function StateChange() {
	$("Stop").disabled = !$("Stop").disabled;
	$("select").disabled = !$("select").disabled;
	$("Start").disabled = !$("Start").disabled;
}

function $(string) {
	return document.getElementById(string);
}
