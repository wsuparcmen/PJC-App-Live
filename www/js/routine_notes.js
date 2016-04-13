$(document).on("pagecreate", function(){
	
	$("#save").click(function(){
		var name = document.getElementById("noteName").value;
		var note = document.getElementById("note").value;
		
		if(name.trim() == ""){
			document.getElementById("nameError").style.color = "red";
			document.getElementById("nameError").innerText = "Please name your note before saving.";
		}
		else{
			document.getElementById("nameError").innerText = "";
		}
		
		if(note.trim() == ""){
			document.getElementById("noteError").style.color = "red";
			document.getElementById("noteError").innerText = "Your note is blank and cannot be saved.";
		}
		else{
			document.getElementById("noteError").innerText = "";
		}
		
		if(name != "" && note !=""){
            document.getElementById("nameError").innerText = "";
            document.getElementById("noteError").innerText = "";
            document.getElementById("noteForm").reset();
			$("#makeNote").popup("close");
		}
	});
	
	$("#cancel").click(function(){
		document.getElementById("nameError").innerText = "";
		document.getElementById("noteError").innerText = "";
		document.getElementById("noteForm").reset();
	});
});
