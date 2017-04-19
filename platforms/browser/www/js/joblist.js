jQuery(document).ready(function() {
    var loginToken = window.localStorage.getItem("token");

    setTimeout(function() {
        keepAliveTwo(loginToken);
    }, 500);

    var listPlace = $("#jobList");

    removeLocalVariables();
    displayAllUsersJobs();

    function displayAllUsersJobs() {
        // Get a list of users under the logged in job coach
        var jobList = JSON.parse(localStorage.getItem('jobList'));

        // Loop through list of users jobs and create buttons for each
        $.each(jobList, function (key, item) {
            //var temp = JSON.stringify(item);
            $("<div class='ui-block-solo'><a onclick='editJob(\""+key+"\")' data-ajax='false' " +
                "class='ui-btn'>" + item.routineTitle +
                "</a></div>").appendTo(listPlace);

            listPlace.collapsibleset('refresh');
        });
    $("<div class='ui-block-solo'><a href='addJob.html' data-ajax='false'" +
        " class='ui-btn ui-icon-plus ui-btn-icon-top' style='background-color: #1d873b'>Add Job</a></div>").appendTo(listPlace);

        listPlace.collapsibleset('refresh');
    }
});

function editJob(routineKey)
{
    //console.log(routineKey);
    var routine = JSON.parse(localStorage.getItem('jobList'))[routineKey];
    //console.log(routine);
    localStorage.setItem("currentRoutine", JSON.stringify(routine));
    document.location.href = "editJob.html";
}

function removeLocalVariables() {
    localStorage.removeItem("currentRoutine");
    localStorage.removeItem("job");
    localStorage.removeItem("currentSequence");
    localStorage.removeItem("currentEditJob");
    localStorage.removeItem("currentRoutine");
    localStorage.removeItem("taskNum");
    localStorage.removeItem("currentTasks");
    localStorage.removeItem("arrayOfFeedback");
}

/*
<div class="ui-block-solo"><a href="editJob.html" data-ajax="false" class="ui-btn ui-icon-clock ui-btn-icon-top">Tools</a></div>
 */