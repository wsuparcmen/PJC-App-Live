jQuery(document).ready(function() {
    var loginToken = window.localStorage.getItem('token');
    setTimeout(function () {
        keepAliveTwo(loginToken);
    }, 500);

    loadJob();
});


function deleteJob(){
    var job = JSON.parse(localStorage.getItem('currentRoutine'));
    var token = localStorage.getItem('token');
    //console.log(job);
    var uri = 'http://pjclive.gear.host/api/';
    if(job == null) return;
    jQuery.ajax({
        type: 'POST',
        dataType: 'application/json',
        data: {token: token, create: "d", model: JSON.stringify(job)},
        url: uri + "Routine",
        success: function (data) {
            //window.localStorage.setItem("job", data);
        },
        error: function (data) {
            //console.log(data);
            if(data.status == 200){
                console.log("JOB DELETED");
                location.href = "userlist.html";
            }else {
                console.log("JOB WAS NOT DELETED");
            }
        }
    });
}


function loadJob()
{
    var currentRoutine = JSON.parse(window.localStorage.getItem('currentRoutine'));

    if(currentRoutine != null){
        //console.log(currentRoutine.Tasks);
		
        document.getElementById("jobTitle").value = currentRoutine.routineTitle;
        document.getElementById("jobTimed").checked = currentRoutine.isTimed;
        document.getElementById("jobExpected").value = currentRoutine.expectedDuration;
        document.getElementById("jobEmail").checked = currentRoutine.isNotifiable;

        var list = document.getElementById("listOfTasks");
        var taskList = currentRoutine.Tasks;
        for(var i = 0; i < taskList.length; i++){
            $(  '<div data-role="collapsible">' +
                '<h4>' + taskList[i].taskName + '</h4>' +
                '<div data-role="listview" class="ui-grid-a ui-responsive">' +
                '<div>Description: ' + taskList[i].taskDescription + '</div>' +
                '<div>Category: ' + taskList[i].TaskCategory.categoryName + '</div>' +
                '<div>Timed: ' + taskList[i].isTimed + '</div>' +
                '<div>Duration: ' + taskList[i].expectedDuration + '</div>' +
                '<div class="ui-block-solo">' +
                '<a onclick="editTask('+i+')" data-ajax="false" class="ui-btn ui-icon-edit ui-btn-icon-left">' +
                'Edit Task' +
                '</a></div>' +
                '</div>' +
                '</div>').appendTo(list);

            $(list).collapsibleset('refresh');
        }
    }
    else {
        console.log("JOB NOT FOUND");
    }
}


function addTask()
{
    var currentRoutine = JSON.parse(window.localStorage.getItem('currentRoutine'));
    var arrOfTask = currentRoutine.Tasks;
    var sequenceNum = arrOfTask.length + 1;

    localStorage.setItem("sequence", sequenceNum);
    localStorage.setItem('currentTasks',JSON.stringify(arrOfTask));
    window.location.href = "addtask.html";
}


//need to grab data when clicked on jobList to know which job.
//ajax for localStorage
function editJob() {
    var currentRoutine = JSON.parse(window.localStorage.getItem('currentRoutine'));
    var uri = 'http://pjclive.gear.host/api/';
    console.log(currentRoutine);

    var jobTitle = document.getElementById("jobTitle").value;
    var jobTimed = document.getElementById("jobTimed").checked;
    var jobExpected = document.getElementById("jobExpected").value;
    var jobEmail = document.getElementById("jobEmail").checked;

    var loginToken = window.localStorage.getItem('token');
    var assignedUser = window.localStorage.getItem('user');

    var editedRoutine = {
        'creatorUserName': null, //to be added on backend
        'assigneeUserName': localStorage.getItem("user"),
        'routineTitle': jobTitle,
        'isTimed': jobTimed,
        'expectedDuration': jobExpected,
        'isNotifiable': jobEmail,
        'Tasks': currentRoutine.Tasks,
        'Feedbacks': []
    };

    var data = {token: loginToken, create: "m", model: JSON.stringify(editedRoutine)};   //use 'm' to modify and 'd' to delete
    //console.log(job);
    $.ajax({
        type: 'POST',
        dataType: 'application/json',
        data: data,
        url: uri + "Routine",
        success: function (data) {
            //console.log(data);
            console.log("job updated");

            localStorage.removeItem("job");
            localStorage.removeItem("currentSequence");
            window.location.href = "joblist.html";
        },
        error: function (data) {
            console.log(data);
            if(data.status == 201){
                console.log("JOB ADDED");
                localStorage.removeItem("currentRoutine");
                location.href = "userlist.html";
            }else {
                console.log("JOB WAS NOT ADDED");
            }
        }
    });
}

function editTask(taskToEdit) //called by clicking on task
{
    var currentRoutine = JSON.parse(window.localStorage.getItem('currentRoutine'));

    //var jobList = JSON.parse(localStorage.getItem('jobList'));

    //console.log(currentRoutine.Tasks[taskToEdit].taskName);
    localStorage.setItem("currentEditJob", JSON.stringify(currentRoutine.Tasks[taskToEdit]));
    localStorage.setItem("taskNum", taskToEdit);
    document.location.href = "editTask.html";
}
