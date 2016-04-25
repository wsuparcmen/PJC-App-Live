$(document).on("pagecreate", function(){
    var jobNotesArray = [];
    var taskNotesArray = [];
    var item = {};
	
	$("#save").click(function(){
        var self = jQuery(this);
		var name = document.getElementById("noteName").value;
		var note = document.getElementById("note").value;
        var stepNo;
        var hiddenJobName;
        if ((window.location.href).indexOf("tasks") > -1) {
            stepNo = document.getElementById("stepNumber").value;  
            item = {name:name, note:note, stepNumber:stepNo}; 
        } else {
            hiddenJobName = document.getElementById("hiddenJobName").value;
            item = {name:name, note:note};   
        }
		
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
            if ((window.location.href).indexOf("jobs") > -1) {
                jobNotesArray.push(item);
                window.localStorage.removeItem("jobNotesArray"+hiddenJobName);
                window.localStorage.setItem("jobNotesArray"+hiddenJobName, JSON.stringify(jobNotesArray));
            } else {
                taskNotesArray.push(item);
                window.localStorage.removeItem("taskNotesArray");
                window.localStorage.setItem("taskNotesArray", JSON.stringify(taskNotesArray));
            }
            
            
            //reset all the things
            item = {};
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
