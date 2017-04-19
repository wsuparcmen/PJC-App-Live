//window.addEventListener('load', loadHandler);
function submitLogin() {
   jQuery(document).ready(function() {
	   var uri = 'http://http://pjclive.gear.host//api/Login';
	   var day = new Date();
	   var now = day.getTime();
     var name=$('#username').val();
       var login = {
             'UserName': name,//$('#username').val(),
             'Password': $('#password').val(),
             'RememberMe': $('#remember').is(':checked')};


        $.ajax({
             type: 'POST',
             dataType: 'json',
             data: login,
             url: uri,
             success: function (data) {
                window.localStorage.setItem("token", data);
                 var token = data;
                 var num = token.search(",");
                 var role = token.substr(num + 1);
                 if(role == "Job Coach" || role == "Parent" || role == "Administrator"){
                     window.location.href = 'ParentCoachSplash.html';
                 }
                 else
                     window.location.href = 'splash.html';
                 //window.location.href = 'splash.html';
                localStorage.setItem('userName',name); 

                //$.mobile.changePage('splash.html', {transition: "slideup", changeHash: false});
                //$('#data').html(window.localStorage.getItem("token"));
             },
             error: function () {
                 var error = jQuery("#error");
                  error.text("Username or password is incorrect");
                  error.css("color", "red");
             }
        });
   });
}

jQuery(document).ready(function() {
   if (window.localStorage.getItem("token") !== null) {
       var token = window.localStorage.getItem("token").toString();
       var num = token.search(",");
       var role = token.substr(num+1);
       //console.log(role);
       if(role == "Job Coach" || role == "Parent" || role == "Administrator"){
           window.location.href = 'ParentCoachSplash.html';
       }
       else
           window.location.href = 'splash.html';
        }
   //else console.log("token is null");
});