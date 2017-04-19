function getUserInfo($username) {
        var loginToken = window.localStorage.getItem("token");

        setTimeout(function() {
            keepAliveTwo(loginToken);
        }, 500);

        var uri = 'http://pjcdbrebuild2.gear.host/api/';
        $.getJSON(uri + "JobCoach",
            {token: loginToken, username: $username},
            function (data) {
                window.localStorage.setItem("UserInfo", JSON.stringify(data));
            }
        ).error(function () {
            console.log("Something went wrong getting the data");
        }).success(function () {
            location.href="userinfo.html";
        });
}
