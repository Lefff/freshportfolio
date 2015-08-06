var ls_connectAction;

;(function( $ ) {

	ls_connectAction = (function() {
		var _contactForm;

		var init = function() {
			_contactForm = $('.ls_connect_me-form');

			_contactForm.length && _events();
		};

		var _events = function() {
			_contactForm.on( 'submit', _beforeSendCheck );
			_contactForm.on( 'reset', _clearForm );
		};

		var _beforeSendCheck = function( e ) {
			var thisForm = $( this );

			ls_validateForm.validateThis( thisForm );
		};

		var _clearForm = function( e ) {
			var thisForm = $( this );

			ls_validateForm.resetThis( thisForm );
		};

		return {
			init : init
		};
	})();

})( jQuery );