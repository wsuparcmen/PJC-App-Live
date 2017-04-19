jQuery(document).ready(function () {
    var loginToken = window.localStorage.getItem('token');
    setTimeout(function () {
        keepAliveTwo(loginToken);
    }, 500);
    console.log("loading feedback");
    loadFeedback();
});

function loadFeedback() {
    var currentFeedback = JSON.parse(localStorage.getItem("currentFeedback"));
    document.getElementById("feedName").value = currentFeedback.feedbackTitle;
    document.getElementById("feedMessage").value = currentFeedback.feedbackMessage;
    //TODO: Implement the media type and feedback type
}

function editFeedback() {
    var feedNum = localStorage.getItem("feedNum");
    var currentFeedback = JSON.parse(localStorage.getItem("currentFeedback"));
    currentFeedback.feedbackTitle = document.getElementById("feedName").value;
    currentFeedback.feedbackMessage = document.getElementById("feedMessage").value;
    //TODO: Implement media type and feedback type

    var currentTask = JSON.parse(localStorage.getItem("currentEditJob"));
    currentTask.Feedbacks[feedNum] = currentFeedback;
    localStorage.setItem("currentEditJob", JSON.stringify(currentTask));
    window.history.back();
}

function deleteFeedback() {
    var feedNum = localStorage.getItem("feedNum");
    var currentTask = JSON.parse(localStorage.getItem("currentEditJob"));
    currentTask.Feedbacks.splice(feedNum, 1);
    localStorage.setItem("currentEditJob", JSON.stringify(currentTask));
    window.history.back();
}