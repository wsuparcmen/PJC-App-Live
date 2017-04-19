jQuery(document).ready(function () {
    var loginToken = window.localStorage.getItem('token');
    setTimeout(function () {
        keepAliveTwo(loginToken);
    }, 500);
    console.log("loading tasks");
   fillBoxes();
});


function fillBoxes()
{
    var currentTask = JSON.parse(window.localStorage.getItem('currentEditJob'));

    //console.log(currentTask);

    // Fix populating the task category. You can see that the value is correctly changing
    // because it is selected in the dropdown. Just need to get the UI to load it.
    document.getElementById("taskName").value = currentTask.taskName;
    document.getElementById("taskDesc").value = currentTask.taskDescription;
    document.getElementById("taskCat").value = currentTask.TaskCategory.categoryName;
    document.getElementById("taskTimed").checked = currentTask.isTimed;
    document.getElementById("expectDuration").value = currentTask.expectedDuration;

    var list = document.getElementById("listOfFeedbacks");
    var feedList = currentTask.Feedbacks;
    for(var i = 0; i < feedList.length; i++){
        $(  '<div data-role="collapsible">' +
            '<h4>' + feedList[i].feedbackTitle + '</h4>' +
            '<div data-role="listview" class="ui-grid-a ui-responsive">' +
            '<div>Message: ' + feedList[i].feedbackMessage + '</div>' +
            '<div class="ui-block-solo">' +
            '<a onclick="editFeedback('+i+')" data-ajax="false" class="ui-btn ui-icon-edit ui-btn-icon-left">' +
            'Edit Reminder' +
            '</a></div>' +
            '</div>' +
            '</div>').appendTo(list);

        $(list).collapsibleset('refresh');
    }
}

function deleteTask() {
    var routine = JSON.parse(localStorage.getItem("currentRoutine"));
    var arrOfTasks = routine.Tasks;
    arrOfTasks.splice(localStorage.getItem("taskNum"),1);//removes the task from the tasks array
    localStorage.setItem("currentRoutine", JSON.stringify(routine));//sets the edited routine back
    location.href = "editJob.html";
}

function editTask() {
    var currentTask = JSON.parse(window.localStorage.getItem('currentEditJob'));
    currentTask.taskName = document.getElementById("taskName").value;
    currentTask.taskDescription = document.getElementById("taskDesc").value;
    currentTask.TaskCategory.categoryName = document.getElementById("taskCat").value;
    currentTask.isTimed = document.getElementById("taskTimed").checked;
    currentTask.expectedDuration = document.getElementById("expectDuration").value;

    var routine = JSON.parse(localStorage.getItem("currentRoutine"));//get routine we are working on
    routine.Tasks[localStorage.getItem("taskNum")] = currentTask;//replace task
    localStorage.setItem("currentRoutine", JSON.stringify(routine));//set routine back
    //console.log(routine);
    location.href = "editJob.html"
}

function editFeedback(feedbackToEdit) {
    //console.log(feedbackToEdit);
    var currentTask = JSON.parse(window.localStorage.getItem('currentEditJob'));
    //console.log(currentTask.Feedbacks);
    var currentFeedback = currentTask.Feedbacks[feedbackToEdit];
    //console.log(currentFeedback);

    localStorage.setItem("currentFeedback", JSON.stringify(currentFeedback));
    localStorage.setItem("feedNum", feedbackToEdit);
    location.href = "editFeedback.html"
}