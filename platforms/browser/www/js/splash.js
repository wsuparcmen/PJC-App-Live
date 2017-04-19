jQuery(document).ready(function () {
    localStorage.removeItem('routineList');
    document.getElementById("userName").innerHTML = "Hello " + localStorage.getItem('userName') + "!";
    document.getElementById("userName").value = localStorage.getItem('name');
    
    var loginToken = window.localStorage.getItem("token");
    var uri = 'http://pjcdbrebuild2.gear.host/api/';

    setTimeout(function() {
            keepAliveTwo(loginToken);
        },500);

    $.getJSON(uri + "Routine",
        {token: loginToken},
        function (data) {
            localStorage.setItem('routineList', JSON.stringify(data));
        }
    ).error(function() {
        console.log("ROUTINE LIST IS NOT SET");  
    });

    
    function keepAlive(tempToken) {
        var keepAliveUri = 'http://pjcdbrebuild2.gear.host/api/Login';
        //var token = tempToken;
        $.getJSON(keepAliveUri,
            {token: tempToken},
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