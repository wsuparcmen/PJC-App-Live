function submitLogin() {
   jQuery(document).ready(function() {
	   var uri = 'http://pjc.gear.host/api/Login';
       var login = {
             'UserName': $('#username').val(),
             'Password': $('#password').val()};

        console.log("test");
        $.ajax({
             type: 'POST',
             dataType: 'json',
             data: login,
             url: uri,
             success: function (data) {
				  localStorage.token = data;
				  $('#data').html(localStorage.token);
             },
             error: function () {
                  alert('Failure');
             }
        });
   });
}