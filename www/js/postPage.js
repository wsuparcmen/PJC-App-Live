jQuery(document).ready(function () {
    jQuery('#submitButton').on('click', function(){
        var uri = 'http://pjc.gear.host/api/Hello';

        var hello = {
          'helloLanguage':$('#lang').val(), 
          'helloMessage':$('#message').val()};
        $.ajax({
          type: 'POST',
          dataType: 'json',
          data: hello,
          url: uri,
          success: function(data){
            alert('success');
          },
          error: function(){
            alert('Failure');
          }
        });
    });
});