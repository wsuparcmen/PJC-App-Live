jQuery(document).ready(function () {

});

$(document).on("pagecreate", function(){
    var uri = 'http://pjc.gear.host/api/';
    var loginToken = window.localStorage.getItem("token");
    
	$("#save").click(function(){
		var name = document.getElementById("noteName").value;
		var note = document.getElementById("note").value;
		
		if(name == ""){
			$("#emptyNote #message")[0].innerText = "Please name your note before saving.";
			$("#emptyNote").popup("open");
		} else if(note == ""){
			$("#emptyNote #message")[0].innerHTML = "Your note is blank and was not saved.";
			$("#emptyNote").popup("open");
		}
        
        if (name != "" && note !== "") {
            console.log(uri);
            console.log(loginToken);
            var userNote = {
                'noteTitle':name,
                'noteMessage':note};
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: userNote,
                url: uri + "Note?token=" + loginToken,
                success: function(data){
                    document.getElementById("noteForm").reset();
                    window.location.href = "splash.html";            
                },
                error: function(){
                    console.log("NOTE DID NOT UPLOAD");
                }
            });
        }
        
	});
	
	$("#clear").click(function(){
		document.getElementById("noteForm").reset();
	});
});