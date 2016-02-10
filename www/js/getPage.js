jQuery(document).ready(function () {
    jQuery('#clickme').on('click', function () {
        jQuery('#display').text("Hello worldlings!");
		jQuery('#token').html(window.localStorage.getItem("token"));
    });
	
	jQuery('#delete').on('click', function () {
        jQuery('#token').html("");
		window.localStorage.removeItem("token");
		jQuery('#deletedToken').html(window.localStorage.getItem("token"));
    });
	
    var url = 'http://pjc.gear.host/api/Hello';
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function (data, status) {
            $.each(data, function (key, item) {
                $('<li>', { text: formatItem(item) }).appendTo($('#records'));
            });
        },
        error: function () {
            //error loading data
        }
    });

    function formatItem(item) {
        return item.helloID + ":" + item.helloLanguage + ":" + item.helloMessage + ".";
    }
});