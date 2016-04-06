jQuery(document).ready(function () {
    console.log(localStorage.getItem('routineList'));
    localStorage.removeItem('routineList');
    document.getElementById("userName").innerHTML = "Hello " + localStorage.getItem('userName') + "!";
     document.getElementById("userName").value = localStorage.getItem('name');
    
    console.log(localStorage.getItem('routineList'));
    var loginToken = window.localStorage.getItem("token");
    var uri = 'http://pjcdbrebuild.gear.host/api/';

	
    $.getJSON(uri + "Routine",
        {token: loginToken},
        function (data) {
            localStorage.setItem('routineList', JSON.stringify(data));
            console.log(localStorage.getItem('routineList'));
        }
    ).error(function() {
        console.log("routineList not set");  
    });
    console.log(localStorage.getItem('routineList'));
    
    setTimeout(function() {
        keepAliveTwo(loginToken);    
    }, 500);
    
    
    function keepAlive(tempToken) {
        var keepAliveUri = 'http://pjcdbrebuild.gear.host/api/Login';
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