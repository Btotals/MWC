/*Extra Features: Control Enabling is OK,
	but there are some problems on Turbo Speed. */


var add=0;
delay = 200;
function startfunction() {
	document.getElementById("animation").disabled=true;
	if (document.getElementById("speed").checked){
		delay = 250-delay;
		clearInterval(idd);
		idd=setInterval(playfunction,delay);
	} else {
		delay = 250-delay;
		clearInterval(idd);
		idd=setInterval(playfunction,delay);
	}
}

var start=0;
function playfunction() {
	var ani=document.getElementById('animation').value;
	var parts= ANIMATIONS[ani].split("=====\n");
	if (start < parts.length) {
		document.getElementById('displayarea').value = parts[start];
		start = start+1;
	} else {
		start = 0;
	}
}

function stopfunction() {
	clearInterval(idd);
	clearInterval(add);
	start=0;
	idd=0;
	document.getElementById("animation").disabled=false;
	already=0;

	var ani=document.getElementById('animation').value;
	document.getElementById('displayarea').value = ANIMATIONS[ani];
}

function fontfunction() {
	var a= document.getElementsByName("size");
	for(var i=0;i<a.length;i++) {
		if(a[i].checked) {
			var b=a[i].value;
			if (b == "Small") {
				document.getElementById('displayarea').style.fontSize="7pt";
			}else if (b == "Medium") {
				document.getElementById('displayarea').style.fontSize="12pt";
			}else if (b == "Large") {
				document.getElementById('displayarea').style.fontSize="24pt";
			}
		}
	}
}

function sfunction() {
	if (document.getElementById("speed").checked && already==1){
		add=setInterval(playfunction,50);
	}
}
var bus ="  ----------------------\n" + 
" | |_!_||_!_||_!_||_!_| |\n" + 
" | |___||___||___||___| |\n" + 
" |______________________|o\n" + 
"   (o) (o)^(o)--(o)^(o)  \n" + 
"=====\n" + 
"     ----------------------\n" + 
"    | |_!_||_!_||_!_||_!_| |\n" + 
"    | |___||___||___||___| |\n" + 
"    |______________________|o\n" + 
"      (o) (o)^(o)--(o)^(o)\n" + 
"=====\n" + 
"           ----------------------\n" + 
"          | |_!_||_!_||_!_||_!_| |\n" + 
"          | |___||___||___||___| |\n" + 
"          |______________________|o\n" + 
"            (o) (o)^(o)--(o)^(o)\n" + 
"=====\n" + 
"                 ----------------------\n" + 
"                | |_!_||_!_||_!_||_!_| |\n" + 
"                | |___||___||___||___| |\n" + 
"                |______________________|o\n" + 
"                   (o) (o)^(o)--(o)^(o)\n" + 
"=====\n" + 
"                    ----------------------\n" + 
"                   | |_!_||_!_||_!_||_!_| |\n" + 
"                   | |___||___||___||___| |\n" + 
"                   |______________________|o\n" + 
"                      (o) (o)^(o)--(o)^(o)\n" + 
"=====\n" + 
"                          ---------------------\n" + 
"                         | |_!_||_!_||_!_||_!_| |\n" + 
"                         | |___||___||___||___| |\n" + 
"                         |______________________|o\n" + 
"                            (o) (o)^(o)--(o)^(o)\n" + 
"=====\n" + 
"                            ----------------------\n" + 
"                            | |_!_||_!_||_!_||_!_| |\n" + 
"                            | |___||___||___||___| |\n" + 
"                            |______________________|o\n" + 
"                              (o) (o)^(o)--(o)^(o)\n" + 
"=====\n" + 
"                                ----------------------\n" + 
"                               | |_!_||_!_||_!_||_!_| |\n" + 
"                               | |___||___||___||___| |\n" + 
"                               |______________________|o\n" + 
"                                  (o) (o)^(o)--(o)^(o)\n" + 
"=====\n" + 
"                                  ---------------------\n" + 
"                                 | |_!_||_!_||_!_||_!_| |\n" + 
"                                 | |___||___||___||___| |\n" + 
"                                 |______________________|o\n" + 
"                                   (o) (o)^(o)--(o)^(o)\n";

ANIMATIONS["Bus"] = bus;