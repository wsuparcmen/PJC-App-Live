jQuery(document).ready(function() {
    var uri = 'http://pjcdbrebuild.gear.host/api/';
    var loginToken = window.localStorage.getItem("token");
      
	setTimeout(function() {
        keepAliveTwo(loginToken);    
    }, 500);
	
    displayAllRoutinesFromStorage();
            
    function displayAllRoutinesFromStorage() {
        var routineList = JSON.parse(localStorage.getItem('routineList'));

        $.each(routineList, function (key, item) {
            console.log(item.routineTitle);
            $("<div data-role='collapsible'>" +
				"<h3>" + item.routineTitle + "</h3>" +
				"<a href='tasks.html' data-ajax='false' class='ui-btn begin-button'>Begin Routine</a>" +
				"<div class='ui-grid-a ui-responsive'>" +
					"<div class='ui-block-a'><h4>Description</h4></div>" +
					"<div class='ui-block-b'><p>" + item.Tasks[0].TaskCategory.categoryName + " | "  +"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse accumsan blandit fermentum...</p></div>" +
					"<div class='ui-block-a'><b>Estimated Time</b></div>" +
					"<div class='ui-block-b'><p>" + checkNullTime(item.expectedDuration) + "</p></div>" +
					"<div class='ui-block-a'><b>Number of Tasks</b></div>" +
					"<div class='ui-block-b'><p>" + item.Tasks.length + "</p></div>" +
					"<div class='ui-block-a'><a href='#notesList' data-rel='popup' data-position-to='window' data-transition='pop' class='ui-btn'>Previous Notes</a></div>" +
					"<div class='ui-block-b'><a href='#makeNote' data-rel='popup' data-position-to='window' data-transition='pop' class='ui-btn'>Make Note</a></div>" +
				"</div>" +
			"</div>").appendTo($("#routineList"));
			
			$('#routineList').collapsibleset('refresh');
        });

    }
	
    jQuery('a.begin-button').on('click', function(e) {
        e.preventDefault();
        var self = jQuery(this);
        var tempJobName = self.parent().prev().find('a').contents().text().split(' click')[0];
        localStorage.setItem("jobName", tempJobName);
        keepAliveTwo(loginToken, "tasks.html");
    });
    
    function checkNullTime(duration) {
        if (duration === null) {
            return "00:00:00";
        } else {
            return duration;
        }
    }
    
});

function formatItem(item) {
      return item.routineTitle + ': ' + item.assigneeUserName + "'s Routine assigned by - " + item.creatorUserName;
}