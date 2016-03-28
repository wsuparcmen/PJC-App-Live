jQuery(document).ready(function() {
    var uri = 'http://pjcdbrebuild.gear.host/api/Login';
    var token = window.localStorage.getItem("token");
    var model = {};
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
                window.location.href = "splash.html";
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
});