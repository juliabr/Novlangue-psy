jQuery(document).ready(function($) {
   
   $('html').removeClass('no-js');
   
   $('#newspeak-art-form').submit( function(e) {

      e.preventDefault();

      $('#sphinx').addClass('small');
      
      $('.btn').addClass('waiting').attr('disabled','disabled');
      $( "#newspeak-art .item.current" ).addClass('animated fadeOutUp');
      $( "#newspeak-art .item.current" ).removeClass('current').hide();
      
      $.ajax({
        url: "generate_newspeak.php",
        cache: false
      })
      .done(function( data ) {
         if( !data || data == 0 ) {
            return;
         }
         var newspeak = $.parseJSON(data);
         
         $( "#newspeak-art" ).append('<section class="item current"><p class="newspeak-quote">'+ newspeak.quote +'</p><a href="'+ newspeak.tweetUrl +'" class="twitter-btn">Tweet</a></section>' )
            .find('.current').show().addClass('animated flipInX');
      });
      $('.btn').removeClass('waiting').delay(1000).removeAttr('disabled');
      
   });
      
});