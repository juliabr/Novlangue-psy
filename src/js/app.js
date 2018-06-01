var $ = require('jquery');
require('./custom-ui.js');
jQuery(document).ready(function($) {
   
   $('html').removeClass('no-js');
   
   $('#newspeak-form').submit( function(e) {

      e.preventDefault();

      $('#sphinx').addClass('small');
      
      $('#submit-btn').addClass('waiting').attr('disabled','disabled');
      $( "#newspeak-container .newspeak-item.current" ).addClass('animated fadeOutUp');
      $( "#newspeak-container .newspeak-item.current" ).removeClass('current').hide();
      
      $.ajax({
        url: "generate_newspeak.php",
        cache: false
      })
      .done(function( data ) {
         if( !data || data == 0 ) {
            return;
         }
         var newspeak = $.parseJSON(data);
         
         $( "#newspeak-container" ).append('<section class="newspeak-item current"><p class="newspeak-quote">'+ newspeak.quote +'</p><a href="'+ newspeak.tweetUrl +'" class="twitter-btn icon-twitter-bird">Tweet</a></section>' )
            .find('.current').show().addClass('animated flipInX');
      });
      $('#submit-btn').removeClass('waiting').delay(1000).removeAttr('disabled');
      
   });

   $('#more-infos, #main-title').on('click', function(e) {
      e.preventDefault();
      CustomUI.openModal();
      return false;
   });
      
});