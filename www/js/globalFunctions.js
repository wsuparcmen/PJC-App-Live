jQuery(document).ready(function() {
    window.logout = function() {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("jobName");
        window.localStorage.removeItem("name");
        window.localStorage.removeItem("routineList");
        window.location.href = "Login.html";
    }
    window.account = function() {
        window.location.href = "account.html";
    }
    window.keepAliveTwo = function(tempToken, tempUrl) {
        var theUrl = tempUrl;
        var keepAliveUri = 'http://pjcdbrebuild.gear.host/api/Login';
        var theToken = tempToken;
        
        $.getJSON(keepAliveUri,
            {token: theToken},
            function (data) {
                // On success, the token is valid, has not expired, and has been renewed.
				if(tempUrl!= null){
					window.location.href = tempUrl;
				}
                
            }
        ).error(function(data) {
            //error goes here
            //keepAliveTwo(theToken, theUrl);
            if (data.status == "401") {
                logout();
            } else {
                //alert("keepalive two not working");
                if (window.localStorage.getItem("token") == null) {
                    logout();
                } else {
                    console.log("SOMETHING SERIOUS BROKE!!!");
                    console.log(data.error);
                }
            }
        });
    } 
});