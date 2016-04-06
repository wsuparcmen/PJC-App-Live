jQuery(document).ready(function() {
    var uri = 'http://pjcdbrebuild.gear.host/api/';
    var loginToken = window.localStorage.getItem("token");
    var totalTasks = 0;
    var taskNames = [];
    var taskDescriptions = [];
    var expectedDurations = [];
    var routineList = JSON.parse(localStorage.getItem('routineList'));
    var jobTitle = localStorage.getItem('jobName');
    var parentOrCoach = "";
    var now = [];
    var jobStartTime = formatCurrentDateTime();
    document.getElementById("routineName").innerHTML = jobTitle;
    $.each(routineList, function (key, item) {
        if (item.routineTitle === jobTitle) {
            console.log(item);
            totalTasks = item.Tasks.length;
            for (var i = 0; i < totalTasks; i++) {
                taskNames[i] = item.Tasks[i].taskName
                taskDescriptions[i] = item.Tasks[i].taskDescription;
                expectedDurations[i] = item.Tasks[i].expectedDuration;
                parentOrCoach = item.creatorUserName;
            }
        } 
    });
    var completedTasks = 0;
    for (var i = 0; i < totalTasks; i++) {
         $("<div data-role='collapsible' class='individualTask' id='task" + i + "'>" +
				"<h3 id='taskName'>" + taskNames[i] + "</h3>" +
				"<button href='#' data-ajax='false' class='ui-btn finishTask'>Finish Task</button>" +
                "<table style='width:100%'>" +
                    "<tr>" +
						"<td><b>Task Time</b></td>" +
						"<td id='taskTime" + i + "'>00:00:00</td>" +
					"</tr>" +
					"<tr>" +
						"<td><b>Estimated Time</b></td>" +
						"<td id='expectedDuration" + i + "'>" + expectedDurations[i] + "</td>" +
					"</tr>" +
				"</table>" + 
                "<br/>" +
				"<div class='ui-grid-a ui-responsive'>" +
					"<div class='ui-block-a'><b>Description</b></div>" +
					"<div class='ui-block-b' id='description'><p>" + taskDescriptions[i] + "</p></div>" +
					"<div class='ui-block-a'></div>" +
					"<div class='ui-block-a'><a href='#notesList' data-rel='popup' data-position-to='window' data-transition='pop' class='ui-btn'>Previous Notes</a></div>" +
					"<div class='ui-block-b'><a href='#makeNote' data-rel='popup' data-position-to='window' data-transition='pop' class='ui-btn'>Make Note</a></div>" +
				"</div>" +
			"</div>").appendTo($("#tasksList"));
            
            $('.finishTask').css('border-color', '#1d873b');
            
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

jQuery('.finishTask').on('click', function() {
    
    if(completedTasks < totalTasks){
		resetTaskTimer();
		keepAliveTwo(loginToken);
		var progressbar = $( "#progressbar" );
		var total = progressbar.progressbar("value");
		progressbar.progressbar("value", total + (100 / totalTasks));
        
        $(this).prop('disabled', true);
        $('#task' + completedTasks).collapsible({collapsed: true});
		completedTasks++;
        $('#task' + completedTasks).collapsible({collapsed: false});
        $('.finishTask').each(function(index) {
             if (completedTasks === index) {
                $(this).prop('disabled', false);
             }
        });
        document.getElementById("progress").innerHTML = "Overall Progress - " + completedTasks + "/" + totalTasks;
		
        if(expectedDurations[completedTasks] != null){
        	document.getElementById("expectedDuration" + completedTasks).innerHTML = expectedDurations[completedTasks];
        }
        else{
            if (completedTasks != totalTasks) {
                document.getElementById("expectedDuration" + completedTasks).innerHTML = "00:00:00";
            }
        }
        
		if(completedTasks == totalTasks){
			document.getElementById("progress").innerHTML += " - Completed";
            clearInterval(overallTimer);
		    clearInterval(partialTimer);
            $("<p>" +
                "<b><font size='6'>Congratulations!</font></b>" +
                "<p>You've finished the job! You did very well! Good job! Please click on the button below to go back to the home screen!</p>" +
                "<a href='#' data-ajax='false' class='ui-btn' id='completeJob'>Complete Job</a>" + 
            "</p>").insertAfter('#tasksList');
		}        
	}
    keepAliveTwo(loginToken); 
});

//post job data
jQuery('[data-role="main"]').on('click', 'a#completeJob', function() {
      /*var job = {
        'creatorUsername':parentOrCoach,
        'routineTitle':jobTitle,
        'startTime':jobStartTime,
        'stepEndTimes':[null],
        'jobNotes':[{'noteTitle':null,'noteMessage':null}],
        'stepNotes':[{'stepNo':null,'note':{'noteTitle':null,'noteMessage':null}}]};*/

      var job = {
        'creatorUsername':parentOrCoach,
        'routineTitle':jobTitle,
        'startTime':jobStartTime,
        'stepEndTimes':[null],
        'jobNotes':null,
        'stepNotes':null};
        
      for (var i = 0; i < totalTasks; i++) {
          job.stepEndTimes[i] = now[i];
      }

      //var note = {'noteTitle':null,'noteMessage':null};
      //var jobNote = note;
      //var stepNote = {'stepNo':null,'note':note};
      //for (...) {
          //job.jobNotes[i] = jobNote;
      //}
      //if (number of jobNotes == 0)
          //job.jobNotes = null;
      //for (...) {
          //job.stepNotes[i] = stepNote;
      //}
      //if (number of stepNotes == 0)
          //job.stepNotes = null;
      
      console.log(job);
        
        /*'stepEndTimes[0]':'2016-03-24 03:05:32',
        'stepEndTimes[1]':'2016-03-24 03:07:05',
        'stepEndTimes[2]':'2016-03-24 03:10:49',
        'jobNotes[0].noteTitle':'Job Note 1',
        'jobNotes[0].noteMessage':'This is the first Note',
        'jobNotes[1].noteTitle':'Job Note 2',
        'jobNotes[1].noteMessage':'This is the second Note',
        'stepNotes[0].stepNo':'1',
        'stepNotes[0].note.noteTitle':'Step 1 Note 1',
        'stepNotes[0].note.noteMessage':'This is the first note for step 1',
        'stepNotes[1].stepNo':'1',
        'stepNotes[1].note.noteTitle':'Step 1 Note 2',
        'stepNotes[1].note.noteMessage':'This is the second note for step 1',
        'stepNotes[2].stepNo':'2',
        'stepNotes[2].note.noteTitle':'Step 2 Note 1',
        'stepNotes[2].note.noteMessage':'This is the first note for step 2'};*/
      $.ajax({
        type: 'POST',
        dataType: 'json',
        data: job,
        url: uri + "Job?token=" + loginToken,
        success: function(data){
          alert("success posting job");
          window.location.href = "splash.html";
        },
        error: function(){
          alert("failure posting job");
        }
      });
});

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
function taskTimer(index){
	tSeconds++;
	if(tSeconds == 60){
		tMinutes++;
		tSeconds = 0;
	}
	if(tMinutes == 60){
		tHours++;
		tMinutes = 0;
	}
    document.getElementById("taskTime" + completedTasks).innerHTML = pad(tHours) + ":" + pad(tMinutes) + ":" + pad(tSeconds);
}
function resetTaskTimer(index){
    document.getElementById("taskTime" + completedTasks).innerHTML = pad(tHours) + ":" + pad(tMinutes) + ":" + pad(tSeconds);

    now[completedTasks] = formatCurrentDateTime();
    tSeconds = 0;
	tMinutes = 0;
	tHours = 0;
}

function formatCurrentDateTime(){
    var currDate = new Date();
    var h = addZero(currDate.getHours());
    var m = addZero(currDate.getMinutes());
    var s = addZero(currDate.getSeconds());
    var currdate = currDate.getFullYear() + '-' + addZero(currDate.getMonth() + 1) + '-' + addZero(currDate.getDate());
    return currdate + " " + h + ":" + m + ":" + s;
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
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