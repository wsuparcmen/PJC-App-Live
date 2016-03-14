jQuery(document).ready(function() {
    var uri = 'http://pjcdbrebuild.gear.host/api/';
    var loginToken = window.localStorage.getItem("token");
    
    
    
});z

logout = function() {
    window.localStorage.removeItem("token");
    window.location.href = "Login.html";
}