jQuery(document).ready(function() {
    var uri = 'http://pjcdbrebuild.gear.host/api/';
    var loginToken = window.localStorage.getItem("token");
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
    for (var i = 0; i < amountOfTasks; i++) {
         $("<div data-role='collapsible' class='individualTask'>" +
				"<h3 id='taskName'>" + taskNames[i] + "</h3>" +
				"<button href='#' data-ajax='false' class='ui-btn finishTask'>Finish Task</button>" +
                "<table style='width:100%'>" +
                    "<tr>" +
						"<td><b>Task Time</b></td>" +
						"<td id='taskTime'>00:00:00</td>" +
					"</tr>" +
					"<tr>" +
						"<td><b>Estimated Time</b></td>" +
						"<td id='expectedDuration'>" + expectedDurations[i] + "</td>" +
					"</tr>" +
				"</table>" + 
                "<br/>" +
				"<div class='ui-grid-a ui-responsive'>" +
					"<div class='ui-block-a'><b>Description</b></div>" +
					"<div class='ui-block-b' id='description'><p>" + taskDescriptions[i] + "</p></div>" +
					"<div class='ui-block-a'></div>" +
					"<div class='ui-block-a'><a href='#previousNotes' data-rel='popup' data-position-to='window' data-transition='pop' class='ui-btn'>Previous Notes</a></div>" +
					"<div class='ui-block-b'><a href='#makeNote' data-rel='popup' data-position-to='window' data-transition='pop' class='ui-btn'>Make Note</a></div>" +
				"</div>" +
			"</div>").appendTo($("#tasksList"));
            
            $('.finishTask').css('border-color', 'orange');
            
            if (i == 0) {
                $('.individualTask').attr('data-collapsed', 'false');
            } else {
                
            }
            $('#tasksList').collapsibleset('refresh');
    }
    document.getElementById("progress").innerHTML = "Overall Progress - " + completedTasks + "/" + totalTasks;
    $(".finishTask:not(:first)").prop("disabled", true);
    
    //resetTaskTimer();

$(function(){
	$( "#progressbar" ).progressbar({
		value: 0
	});
});

//function finishTask(){
jQuery('.finishTask').on('click', function() {
    //$(this).prop('disabled', true);
    //$(this).closest('.individualTask').click();
    //$("#tasksList").children().trigger("collapse");
    $(this).closest('.individualTask').accordion({active: false}).click();
    //$(this).closest('.individualTask').trigger("collapse");
    //$('#tasksList').collapsibleset('refresh');
    
    if(completedTasks < totalTasks){
		resetTaskTimer();
		keepAliveTwo(loginToken);
		var progressbar = $( "#progressbar" );
		var total = progressbar.progressbar("value");
		progressbar.progressbar("value", total + (100 / amountOfTasks));
		completedTasks++;
		document.getElementById("progress").innerHTML = "Overall Progress - " + completedTasks + "/" + totalTasks;
		
        /*if(expectedDurations[completedTasks] != null){
        	document.getElementById("expectedDuration").innerHTML = expectedDurations[completedTasks];
        }
        else{
        	document.getElementById("expectedDuration").innerHTML = "";
        }*/
        
		if(completedTasks == totalTasks){
			//document.getElementById("finishTask").style.background='orange';
			document.getElementById("progress").innerHTML += " - Completed";
            clearInterval(overallTimer);
		    clearInterval(partialTimer);
		}
        //this is where the ajax call will go to send the completed job off
        
        //------------------
      
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
    //document.getElementById("taskTime").innerHTML = pad(tHours) + ":" + pad(tMinutes) + ":" + pad(tSeconds);
}
function resetTaskTimer(){
	tSeconds = 0;
	tMinutes = 0;
	tHours = 0;
    //document.getElementById("taskTime").innerHTML = pad(tHours) + ":" + pad(tMinutes) + ":" + pad(tSeconds);
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