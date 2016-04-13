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
	$("#save").click(function(){
		var name = document.getElementById("noteName").value;
		var note = document.getElementById("note").value;
		
		if(name == ""){
			$("#emptyNote #message")[0].innerText = "Please name your note before saving.";
			$("#emptyNote").popup("open");
		}
		else if(note == ""){
			$("#emptyNote #message")[0].innerHTML = "Your note is blank and was not saved.";
			$("#emptyNote").popup("open");
		}
	});
	
	$("#clear").click(function(){
		document.getElementById("noteForm").reset();
	});
});