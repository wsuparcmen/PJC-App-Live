jQuery(document).ready(function () {
    
    var AUTH_TOKEN = window.localStorage.getItem("token");
    var oldToken = "b33c551a";
	
    /*var url = 'http://pjcdbrebuild.gear.host/api/AuthTest';
    $.ajax({
        type: 'GET',
        url: url + "?token=" + AUTH_TOKEN,
        dataType: 'json',
        success: function (data, status) {
            jQuery("#successOrFailure").text("SUCCESS!");
        },
        error: function () {
            alert("boo");
            window.location.href="Login.html";
        }
    });*/
    
    /*logout = function() {
        window.localStorage.removeItem("token");
        window.location.href = "Login.html";
    }*/
	jQuery('#logout').on('click', function () {
        window.localStorage.removeItem("token");
        window.location.href = "Login.html";
    });

});