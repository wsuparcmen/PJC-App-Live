jQuery(document).ready(function () {

});

logout = function() {
    window.localStorage.removeItem("token");
    window.location.href = "Login.html";
}