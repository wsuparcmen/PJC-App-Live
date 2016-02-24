jQuery(document).ready(function () {
    
    var AUTH_TOKEN = window.localStorage.getItem("token");
    var oldToken = "b33c551a";
	
	jQuery('#delete').on('click', function () {
        jQuery('#token').text("");
		window.localStorage.removeItem("token");
		jQuery('#deletedToken').text(window.localStorage.getItem("token"));
    });
	
    var url = 'http://pjc.gear.host/api/AuthTest';
    $.ajax({
        type: 'GET',
        url: url + "?token=" + AUTH_TOKEN,
        dataType: 'json',
        success: function (data, status) {
            jQuery("#successOrFailure").text("SUCCESS!");
            /*$.each(data, function (key, item) {
                $('<li>', { text: formatItem(item) }).appendTo($('#records'));
            });*/
        },
        error: function () {
            window.location.href="Login.html";
        }
    });

    function formatItem(item) {
        return item.helloID + ":" + item.helloLanguage + ":" + item.helloMessage + ".";
    }
    function logout() {
        window.localStorage.removeItem("token");
        window.location.href = "Login.html";
    }

});