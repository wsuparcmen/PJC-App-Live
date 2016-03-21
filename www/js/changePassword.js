jQuery(document).ready(function() {
    var uri = 'http://pjcdbrebuild.gear.host/api/Login';
    var token = window.localStorage.getItem("token");
    var oldPassword = jQuery('input#old').val();
    var newPassword = jQuery('input#new').val();
    var confirmPassword = jQuery('input#confirm').val();
    jQuery('.change-password-save').on('click', 'a', function() {
        console.log("boo");
        InvalidOldPassword(); 
    });
});

function ValidLogin(){
    var login = {
    'UserName':'UnitTester',
    'Password':'testpassword'};
    $.ajax({
    type: 'POST',
    dataType: 'json',
    data: login,
    url: uri,
    success: function(data){
        token = data;
        InvalidOldPassword();
    },
    error: function(){
        $('#IOldPF').html('Failure: Valid Login Not Accepted');
        $('#IOldPF').css('color','red');
    }
    });
}

function InvalidOldPassword(){
    console.log("in function");
    var model = {
    'OldPassword':oldPassword,
    'NewPassword':newPassword,
    'ConfirmPassword':confirmPassword};
    $.ajax({
    type: 'POST',
    dataType: 'json',
    data: model,
    url: uri + "?token=" + token,
    success: function(data){
        //$('#IOldPF').html('Failure: Invalid Old Password Accepted');
        //$('#IOldPF').css('color','red');
        alert("success");
        
    },
    error: function(jqXHR, exception){
        jQuery('#changeError').html(jqXHR.status + ' - ' + jqXHR.responseText);
        //$('#IOldResult').html('' + jqXHR.status + ' - ' + jqXHR.responseText);
        //$('#IOldPF').html('Success!');
        //InvalidShortPassword();
    }
    });
}

function InvalidShortPassword(){
    var model = {
    'OldPassword':'testpassword',
    'NewPassword':'1',
    'ConfirmPassword':'1'};
    $.ajax({
    type: 'POST',
    dataType: 'json',
    data: model,
    url: uri + "?token=" + token,
    success: function(data){
        //$('#IShortPF').html('Failure: Invalid Short Password Accepted');
        //$('#IShortPF').css('color','red');
    },
    error: function(jqXHR, exception){
        //$('#IShortResult').html('' + jqXHR.status + ' - ' + jqXHR.responseText);
        //$('#IShortPF').html('Success!');
        //InvalidMismatchPassword();
    }
    });
}

function InvalidMismatchPassword(){
    var model = {
    'OldPassword':'testpassword',
    'NewPassword':'password',
    'ConfirmPassword':'password1'};
    $.ajax({
    type: 'POST',
    dataType: 'json',
    data: model,
    url: uri + "?token=" + token,
    success: function(data){
        //$('#IMismatchPF').html('Failure: Invalid Mismatched Password Accepted');
        //$('#IMismatchPF').css('color','red');
    },
    error: function(jqXHR, exception){
        //$('#IMismatchResult').html('' + jqXHR.status + ' - ' + jqXHR.responseText);
        //$('#IMismatchPF').html('Success!');
        //ValidChange();
    }
    });
}

function ValidChange(){
    var model = {
    'OldPassword':'testpassword',
    'NewPassword':'password',
    'ConfirmPassword':'password'};
    $.ajax({
    type: 'POST',
    dataType: 'json',
    data: model,
    url: uri + "?token=" + token,
    success: function(data){
        //$('#VChangePF').html('Success!');
        //$('#VChangeResult').html(data);
        //ValidReturn();
    },
    error: function(jqXHR, exception){
        //$('#VChangeResult').html('' + jqXHR.status + ' - ' + jqXHR.responseText);
        //$('#VChangePF').html('Failure: Valid Password Change Not Accepted');
        //$('#VChangePF').css('color','red');
        //ValidReturn();
    }
    });
}

