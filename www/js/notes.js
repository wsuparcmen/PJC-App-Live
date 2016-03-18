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
											"<h3>" + name + "</h3>" +
											"<p class='name'><strong>" + name + "</strong></p>" +
											"<p class='content'>" + note + "</p>" +
											"<div class='ui-grid-a'>" +
												"<div class='ui-block-a'><a href='#' class='ui-btn edit'>Edit</a></div>" +
												"<div class='ui-block-b'><a href='#' class='ui-btn delete'>Delete</a></div>" +
											"</div>" +
										"</div>");
										
			$("#previousNotes").collapsibleset("refresh");
			
			$(".delete").on("click", function(){
				var item = $(this).parent("div").parent("div").parent("div").parent("div");
				confirmAndDelete(item);
			});
			
			$(".edit").on("click", function(){
				var item = $(this).parent("div").parent("div").parent("div").parent("div");
				edit(item);
			});
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
	});
	
	$("#confirm #cancel").on("click", function(){
		$("#confirm #yes").off();
	});
}

function edit(item){
	
}