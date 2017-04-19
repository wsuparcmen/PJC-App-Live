jQuery(document).ready(function() {
    var uri = 'http://http://pjclive.gear.host//api/Login';
    var token = window.localStorage.getItem("token");
    var stToken = window.localStorage.getItem("token").toString();
    var num = stToken.search(",");
    var role = stToken.substr(num + 1);
    var model = {};



    if (role == "Job Coach" || role == "Parent" || role == "Administrator")
    {
        document.getElementById("footer").hidden = true;
        document.getElementById("coachFooter").hidden = false;
    }


    jQuery('.change-password-save').on('click', 'a', function() {
        model = {
        'OldPassword':jQuery('input#old').val(),
        'NewPassword':jQuery('input#new').val(),
        'ConfirmPassword':jQuery('input#confirm').val()};
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: model,
            url: uri + "?token=" + token,
            success: function(data){

                if(role == "Job Coach" || role == "Parent" || role == "Administrator")
                {
                    window.location.href = 'ParentCoachSplash.html';
                }
                else
                {
                    window.location.href = 'splash.html';
                }

            },
            error: function(jqXHR, exception){
                console.log(jqXHR.status + ' - ' + jqXHR.responseText);
                if (model.NewPassword !== model.ConfirmPassword) {
                    jQuery('#changeError').html("'New Password' does not match 'Confirm Password'")
                } else if (model.NewPassword.length < 8) {
                    jQuery('#changeError').html("Your new password is not long enough");
                } else {
                    jQuery('#changeError').html("There was an error, check your old password and try again");
                }
            }
        });
    });
    setTimeout(function() {
        keepAliveTwo(token);    
    }, 500);
});

function goBack() {
    window.history.back();
}