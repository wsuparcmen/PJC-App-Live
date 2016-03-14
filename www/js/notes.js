jQuery(document).ready(function () {
  jQuery('#logout').on('click', function () {
        window.localStorage.removeItem("token");
        window.location.href = "Login.html";
    });
});