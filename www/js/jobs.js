jQuery(document).ready(function() {
   var uri = 'http://pjcdbrebuild.gear.host/api/';
var loginToken = window.localStorage.getItem("token");

$.ajax({
        type: 'GET',
        dataType: 'json',
        data: {token: loginToken},
        url: uri + "Routine",
        success: function (item) {
            $("<li><a href='tasks.html' data-ajax='false'>" + 
            "<h2>" + item.routineTitle + "</h2></a>" + 
            "<p>Here are some notes</p>" +
            "<p>" + item.creatorUserName + "</p>" + 
          "</li>").appendTo($("#routineList"));
        },
        error: function () {
            alert("failure");
            //jQuery("#error").text("Username or password is incorrect");
        }
}); 
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