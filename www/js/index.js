jQuery(document).ready(function () {
    jQuery('#clickme').on('click', function () {
        jQuery('#display').text("Hello worldlings!");
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