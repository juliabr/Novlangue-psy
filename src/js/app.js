var $ = require('jquery');
require('./custom-ui.js');
var App = {

   init: function() {

      var submitBtn = $('#submit-btn');
      var illus = $('#sphinx');
      var nsContainer = $('#newspeak-container');
      var nsForm = $('#newspeak-form');
      
      $('html').removeClass('no-js');

      $('#more-infos, #main-title').on('click', function(e) {
         e.preventDefault();
         CustomUI.openModal();
         return false;
      });

      illus.addClass('tada');

      var _this = this;
      var _window = $(window);

      _window
         .on('load.jbr', function() {
            _this.onResizeFixBtn(nsForm, illus);
         })
         .on('resize.jbr', function() {
            _this.onResizeFixBtn(nsForm, illus);
         });

      nsForm.submit(function(e) {
         e.preventDefault();

         submitBtn.addClass('waiting').attr('disabled', 'disabled');

         var current = nsContainer.find(".newspeak-item.current");

         if (current.length) {
            current.animate({
               opacity: '0',
            }, 1200, function() {
               _this.loadNewSentence(nsContainer,submitBtn,illus);
            });
         } else {
            _window.off('resize.jbr');
            nsForm.animate({
               bottom: '0',
            }, 200);
            illus.animate({
               opacity: '.2',
            }, 800, function() {
               _this.loadNewSentence(nsContainer,submitBtn,illus);
            });
         }
      });
   },
   loadNewSentence: function(nsContainer,submitBtn,illus) {
      $.ajax({
            url: "generate_newspeak.php",
            cache: false
         })
         .done(function(data) {
            if (!data || data == 0) {
               return;
            }
            var newspeak = $.parseJSON(data);

            nsContainer.find(".newspeak-item.current").removeClass('current').hide();

            var current = nsContainer.append('<section class="newspeak-item current"><p class="newspeak-quote">' + newspeak.quote + '</p><a href="' + newspeak.tweetUrl + '" class="twitter-btn icon-twitter" target="_blank">Tweet</a></section>').find('.current');
            current.find('.twitter-btn').css('opacity', '0');
            current.css('opacity', '0').show().animate({
                  opacity: "1",
               }, 800, function() {
                  submitBtn.removeClass('waiting').removeAttr('disabled');
                  current.find('.twitter-btn').css('opacity', '1').addClass('zoomIn');
            });
            
      });
      
   },
   onResizeFixBtn: function(nsForm,illus) {
      var marginFromBottom = $(window).height()/2 - illus.outerHeight()/2 - nsForm.innerHeight()/1.5;
      nsForm.css({
         'bottom': marginFromBottom + 'px',
         'display': 'block'
      });
   }
};

$(function() {
   App.init();
});