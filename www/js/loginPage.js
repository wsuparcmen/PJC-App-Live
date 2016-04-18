//window.addEventListener('load', loadHandler);
function submitLogin() {
   jQuery(document).ready(function() {
	   var uri = 'http://pjcdbrebuild.gear.host/api/Login';
	   var day = new Date();
	   var now = day.getTime();
     var name=$('#username').val();
       var login = {
             'UserName': $('#username').val(),
             'Password': $('#password').val(),
             'RememberMe': $('#remember').is(':checked')};
             
        $.ajax({
             type: 'POST',
             dataType: 'json',
             data: login,
             url: uri,
             success: function (data) {
                window.localStorage.setItem("token", data);
                window.location.href = 'splash.html';
                localStorage.setItem('userName',name); 

                //$.mobile.changePage('splash.html', {transition: "slideup", changeHash: false});
                //$('#data').html(window.localStorage.getItem("token"));
             },
             error: function () {
                  jQuery("#error").text("Username or password is incorrect");
                  jQuery("#error").css("color", "red");
             }
        });
   });
}

jQuery(document).ready(function() {
   if (window.localStorage.getItem("token") !== null) { 
        window.location.href = 'splash.html';  

   }
});