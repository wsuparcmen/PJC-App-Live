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
	var count = 0;
	$("#save").click(function(){
		var name = document.getElementById("noteName").value;
		var note = document.getElementById("note").value;
		
		if(name == "" && note != ""){
			count++;
			name = "Untitled Note " + count;
		}
		if(note == ""){
			$("#emptyNote").popup("open");
		}
		else{
			$("#previousNotes").append("<div data-role='collapsible'>" +
											"<h3><span class='title'>" + name + "</span></h3>" +
											"<div class='content'>" +
												"<strong class='name'>" + name + "</strong>" + 
												"<p class='body'>" + note + "</p>" +
											"</div>" +
											"<div class='ui-grid-a'>" +
												"<div class='ui-block-a'><a href='#' class='ui-btn edit'>Edit</a></div>" +
												"<div class='ui-block-b'><a href='#' class='ui-btn delete'>Delete</a></div>" +
											"</div>" +
										"</div>");	
			$("#previousNotes").collapsibleset("refresh");
			document.getElementById("noteForm").reset();
			
			$(".delete").on("click", function(){
				var item = $(this).parent("div").parent("div").parent("div").parent("div");
				confirmAndDelete(item);
			});
			
			$(".edit").on("click", function(){
				var item = $(this).parent("div").parent("div").parent("div").parent("div");
				edit(item);
			});
			
			//save note
		}
	});
	
	$("#clear").click(function(){
		document.getElementById("noteForm").reset();
	});
});

function confirmAndDelete(item){
	$("#confirm .name").remove();
	item.find(".name").clone().insertAfter("#question");
	
	$("#confirm").popup("open");
	
	$("#confirm #yes").on("click", function(){
		item.remove();
		$("#previousNotes").collapsibleset("refresh");
		
		//delete note
	});
	
	$("#confirm #cancel").on("click", function(){
		$("#confirm #yes").off();
	});
}

function edit(item){
	var name = item.find(".name")[0].innerText;
	var note = item.find(".body")[0].innerText;
	
	item.find(".content")[0].innerHTML = "<form class='ui-body ui-body-a'>" +
											"<label for='noteName'>Name</label>" +
											"<input type='text' name='noteName' id='editName' value='" + name + "'/>" +
											"<label for='note'>Note</label>" +
											"<textarea cols='40' name='note' id='editBody'>" + note + "</textarea>" +
											"<a href='#' class='ui-btn' id='saveEdit'>Save</a>" +
										"</form>";
	
	$("#saveEdit").click(function(){
		name = document.getElementById("editName").value;
		note = document.getElementById("editBody").value;
		
		item.find(".content")[0].innerHTML = "<strong class='name'>" + name + "</strong>" + 
											"<p class='body'>" + note + "</p>";
		item.find(".title")[0].innerText = name;
		
		//save edited note
	});
}