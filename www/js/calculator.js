function calculateWage() {
	var h = parseFloat(document.getElementById("hours").value);
	var w = parseFloat(document.getElementById("wage").value).toFixed(2);
	
	var result = (h * w).toFixed(2);
	
	document.getElementById("result").innerHTML = "<h2>Results</h2>" +
													"You worked <b>" + h + "</b> hours at a pay rate of <b>$" + w + "</b> an hour. <br/>" +
													"You earned a total of <b>$" + result + "</b>!";
}