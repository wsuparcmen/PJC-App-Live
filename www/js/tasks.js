jQuery(document).ready(function() {
    document.addEventListener("deviceready", onDeviceReady, false);
    $('#fVerification').hide();
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
    var jobNotesArray;
    var taskNotesArray;
    var completedTasks = 0;
    var reminderArray = [];
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

                if(item.Tasks[i].Feedbacks[0] != undefined) {
                    reminderArray[i] = (item.Tasks[i].Feedbacks[0].feedbackMessage) || "";
                }else if(item.Tasks[i].Feedbacks[0] == undefined)
                {
                    reminderArray[i] = "No Reminders";
                }
            }
        } 
    });

  

    for (var i = 0; i < totalTasks; i++) {
         $("<div data-role='collapsible' class='individualTask' stepnumber='" + (i+1) + "' id='task" + i + "'>" +
				"<h3 id='taskName'>" + taskNames[i] + "</h3>" +
				"<a href='#verification' data-rel='popup' data-position-to='window' data-transition='pop' class='ui-btn finishTask'>Finish Task</a>" +
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
                "</div>" +
			    "<a href='#makeNote' data-rel='popup' data-position-to='window' data-transition='pop' class='ui-btn make-note'>Make Note</a>" +
			"</div>").appendTo($("#tasksList"));
            
            $('.finishTask').css('border-color', '#1d873b');
			$('.finishTask').css('background-color', '#1de27c');
            $('.finishTask').css('border-width', '3px');
            
            if (i == 0) {
                $('.individualTask').attr('data-collapsed', 'false');
            } else {
                
            }
            $('#tasksList').collapsibleset('refresh');
    }
    document.getElementById("progress").innerHTML = "Overall Progress - " + completedTasks + "/" + totalTasks;

    $(".finishTask:not(:first)").prop("disabled", true);
    $("h3:not(:first)").addClass("avoid-clicks");

$(function(){
	$( "#progressbar" ).progressbar({
		value: 0
	});
});

//This function handles
jQuery('#final-yes').on('click', function() {

    // here we are hiding and showing checkoff steps again

    $('#fVerification').hide();
    $('#reminderCheck').show();

    if(completedTasks < totalTasks){
		resetTaskTimer();
		keepAliveTwo(loginToken);
		var progressbar = $( "#progressbar" );
		var total = progressbar.progressbar("value");
		progressbar.progressbar("value", total + (100 / totalTasks));
        $(this).prop('disabled', true);
        $('#task' + completedTasks).collapsible({collapsed: true}).addClass("avoid-clicks");
       // $(this).parents(':eq(0)').siblings("h3").addClass("avoid-clicks");
       // $('#task'+ completedTasks).addClass("avoid-clicks");
		completedTasks++;
        $('#task' + completedTasks).collapsible({collapsed: false});
        $('.finishTask').each(function(index) {
             if (completedTasks === index) {

                 $(this).parents(':eq(0)').siblings().removeClass("avoid-clicks");
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
    $( "#verification" ).popup("close");
});


    $(".finishTask").on('click',function(){
        console.log(completedTasks);
        $("#reminder").text(reminderArray[completedTasks]);
    });





    // When a user clicks "No" on a reminder popup it i will disable the final verification pop up from showing up.
    $("#reminder-no").on('click',function(){
        $( "#finalVerification" ).popup( "option", "disabled", true );
    });

    // Whe a user clicks "yes" on a reminder popup it will enable the final popup.
    $("#reminder-yes").on('click',function(){
        //$( "#finalVerification" ).popup( "option", "disabled", false );
        //$("#verification").popup("close");
        $('#reminderCheck').hide();
    $('#fVerification').show();


    });

    $("#final-no").on('click',function(){
        $('#reminderCheck').show();
        $('#fVerification').hide();


    });

    // This causes the final verification popup to show af
    /*$( "#verification" ).on({
        popupafterclose: function() {
            setTimeout(function() { $( "#finalVerification" ).popup( "open" ) }, 100 );
        }
    });*/

jQuery('.make-note').on('click', function() {
    var self = jQuery(this);
    document.getElementById("stepNumber").value = self.closest('.ui-collapsible').attr('stepnumber');
});

//post job data
jQuery('[data-role="main"]').on('click', 'a#completeJob', function() {

      var job = {
        'creatorUsername':parentOrCoach,
        'routineTitle':jobTitle,
        'startTime':jobStartTime,
        'stepEndTimes':[],
        'jobNotes':[],
        'stepNotes':[]};
        
      for (var i = 0; i < totalTasks; i++) {
          job.stepEndTimes.push(now[i]);
      }
      
      jobNotesArray = JSON.parse(localStorage.getItem('jobNotesArray'+jobTitle));
      taskNotesArray = JSON.parse(localStorage.getItem('taskNotesArray'));
      
      $.each(jobNotesArray, function (key, item) {
          job.jobNotes.push({"noteTitle":item.name, "noteMessage":item.note});
      });
      
      $.each(taskNotesArray, function (key, item) {
          var stepNumber = item.stepNumber;
          job.stepNotes.push({"stepNo":stepNumber, "note":{"noteTitle":item.name, "noteMessage":item.note}});
      });
        
      $.ajax({
        type: 'POST',
        dataType: 'json',
        data: job,
        url: uri + "Job?token=" + loginToken,
        success: function(data){
          window.location.href = "splash.html";
        },
        error: function(){
          alert("failure posting job");
          console.log("Failure posting job");
          window.location.href = "splash.html";
        }
      });
      window.localStorage.removeItem("jobNotesArray"+jobTitle);
      window.localStorage.removeItem("taskNotesArray");
      job = {};
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

    localStorage.setItem("overallTime", pad(hours) + ":" + pad(minutes) + ":" + pad(seconds));

    expectedDurationExceeded2()
}

    $('#timeReminder a').on('click', function() {
        $('#timeReminder').popup("close");

    });
    //This function checks for if the time the task takes exceeds the expected duration.
function expectedDurationExceeded2(){

    if(pad(tHours) + ":" + pad(tMinutes) + ":" + pad(tSeconds)== expectedDurations[completedTasks]) {
        // This is for future vibrate functionality.
       // alert("Time exceeded");
        navigator.vibrate(1000);


            $('#timeReminder').popup("open");




    }

    }

    function onDeviceReady() {
        console.log(navigator.vibrate);
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

    localStorage.setItem("taskTime", pad(tHours) + ":" + pad(tMinutes) + ":" + pad(tSeconds));

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