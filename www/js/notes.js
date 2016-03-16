jQuery(document).ready(function () {

});

logout = function() {
    window.localStorage.removeItem("token");
    window.location.href = "Login.html";
}
account = function() {
    window.location.href = "account.html";
}

$(document).on("pagecreate", function(){
	var count = 1;
	$("#save").click(function(){
		count++;
		$("#previousNotes").append("<li>" +
										"<a href='#'>" +
											"<h3>" + document.getElementById("noteName").value + "</h3>" +
											"<p class='topic'><strong>" + document.getElementById("noteName").value + "</strong></p>" +
											"<p>" + document.getElementById("note").value + "</p>" +
										"</a>" +
										"<a href='#' class='delete' onclick='test()'>Delete</a>" +
									"</li>");
		$("#previousNotes").listview("refresh");
	});
	
	$("#cancel").click(function(){
		document.getElementById("noteForm").reset();
	});
});

function test() {
	// Click delete split-button to remove list item
	$( ".delete" ).on( "click", function() {
		var listitem = $( this ).parent( "li" );
		confirmAndDelete( listitem );
	});
	
    function confirmAndDelete( listitem, transition ) {
        // Highlight the list item that will be removed
        listitem.children( ".ui-btn" ).addClass( "ui-btn-active" );
        // Inject topic in confirmation popup after removing any previous injected topics
        $( "#confirm .topic" ).remove();
        listitem.find( ".topic" ).clone().insertAfter( "#question" );
        // Show the confirmation popup
        $( "#confirm" ).popup( "open" );
        // Proceed when the user confirms
        $( "#confirm #yes" ).on( "click", function() {
            // Remove with a transition
            if ( transition ) {
                listitem
                    // Add the class for the transition direction
                    .addClass( transition )
                    // When the transition is done...
                    .on( "webkitTransitionEnd transitionend otransitionend", function() {
                        // ...the list item will be removed
                        listitem.remove();
                        // ...the list will be refreshed and the temporary class for border styling removed
                        $( "#previousNotes" ).listview( "refresh" ).find( ".border-bottom" ).removeClass( "border-bottom" );
                    })
                    // During the transition the previous button gets bottom border
                    .prev( "li" ).children( "a" ).addClass( "border-bottom" )
                    // Remove the highlight
                    .end().end().children( ".ui-btn" ).removeClass( "ui-btn-active" );
            }
            // If it's not a touch device or the CSS transition isn't supported just remove the list item and refresh the list
            else {
                listitem.remove();
                $( "#previousNotes" ).listview( "refresh" );
            }
        });
        // Remove active state and unbind when the cancel button is clicked
        $( "#confirm #cancel" ).on( "click", function() {
            listitem.removeClass( "ui-btn-active" );
            $( "#confirm #yes" ).off();
        });
    }
}