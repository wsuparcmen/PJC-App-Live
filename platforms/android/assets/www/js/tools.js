jQuery(document).ready(function () {
    var loginToken = window.localStorage.getItem("token");
    setTimeout(function() {
        keepAliveTwo(loginToken);    
    }, 500);
});
