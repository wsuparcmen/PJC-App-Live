jQuery(document).ready(function () {
    jQuery('#submitButton').on('click', function() {
        var id = $('#helloID').val();
      $.ajax({
        type: 'GET',
        url: "http://pjc.gear.host/api/DeleteHello/" + id,
        success: function(data){
          alert('success');
        },
        error: function(){
          alert('Failure');
        }
      });
    });
});