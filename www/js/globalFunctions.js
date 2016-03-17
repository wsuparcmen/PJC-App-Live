jQuery(document).ready(function() {
    logout = function() {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("jobName");
        window.localStorage.removeItem("routineList");
        window.location.href = "Login.html";
    }
    account = function() {
        window.location.href = "account.html";
    }
    window.keepAlive = function(tempToken) {
        //alert("it worked");
        
        var uri = 'http://pjcdbrebuild.gear.host/api/Login';
        var token = tempToken;
        $.getJSON(uri,
            {token: token},
            function (data) {
                // On success, the token is valid, has not expired, and has been renewed.
                console.log("kept alive");
            }
        ).error(function() {
            //error goes here
            console.log("failed to keep alive");
        });
        console.log("keep alive is set");
        
        /*$.getJSON("example.json", function() {
            alert("success");
        })
        .success(function() { alert("second success"); })
        .error(function() { alert("error"); })
        .complete(function() { alert("complete"); });*/
        
        
    } 
});