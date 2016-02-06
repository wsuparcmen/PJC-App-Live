jQuery(document).ready(function () {
    jQuery('#submitButton').on('click', function(){
      var uri = 'http://pjc.gear.host/api/DeleteHello';

      var hello = {
        'helloID':$('#id').val(),
        'helloLanguage':$('#lang').val(), 
        'helloMessage':$('#message').val()};
      $.ajax({
        type: 'POST',
        dataType: 'json',
        data: hello,
        url: uri + '/' + $('#id').val(),
        success: function(data){
          alert('success');
        },
        error: function(){
          alert('Failure');
        }
      });
    });
});