jQuery(document).ready(function () {
    var loginToken = window.localStorage.getItem("token");
    setTimeout(function() {
        keepAliveTwo(loginToken);    
    }, 500);


    if (window.localStorage.getItem("token") !== null) {
        var token = window.localStorage.getItem("token").toString();
        var num = token.search(",");
        var role = token.substr(num+1);
        var a = document.getElementById('back');
        var b = document.getElementById('home');
        //console.log(role);
        if(role == "Job Coach" || role == "Parent" || role == "Administrator"){
            a.href = 'ParentCoachSplash.html';
            b.href = 'ParentCoachSplash.html';
        }
        else {
            a.href = 'splash.html';
            b.href = 'ParentCoachSplash.html';
        }
    }
});
