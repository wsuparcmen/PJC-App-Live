jQuery(document).ready(function () {
    
    var loginToken = window.localStorage.getItem("token");
    var oldToken = "b33c551a";
    var uri = 'http://pjcdbrebuild.gear.host/api/';
	
    $.getJSON(uri + "Routine",
        {token: loginToken},
        function (data) {
            localStorage.setItem('routineList', JSON.stringify(data));
        }
    );

    displayAllRoutinesFromStorage();
        
        
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
    }
    
    /*$.ajax({
        type: 'GET',
        dataType: 'json',
        data: {token: loginToken},
        url: uri + "Routine",
        success: function (data) {
            
      });*/
      
      
            
            //window.localStorage.setItem("stuff", data);
            /*$.each(data, function(key, item) {
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
        }*/
});
    
    /*var url = 'http://pjcdbrebuild.gear.host/api/AuthTest';
    $.ajax({
        type: 'GET',
        url: url + "?token=" + AUTH_TOKEN,
        dataType: 'json',
        success: function (data, status) {
            jQuery("#successOrFailure").text("SUCCESS!");
        },
        error: function () {
            alert("boo");
            window.location.href="Login.html";
        }
    });*/
    
    /*logout = function() {
        window.localStorage.removeItem("token");
        window.location.href = "Login.html";

    }*/


logout = function() {
       window.localStorage.removeItem("token");
       window.location.href = "Login.html";
   }
account = function() {
    window.location.href = "account.html";
}

