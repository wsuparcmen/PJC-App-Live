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
			$("#notesSet").append("<div data-role='collapsible'>" +
										"<h3><span class='title'>" + name + "</span></h3>" +
										"<p class='body'>" + note + "</p>" +
										"<div class='ui-grid-a ui-responsive'>" +
											"<div class='ui-block-a'><a href='#' class='ui-btn edit'>Edit</a></div>" +
											"<div class='ui-block-b'><a href='#' class='ui-btn delete'>Delete</a></div>" +
										"</div>" +
									"</div>");
			$("#notesSet").collapsibleset("refresh");
			document.getElementById("noteForm").reset();
			
			$(".delete").on("click", function(){
				var item = $(this).parent("div").parent("div").parent("div").parent("div");
				confirmAndDelete(item);
			});
			
			$(".edit").on("click", function(){
				var item = $(this).parent("div").parent("div").parent("div").parent("div");
				edit(item);
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
	
}

function edit(item){
	
}