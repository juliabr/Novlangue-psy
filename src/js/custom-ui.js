var CustomUI = {

   modal: $('#modal'),
   modalLoading: $('#modal-loading'),
   message: $('#instant-message'),

   initLoading: function() {
      this.modalLoading.show().attr('aria-hidden', 'false');
   },
   stopLoading: function() {
      this.modalLoading.hide().attr('aria-hidden', 'true');
   },
   openModal: function() {
      console.log(this.modal);
      var _modal = $('#modal');
      _modal.addClass('on').attr('aria-hidden', 'false');
      $(document).on('click.jbr, keyup.jbr', { modal: _modal, instance: this }, this.closeModalHandler);
      this.stopLoading();
   },
   updateModal: function(_title, _content, _footer, _isLoading, _modal_style) {
      var _modal = this.modal;
      var _modalContent = _modal.find('.light-modal-body');
      var _modalTitle = _modal.find('.light-modal-heading');
      var _modalHeader = _modal.find('.light-modal-header');
      var _modalFooter = _modal.find('.light-modal-footer');

      _modalTitle.html(_title);
      _modalHeader.removeClass('empty');
      if( !_title ) {
         _modalHeader.addClass('empty');
      }
      
      if(_isLoading) {
         _modal.addClass('loading');
      }
      else {
         _modal.removeClass('loading');
      }
      _modalContent.html(_content);

      if( !_footer ) {
         _modalFooter.html('');
         _modalFooter.hide();
      } else {
         _modalFooter.html(_footer);
         _modalFooter.show();
      }
      _modal.removeClass('simple-modal immersive-modal');
      if( _modal_style == 'immersive') {
         _modal.addClass('immersive-modal');
      } else if( _modal_style == 'simple') {
         _modal.addClass('simple-modal');
      }
   },
   closeModalHandler: function(e) {
      var _modal = e.data.modal;
      var _this = e.data.instance;
      if( typeof(e) != 'undefined' ) {
         if( e.which != 27 && e.which != 1 ) return;
         var target = $(e.target);
         var modalContent = _modal.find('.light-modal-content');
         var closeButtons = _modal.find('.light-modal-close-btn, .light-modal-close-icon');
         if( (target.is(modalContent) || target.parents().is(modalContent)) && !target.is(closeButtons) ) return;
      }
      _modal.removeClass('on').attr('aria-hidden', 'true');
      _this.updateModal('', '', 0);
      $(document).off('click.jbr, keyup.jbr', this.closeModalHandler);
   },
   showMessage: function(content) {
      var _message = this.message;
      _message.find('>div').html(content);
      _message.addClass('on').attr('aria-hidden', 'false');
      setTimeout(
         function() {
            _message.removeClass('on').attr('aria-hidden', 'true');
         }, 2000);
   }
};

window.CustomUI = CustomUI;