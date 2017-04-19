/**
 * Created by Tanner_2 on 2/14/2017.
 */
jQuery(document).ready(function () {
    localStorage.removeItem('routineList');
    localStorage.removeItem('userList');
    localStorage.removeItem('jobList');
    document.getElementById("userName").innerHTML = "Hello " + localStorage.getItem('userName') + "!";
    document.getElementById("userName").value = localStorage.getItem('name');

    var loginToken = window.localStorage.getItem("token");
    var uri = 'http://http://pjclive.gear.host//api/';

    $.getJSON(uri + "JobCoach",
        {token: loginToken},
        function (data) {
        console.log("Success!!!");
            localStorage.setItem("userList", JSON.stringify(data));
        }).error(function () {
        console.log("USER LIST IS NOT SET");
    });

    function keepAlive(tempToken) {
        var keepAliveUri = 'http://http://pjclive.gear.host//api/Login';
        var token = tempToken;
        $.getJSON(keepAliveUri,
            {token: token},
            function (data) {
                // On success, the token is valid, has not expired, and has been renewed.
                console.log("kept alive");
            }
        ).error(function() {
            //error goes here
            alert("failed to keep alive");
        });
    }
});