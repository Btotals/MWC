document.onclick = function() {
	var e = e || window.event;
	var target = e.target || e.srcElement;
	if (target.id.toLowerCase() == "button") {
		if ($("textarea").hasClass("big")) {
			$("textarea").removeClass("big");
			// $("body").removeClass("bg");
		}
		else
			$("textarea").addClass("big");
			// $("body").addClass("bg");
	} else if (target.id.toLowerCase() == "bling") {
		if ($("textarea").hasClass("bling"))
			$("textarea").removeClass("bling");
		else
			$("textarea").addClass("bling");
	} else if (target.value == "Snoopify") {
		var text = $("textarea").val().toUpperCase();
		var parts = text.split('.');
		text = parts.join('-izzle.');
		$("textarea").val(text);
	}
}
