$(document).on("pagecreate", function(){
	if(document.getElementById("previousNotes").innerHTML == ""){
		document.getElementById("emptyNotesList").innerText = "There are no previous notes.";
	}
	
	$("#save").click(function(){
		var name = document.getElementById("noteName").value;
		var note = document.getElementById("note").value;
		
		document.getElementById("emptyNotesList").innerText = "";
		
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
			$("#previousNotes").append("<div data-role='collapsible'>" +
											"<h3><span class='title'>" + name + "</span></h3>" +
											"<p class='body'>" + note + "</p>" +
											"<p class='confirmDelete'></p>" +
											"<p class='editNote'></p>" +
											"<div class='ui-grid-a ui-responsive noteControls'>" +
												"<div class='ui-block-a'><a href='#' class='ui-btn edit'>Edit</a></div>" +
												"<div class='ui-block-b'><a href='#' class='ui-btn delete'>Delete</a></div>" +
											"</div>" +
										"</div>");
			$("#previousNotes").collapsibleset("refresh");
			document.getElementById("noteForm").reset();
			
			$(".edit").on("click", function(){
				var item = $(this).parent("div").parent("div").parent("div").parent("div");
				edit(item);
			});
			
			$(".delete").on("click", function(){
				var item = $(this).parent("div").parent("div").parent("div").parent("div");
				confirmAndDelete(item);
			});
			
			$("#makeNote").popup("close");
			
			//save note
		}
	});
	
	$("#cancel").click(function(){
		document.getElementById("nameError").innerText = "";
		document.getElementById("noteError").innerText = "";
		document.getElementById("noteForm").reset();
	});
});

function confirmAndDelete(item){
	var list = document.getElementById("popupContent").innerHTML;
	
	item.find(".confirmDelete")[0].style.color = "red";
	item.find(".confirmDelete")[0].innerText = "Are you sure you want to delete this note?";
	
	item.find(".noteControls")[0].innerHTML = "<div class='ui-block-a'><a href='#' class='ui-btn yes'>Yes</a></div>" +
												"<div class='ui-block-b'><a href='#' class='ui-btn cancel'>Cancel</a></div>";
				
	$(".yes").on("click", function(){
		item.remove();
		
		if(document.getElementById("previousNotes").innerHTML == ""){
			document.getElementById("emptyNotesList").innerText = "There are no previous notes.";
		}
		
		//delete note
	});
	
	$(".cancel").on("click", function(){
		$("#confirm #yes").off();
		resetNoteControls(item);
	});
}

function edit(item){
	item.find(".editNote")[0].innerHTML = "<form>" +
											"<label for='noteName'>Name</label>" +
											"<input type='text' name='noteName' class='editName' value='" + item.find(".title")[0].innerText + "'/>" +
											"<label for='note'>Note</label>" +
											"<textarea name='note' class='editBody'>" + item.find(".body")[0].innerText + "</textarea>" +
										"</form>";
	
	item.find(".confirmDelete")[0].innerText = "";
	item.find(".noteControls")[0].innerHTML = "<div class='ui-block-a'><a class='ui-btn saveEdit'>Save</a></div>" +
												"<div class='ui-block-b'><a class='ui-btn cancelEdit'>Cancel</a></div>";
	
	$(".saveEdit").on("click", function(){
		item.find(".title")[0].innerText = $(".editNote .editName")[0].value;
		item.find(".body")[0].innerText = $(".editNote .editBody")[0].value;;
		
		$(".saveEdit").off();
		
		item.find(".editNote")[0].innerHTML = "";
		resetNoteControls(item);
		
		//delete note
	});
	
	$(".cancelEdit").on("click", function(){
		item.find(".editNote")[0].innerHTML = "";
		$(".saveEdit").off();
		resetNoteControls(item);
	});
}

function resetNoteControls(item){
	item.find(".confirmDelete")[0].innerText = "";
	item.find(".noteControls")[0].innerHTML = "<div class='ui-block-a'><a href='#' class='ui-btn edit'>Edit</a></div>" +
												"<div class='ui-block-b'><a href='#' class='ui-btn delete'>Delete</a></div>";
	
	$(".edit").on("click", function(){
			var item = $(this).parent("div").parent("div").parent("div").parent("div");
			edit(item);
		});
		
	$(".delete").on("click", function(){
		var item = $(this).parent("div").parent("div").parent("div").parent("div");
		confirmAndDelete(item);
	});
}