

// ****************************************
// *  Copied structure from loginPage.js  *
// ****************************************
var loginToken = window.localStorage.getItem("token");

jQuery(document).ready(function() {

    setTimeout(function () {
        keepAliveTwo(loginToken);
    }, 500);

    var job = localStorage.getItem("job");
    console.log(job);

    if(job != null){
        $("#jobTitle").innerHTML = job.routineTitle;
        $("#jobTimed").checked = job.isTimed;
        $("#jobExpected").innerHTML = job.expectedDuration;
        $("#jobEmail").checked = job.isNotifiable;
    }

    displayTasks();
});

function displayTasks()
{
    var list = document.querySelector('#listOfTasks');
    var taskList = JSON.parse(localStorage.getItem("currentTasks"));
    if(taskList != null)
    {
        $(list).empty();

        for(var i = 0; i < taskList.length; i++)
        {
            var task = taskList[i];

            if (task != null) {
				var expectedDuration = task.expectedDuration;
				
                $('<div data-role="collapsible">' +
                    '<h4>' + task.taskName + '</h4>' +
                    '<div data-role="listview" class="ui-grid-a ui-responsive">' +
                    '<div>Description: ' + task.taskDescription + '</div>' +
                    '<div>Category: ' + task.TaskCategory.categoryName + '</div>' +
                    '<div>Timed: ' + task.isTimed + '</div>' +
                    '<div>Duration: ' + expectedDuration + '</div>' +
                    '<div class="ui-block-solo">' +
                    '<a onclick="removeTask(' + i + ')" data-ajax="false" class="ui-btn ui-icon-delete ui-btn-icon-left">' +
                    'Delete Task' +
                    '</a></div>' +
                    '</div>' +
                    '</div>').appendTo(list);

                $(list).collapsibleset('refresh');
            }
        }
    }
    else
    {
        console.log("tasks are empty");
    }
    var job = JSON.parse(localStorage.getItem("job"));
    if(job != null){
        document.getElementById("jobTitle").value = job.routineTitle;
        document.getElementById("jobTimed").checked = job.isTimed;
        document.getElementById("jobExpected").value = job.expectedDuration;
        document.getElementById("jobEmail").checked = job.isNotifiable;
    }
}

function removeTask(index)
{
    var taskList = JSON.parse(localStorage.getItem("currentTasks"));

    taskList.splice(index,1);//removes the task from the tasks array
    localStorage.setItem("currentTasks", JSON.stringify(taskList));

    displayTasks();
}

function resetTasks()
{
    localStorage.removeItem("currentTasks");
}

function addTask()
{
        var jobTitle = $('#jobTitle').val();
        var jobTimed = document.getElementById('jobTimed').checked;
        var jobExpected = $('#jobExpected').val();
		
        var jobEmail = document.getElementById('jobEmail').checked;

        var job = {
            'creatorUserName': null, //to be added on backend
            'assigneeUserName': localStorage.getItem("user"),
            'routineTitle': jobTitle,
            'isTimed': jobTimed,
            'expectedDuration': jobExpected,
            'isNotifiable': jobEmail,
            'Tasks': [],
            'Feedbacks': []
        };

        localStorage.setItem("job", JSON.stringify(job));
        window.location.href = "addtask.html";
}

function addJob()
{
    var uri = 'http://pjcdbrebuild2.gear.host/api/';
    var jobTitle=$('#jobTitle').val();
    var jobTimed=document.getElementById('jobTimed').checked;
    var jobExpected=$('#jobExpected').val();
    var jobEmail=document.getElementById('jobEmail').checked;
    var arrOfTasks = JSON.parse(window.localStorage.getItem("currentTasks"));
    //console.log(arrOfTasks);
    var job;

    if(window.localStorage.getItem("job") == null){
        job = {
            'creatorUserName': null, //to be added on backend
            'assigneeUserName': localStorage.getItem("user"),
            'routineTitle': jobTitle,
            'isTimed': jobTimed,
            'expectedDuration': jobExpected,
            'isNotifiable': jobEmail,
            'Tasks': arrOfTasks,
            'Feedbacks' : []};
    }
    else {
        job = JSON.parse(window.localStorage.getItem("job"));
        job.Tasks = arrOfTasks;
    }

    var data = {token: loginToken, create: "c", model: JSON.stringify(job)};
    //console.log(job);
    $.ajax({
        type: 'POST',
        dataType: 'application/json',
        data: data,
        url: uri + "Routine",
        success: function (data) {
            //console.log(data);
            localStorage.removeItem("job");
            localStorage.removeItem("currentTasks");
            localStorage.removeItem("sequence");
        },
        error: function (data) {
            console.log(data);
            if(data.status = 201){
                console.log("JOB ADDED");
                resetTasks();
                location.href = "userlist.html";
            }
            else {
                console.log("JOB WAS NOT ADDED");
            }
        }
    });
}
