
(function($) {

	function popupClass(popupName) {
		this._initialize(popupName);
	}

	var p = popupClass.prototype;
	var body = document.getElementsByTagName('BODY')[0];

	p._initialize = function(popupName) {
		this._popupStatus = 'closed';
		this._popupName   = popupName;
		this._scrollTop   = 0;
	};


	p.openPopup = function(){
		var self = this;

		// RECUPERE LE SCROLLTOP AVANT DE FIXER LA FENETRE
		self._scrollTop = $(window).scrollTop();

		// FIXE LA FENETRE POUR LAISSER QUE LE SCROLL DE LA POPUP
    	body.classList.add('fixed');

		$('#popup').fadeIn('fast', self._callbackOpenPopup.bind(this));
	};


	p._callbackOpenPopup = function() {
		var self = this;
		var $popupContainer = $('#popup-container');

		$('#' + self._popupName).appendTo($popupContainer).show();

		self._popupStatus = 'open';

		var heightContainer = $popupContainer.outerHeight();

		if(heightContainer % 2 != 0) {
			$popupContainer.css('height', heightContainer + 1);
		}

		$('#popup').on('click', '.popup-close, .popup-filter', { self:self }, self._onClickPopupClose);
	};


	p._onClickPopupClose = function(e) {
		e.preventDefault();

		var self = e.data.self;
		self.closePopup();
	};


	p.closePopup = function() {
		var self = this;

		if(functionToPlayInClose) {
			functionToPlayInClose();
		}

		$('#' + self._popupName).hide().appendTo('body');


		//$('body').removeClass('fixed');
		body.classList.remove('fixed');
		$('html, body').animate({'scrollTop': self._scrollTop + 'px'}, 10);

		$('#popup').fadeOut('fast', self._callbackClosePopup.bind(this));
	};


	p._callbackClosePopup = function() {
		self._popupStatus = 'closed';

		$('#popup').off('click', '.popup-close', self._onClickPopupClose);
	};
	

	window.popupClass = popupClass;

})(jQuery);
