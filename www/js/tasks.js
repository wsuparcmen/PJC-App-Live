jQuery(document).ready(function() {
    var uri = 'http://pjcdbrebuild.gear.host/api/';
    var loginToken = window.localStorage.getItem("token");
    
var amountOfTasks = 0;
var routineList = JSON.parse(localStorage.getItem('routineList'));
var jobTitle = localStorage.getItem('jobName');
$.each(routineList, function (key, item) {
    if (item.routineTitle === jobTitle) {
        amountOfTasks = item.Tasks.length;
    } 
});
alert(amountOfTasks);    
    
});

logout = function() {
    window.localStorage.removeItem("token");
    window.location.href = "Login.html";
}

$(function(){
	$( "#progressbar" ).progressbar({
		value: 0
	});
});

var completedTasks = 0;
var totalTasks = 10;
function finishTask(){
	if(completedTasks < totalTasks){
		resetTaskTimer();
	
		var progressbar = $( "#progressbar" );
		var total = progressbar.progressbar("value");
		progressbar.progressbar("value", total + 10);
		
		completedTasks++;
		document.getElementById("progress").innerHTML = "Overall Progress - " + completedTasks + "/" + totalTasks;
		
		document.getElementById("taskName").innerHTML = "Task Name #" + (completedTasks + 1);
	}
	if(completedTasks == totalTasks){
		clearInterval(overallTimer);
		clearInterval(partialTimer);
		
		document.getElementById("taskName").innerHTML = "Routine Completed!";
	}
}

var overallTimer = setInterval(jobTimer, 1000);
var seconds = 0;
var minutes = 0;
var hours = 0;
function jobTimer(){
	seconds++;
	if(seconds == 60){
		minutes++;
		seconds = 0;
	}
	if(minutes == 60){
		hours++;
		minutes = 0;
	}
    document.getElementById("overallTime").innerHTML = "<b>Overall Time - </b>" + pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
}

var partialTimer = setInterval(taskTimer, 1000);
var tSeconds = 0;
var tMinutes = 0;
var tHours = 0;
function taskTimer(){
	tSeconds++;
	if(tSeconds == 60){
		tMinutes++;
		tSeconds = 0;
	}
	if(tMinutes == 60){
		tHours++;
		tMinutes = 0;
	}
    document.getElementById("taskTime").innerHTML = pad(tHours) + ":" + pad(tMinutes) + ":" + pad(tSeconds);
}
function resetTaskTimer(){
	tSeconds = 0;
	tMinutes = 0;
	tHours = 0;
    document.getElementById("taskTime").innerHTML = pad(tHours) + ":" + pad(tMinutes) + ":" + pad(tSeconds);
}

function pad(number){
	if(number < 10){
		return "0" + number;
	}
	return number;
}