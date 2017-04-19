jQuery(document).ready(function () {
    $('#calendar').fullCalendar({
        //any options we want here
        height: "auto",
        handleWindowResize: true
    });
    var token = localStorage.getItem("token");
    var num = token.search(",");
    var role = token.substr(num + 1);
    if(role == "Job Coach" || role == "Parent" || role == "Administrator"){
        document.getElementById("footer").hidden = true;
        document.getElementById("coachFooter").hidden = false;
    }
});
