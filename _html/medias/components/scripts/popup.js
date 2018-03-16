
(function($) {

	function popupClass(popupName) {
		this._initialize(popupName);
	}

	var p = popupClass.prototype;

	p._initialize = function(popupName) {
		this._popupStatus = 'closed';
		this._popupName   = popupName;
		this._scrollTop   = 0;
	};


	p.openPopup = function(){
		var self = this;

		if(self._popupStatus === 'closed') {
			self.closePopup('direct');
		}

		// RECUPERE LE SCROLLTOP AVANT DE FIXER LA FENETRE
		self._scrollTop = $(window).scrollTop();

		// FIXE LA FENETRE POUR LAISSER QUE LE SCROLL DE LA POPUP
		$('body').addClass('fixed');

		$('#popup').fadeIn('fast', self._callbackOpenPopup.bind(this));
	};


	p._callbackOpenPopup = function() {
		var self = this;

		$('#'+self._popupName).show();

		self._popupStatus = 'open';

		var $popupContainer = $('#popup-container');
		var heightContainer = $popupContainer.outerHeight();

		if(heightContainer % 2 != 0) {
			$popupContainer.css('height', heightContainer + 1);
		}

		$('#popup').on('click', '.popup_close', { self:self }, self._onClickPopupClose);
	};


	p.closePopup = function(type) {
		type = type || 'fade';
		var self = this;

		$('#'+self._popupName).hide();


		$('body').removeClass('fixed');
		$('html, body').animate({'scrollTop': self._scrollTop + 'px'}, 100);

		if (type === 'fade') {

			$('#popup').fadeOut('fast', self._callbackClosePopup.bind(this));

		} else {

			self._popupStatus = 'closed';

			$('#popup').hide();
			$('#popup').off('click', '.popup_close', self._onClickPopupClose);

		}
	};


	p._onClickPopupClose = function(e) {
		e.preventDefault();

		var self = e.data.self;
		self.closePopup('fade');
	};


	p._callbackClosePopup = function() {
		self._popupStatus = 'closed';

		$('#popup').off('click', '.popup_close', self._onClickPopupClose);
	};
	

	window.popupClass = popupClass;

})(jQuery);
