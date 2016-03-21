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
											"<p class='body'>" + note + "</p>" +
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
	$("#editNote #editName")[0].value = item.find(".title")[0].innerText;
	$("#editNote #editBody")[0].value = item.find(".body")[0].innerText;
	$("#editNote").popup("open");
	
	$("#editNote #saveEdit").click(function(){
		item.find(".title")[0].innerText = document.getElementById("editName").value;
		item.find(".body")[0].innerText = document.getElementById("editBody").value;
		
		$("#editNote #saveEdit").off();
		
		//save edited note
	});
	
	$("#editNote #cancelEdit").on("click", function(){
		$("#editNote #saveEdit").off();
	});
}