

// ************************************
// *  Copied structure from notes.js  *
// ************************************

jQuery(document).ready(function () {
 displayFeedback(); 
});

 function displayFeedback(){
	
	var addToDiv = document.getElementById('feedBacks');
	var arrOfFeedBack = JSON.parse(localStorage.getItem('arrOfFeedBack')); 
	for(var i = 0; i < arrOfFeedBack.length; i++)
	{
		var FeedBack = arrOfFeedBack[i];
		
		if(FeedBack != null)
		{
			//console.log(FeedBack);
			var toAdd = document.createElement('div'); 
		    toAdd.innerHTML = 'Feedback Name: '+ FeedBack.feedbackTitle + '</br>';
			addToDiv.append(toAdd); 
		}
 	}
}
function addFeedback(){
	//localStorage.removeItem('arrOfFeedBack'); 
	if(localStorage.getItem('arrOfFeedBack') == null)
	{
		arrOfFeedBack = [];
		localStorage.setItem('arrOfFeedBack', JSON.stringify(arrOfFeedBack)); 
	}

	var currentTask = document.getElementById("taskName").value; 
	//console.log(currentTask);
	localStorage.setItem("feedbackParams",JSON.stringify(currentTask)); 
	window.location.href = 'addFeedback.html';
}


function Submit(){
    var arrOfTask;
    var sequenceNum = localStorage.getItem("sequence");
    if(localStorage.getItem('currentTasks') == null)
    {
        arrOfTask = [];
        sequenceNum = 1;
    }
    else
    {
        arrOfTask = JSON.parse(localStorage.getItem('currentTasks'));
    }
    if( !(document.getElementById("taskName").value == null &&
        document.getElementById("taskDesc").value == null &&
        document.getElementById("taskCat").value == null &&
        //document.getElementById("taskTimed").value == null && #will never be null
        document.getElementById("taskExpected").value == null))
    {
		var jobExpected= document.getElementById("taskExpected").value;

        var task = {"sequenceNo": sequenceNum,
            "taskName": document.getElementById("taskName").value,
            "taskDescription": document.getElementById("taskDesc").value,
            "TaskCategory": {"categoryName":document.getElementById("taskCat").value},
            "isTimed": document.getElementById("taskTimed").checked,
            "expectedDuration": jobExpected,
			"arrOfFeedBack" : localStorage.getItem('arrOfFeedBack') 
        };
        sequenceNum++;
        localStorage.setItem("sequence", sequenceNum);

        arrOfTask.push(task);

        var currentRoutine = JSON.parse(window.localStorage.getItem('currentRoutine'));
        if (currentRoutine != null)
        {
            currentRoutine.Tasks = arrOfTask;
            localStorage.setItem('currentRoutine',JSON.stringify(currentRoutine));
        }

        localStorage.setItem('currentTasks',JSON.stringify(arrOfTask));
		localStorage.removeItem('arrOfFeedBack'); 
        window.history.back();
    }
    else
    {
        console.log("Cannot have empty list");
    }
}