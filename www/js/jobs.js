jQuery(document).ready(function() {
    var uri = 'http://pjcdbrebuild.gear.host/api/';
    var loginToken = window.localStorage.getItem("token");

    displayAllRoutinesFromStorage();
            
    function displayAllRoutinesFromStorage() {
        var routineList = JSON.parse(localStorage.getItem('routineList'));
        $.each(routineList, function (key, item) {
            $("<div data-role='collapsible'>" +
				"<h3>" + item.routineTitle + "</h3>" +
				"<a href='tasks.html' data-ajax='false' class='ui-btn begin-button'>Begin Routine</a>" +
				"<div class='ui-grid-a ui-responsive'>" +
					"<div class='ui-block-a'><h4>Description</h4></div>" +
					"<div class='ui-block-b'><p>" + item.Tasks[0].TaskCategory.categoryName + " | "  +"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse accumsan blandit fermentum...</p></div>" +
					"<div class='ui-block-a'><b>Estimated Time</b></div>" +
					"<div class='ui-block-b'><p>8 minutes</p></div>" +
					"<div class='ui-block-a'><b>Number of Tasks</b></div>" +
					"<div class='ui-block-b'><p>10</p></div>" +
					"<div class='ui-block-a'><a href='#previousNotes' data-rel='popup' data-position-to='window' data-transition='pop' class='ui-btn'>Previous Notes</a></div>" +
					"<div class='ui-block-b'><a href='#makeNote' data-rel='popup' data-position-to='window' data-transition='pop' class='ui-btn'>Make Note</a></div>" +
				"</div>" +
			"</div>").appendTo($("#routineList"));
			
			$('#routineList').collapsibleset('refresh');
        });
    }
    
    jQuery('a.begin-button').on('click', function() {
        var self = jQuery(this);
        alert(self.prev().text());
        localStorage.setItem("jobName", self.prev().text());
        alert(localStorage.getItem("jobName"));
    });

/*$.ajax({
        type: 'GET',
        dataType: 'json',
        data: {token: loginToken},
        url: uri + "Routine",
        success: function (data) {
            $.each(data, function(key, item) {
                 $("<li>" +
				"<a href='tasks.html' data-ajax='false'>" +
					"<h2>" + item.routineTitle + "</h2>" +
				"</a>" +
			"</li>" +
            "<div class='ui-corner-all'>" +
                "<div class='ui-body ui-body-a'>" +
                    "<div class='ui-grid-a ui-responsive'>" +
                        "<div class='ui-block-a'>" +
                            "<h4>Description</h4>" +
                            "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse accumsan blandit fermentum...</p>" +
                        "</div>" +
                        "<div class='ui-block-b'><a href='#makenote' data-rel='popup' data-position-to='window' data-transition='pop' class='ui-btn ui-icon-note'>Make Note</a></div>" +
                    "</div>" +
                "</div>" +
            "</div>").appendTo($("#routineList"));  
            });
        },
        error: function () {
            alert("boo yah");
            //jQuery("#error").text("Username or password is incorrect");
        }
}); */
});



/*$.getJSON(uri + "Routine",
    {token: loginToken},
    function (data) {
        // On success, 'data' contains a list of Routines.
        $.each(data, function (key, item) {
            console.log("test");
        // Add a list item for the record.
        //$('<li>', { text: formatItem(item) }).appendTo($('#getAllRoutinesResults'));
        $("<li><a href='tasks.html' data-ajax='false'>" + 
            "<h2>" + item.routineTitle + "</h2>" + 
            "<p>Here are some notes</p>" +
            "<p>" + item.creatorUserName + "</p>" + 
          "</a></li>").appendTo($("#routineList"));
        });
    }
    );/*.always(function(){
    if ($('#getAllRoutinesResults li').length == 3){
        $('#getAllRoutinesPF').html('Success!');
    } else {
        $('#getAllRoutinesPF').html('Failure: No Routines Returned');
        $('#getAllRoutinesPF').css('color','red');
    }
});*/

function formatItem(item) {
      return item.routineTitle + ': ' + item.assigneeUserName + "'s Routine assigned by - " + item.creatorUserName;
}

logout = function() {
    window.localStorage.removeItem("token");
    window.location.href = "Login.html";
}
account = function() {
    window.location.href = "account.html";
}