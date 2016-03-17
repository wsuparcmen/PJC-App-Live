jQuery(document).ready(function() {
    var uri = 'http://pjcdbrebuild.gear.host/api/';
    var loginToken = window.localStorage.getItem("token");
   resetTaskTimer();
    var amountOfTasks = 0;
    var taskNames = [];
    var taskDescriptions = [];
    var expectedDurations = [];
    var routineList = JSON.parse(localStorage.getItem('routineList'));
    var jobTitle = localStorage.getItem('jobName');
    document.getElementById("routineName").innerHTML = jobTitle;
    $.each(routineList, function (key, item) {
        if (item.routineTitle === jobTitle) {
            console.log(item);
            amountOfTasks = item.Tasks.length;
            for (var i = 0; i < amountOfTasks; i++) {
                taskNames[i] = item.Tasks[i].taskName
                taskDescriptions[i] = item.Tasks[i].taskDescription;
                expectedDurations[i] = item.Tasks[i].expectedDuration;
            }
        } 
    });
    var completedTasks = 0;
    var totalTasks = amountOfTasks;
    document.getElementById("progress").innerHTML = "Overall Progress - " + completedTasks + "/" + totalTasks;
    document.getElementById("taskName").innerHTML = taskNames[0];
   	document.getElementById("description").innerHTML = taskDescriptions[0];
    document.getElementById("expectedDuration").innerHTML = expectedDurations[0];


$(function(){
	$( "#progressbar" ).progressbar({
		value: 0
	});
});

//function finishTask(){
jQuery('#finishTask').on('click', function() {
    if(completedTasks < totalTasks){
		resetTaskTimer();
		 keepAlive(loginToken);
		var progressbar = $( "#progressbar" );
		var total = progressbar.progressbar("value");
		progressbar.progressbar("value", total + (100 / amountOfTasks));
		
		completedTasks++;
		document.getElementById("progress").innerHTML = "Overall Progress - " + completedTasks + "/" + totalTasks;
		
		document.getElementById("taskName").innerHTML = taskNames[completedTasks];
        document.getElementById("description").innerHTML = taskDescriptions[completedTasks];
        if(expectedDurations[completedTasks] != null){
        	document.getElementById("expectedDuration").innerHTML = expectedDurations[completedTasks];
        }
        else{
        	document.getElementById("expectedDuration").innerHTML = "";
        }

      
	}
	if(completedTasks == totalTasks){
		clearInterval(overallTimer);
		clearInterval(partialTimer);
		
		document.getElementById("taskName").innerHTML = "Routine Completed!";
        document.getElementById("description").innerHTML = "Routine Completed!";
        document.getElementById("expectedDuration").innerHTML = "Routine Completed!";
	}
    keepAliveTwo(loginToken); 
});
//}

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

setTimeout(function() {
    keepAliveTwo(loginToken);    
}, 500);
});