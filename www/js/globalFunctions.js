jQuery(document).ready(function() {
    window.logout = function() {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("jobName");
        window.localStorage.removeItem("routineList");
        window.location.href = "Login.html";
    }
    window.account = function() {
        window.location.href = "account.html";
    }
    window.keepAliveTwo = function(tempToken) {
        
        var keepAliveUri = 'http://pjcdbrebuild.gear.host/api/Login';
        var theToken = tempToken;
        
        $.getJSON(keepAliveUri,
            {token: theToken},
            function (data) {
                // On success, the token is valid, has not expired, and has been renewed.
                console.log("kept alive");
                
            }
        ).error(function(data) {
            //error goes here
            console.log("failed to keep alive");
            logout();
        });
    } 
});