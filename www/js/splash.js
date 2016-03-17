jQuery(document).ready(function () {
    console.log(localStorage.getItem('routineList'));
    localStorage.removeItem('routineList');
    
    console.log(localStorage.getItem('routineList'));
    var loginToken = window.localStorage.getItem("token");
    var uri = 'http://pjcdbrebuild.gear.host/api/';

	
    $.getJSON(uri + "Routine",
        {token: loginToken},
        function (data) {
            localStorage.setItem('routineList', JSON.stringify(data));
            console.log(localStorage.getItem('routineList'));
        }
    );
    console.log(localStorage.getItem('routineList'));
    
    //keepAlive(loginToken);

    /*displayAllRoutinesFromStorage();
        
        
    function displayAllRoutinesFromStorage() {
        var routineList = JSON.parse(localStorage.getItem('routineList'));
        $.each(routineList, function (key, item) {
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
    }*/
    
    
});