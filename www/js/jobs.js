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
				"<a href='tasks.html' data-ajax='false' class='ui-btn begin-button' style='background-color:#1de27c;'>Begin Routine</a>" +
				"<div class='ui-grid-a ui-responsive'>" +
					/*"<div class='ui-block-a'><h4>Description</h4></div>" +
					"<div class='ui-block-b'><p>" + item.Tasks[0].TaskCategory.categoryName + " | "  +"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse accumsan blandit fermentum...</p></div>" +*/
					"<div class='ui-block-a'><b>Estimated Time</b></div>" +
					"<div class='ui-block-b'><p>" + checkNullTime(item.expectedDuration) + "</p></div>" +
					"<div class='ui-block-a'><b>Number of Tasks</b></div>" +
					"<div class='ui-block-b'><p>" + item.Tasks.length + "</p></div>" +
                "</div>" + 
				"<a href='#makeNote' data-rel='popup' data-position-to='window' data-transition='pop' class='ui-btn make-note'>Make Note</a>" +
			"</div>").appendTo($("#routineList"));
			
			$('.begin-button').css('border-color', '#1d873b');
            $('.begin-button').css('border-width', '3px');
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
    
    jQuery('.make-note').on('click', function() {
        var self = jQuery(this);
        //document.getElementById("noteName").value = self.closest('.ui-collapsible').find('h3 a').text().split(' click')[0];
        document.getElementById("hiddenJobName").value = self.closest('.ui-collapsible').find('h3 a').text().split(' click')[0];
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