jQuery(document).ready(function () {
	var uri = 'http://pjcdbrebuild.gear.host/api/';
    var loginToken = window.localStorage.getItem("token");
	$.getJSON(uri + "JobCoach",
		{token: loginToken},
        function (data) {
          // On success, 'data' contains JobCoach Info.
          localStorage.setItem('jobcoach', JSON.stringify(data));
            console.log(localStorage.getItem('jobcoach'));
			displayJobCoachInfo();
        }
		).error(function() {
			console.log("jobcoach not set");  
		});
});


function displayJobCoachInfo() {
        var jobcoach = JSON.parse(localStorage.getItem('jobcoach'));

        $.each(jobcoach, function (key, item) {
			console.log(item);
			$('#firstName').text(item.userName);
            
        });

    }
