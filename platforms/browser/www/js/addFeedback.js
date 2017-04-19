function back()
{
	window.history.back(); 
}

function addFeedback()
{
	var media = document.getElementById('feedMedia').value;
	var feedType = document.getElementById('feedType').value;
	
	var feedBack = {
		"feedbackTitle" : document.getElementById('feedName').value,
		'feedbackMessage' : document.getElementById('feedMessage').value,
		'MediaType' : {'mediaTypeName' : media},
		'FeedbackType' : {'feedbackTypeName': feedType}
	};
	
	
	var arrOfFeedBack = JSON.parse(localStorage.getItem('arrOfFeedBack'));
	if (typeof(arrOfFeedBack)== 'string') 
	{
		arrOfFeedBack = [arrOfFeedBack];
	}
	//console.log(typeof(arrOfFeedBack));
	//console.log(arrOfFeedBack);
	
	
	arrOfFeedBack.push(feedBack);
	localStorage.setItem('arrOfFeedBack', JSON.stringify(arrOfFeedBack)); 
	window.history.back(); 

	
}