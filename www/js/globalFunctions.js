logout = function() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("jobName");
    window.localStorage.removeItem("routineList");
    window.location.href = "Login.html";
}
account = function() {
    window.location.href = "account.html";
}