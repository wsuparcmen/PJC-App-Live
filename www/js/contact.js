jQuery(document).ready(function () {
  
    // This section tests appending click to call and click to text
    
    var contactNumber = '801-777-4035';
    var defaultMessage = 'I require attention regarding my job.';
    var p = new Phone(contactNumber);
    $('#phone').text(contactNumber);
    $('#phone').append(p.loadClickToCall());
    $('#phone').append(p.loadClickToText(defaultMessage));
    
    contactNumber = '801-355-0000';
    var defaultMessage = 'Dear parent. Help!';
    p = new Phone(contactNumber);
    $('#parentPhone').text(contactNumber);
    $('#parentPhone').append(p.loadClickToCall());
    $('#parentPhone').append(p.loadClickToText(defaultMessage));
    
    //  
     
	var uri = 'http://pjcdbrebuild.gear.host/api/';
    var loginToken = window.localStorage.getItem("token");
	$.getJSON(uri + "JobCoach",
		{token: loginToken},
        function (data) {
          // On success, 'data' contains JobCoach Info.
          localStorage.setItem('jobcoach', JSON.stringify(data));
            //console.log(localStorage.getItem('jobcoach'));
			displayJobCoachInfo();
        }
		).error(function() {
			console.log("jobcoach not set");  
		});
		
		 $.getJSON(uri + "Parent",
        {token: loginToken},
        function (data) {
          // On success, 'data' contains Parent Info.
          localStorage.setItem('parentInfo', JSON.stringify(data));
            console.log(localStorage.getItem('parentInfo'));
			displayJobCoachInfo();
        }
		).error(function() {
			console.log("parentInfo not set");  
		});
        
        setTimeout(function() {
            keepAliveTwo(loginToken);    
        }, 500);
});


function displayJobCoachInfo() {
        var jobcoach = JSON.parse(localStorage.getItem('jobcoach'));
		var parentInfo = JSON.parse(localStorage.getItem('parentInfo'));
        $.each(jobcoach, function (key, item) {
			console.log(item);
			console.log(key);
			if(key=="userName"){
				$('#firstName').text(item);
			}
			if(key=="email"){
				$('#email').text(item);
			}
			if(key=="phone"){
				$('#phone').text(item);
			}
            
        });
		$.each(parentInfo, function (key, item) {
			console.log(item);
			console.log(key);
			if(key=="userName"){
				$('#parentFirstName').text(item);
			}
			if(key=="email"){
				$('#parentEmail').text(item);
			}
			if(key=="phone"){
				$('#parentPhone').text(item);
			}
            
        });

    }
