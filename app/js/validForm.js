var ls_validateForm;

;(function( $ ) {

	ls_validateForm = (function() {
		var _currForm;

		var init = function() {
			_currForm = $('form.ls_validation');

			_currForm.length && _events();
		};

		var _events = function() {
			_currForm.on( 'submit', _validateNative );
			_currForm.on( 'keydown', '.notValid', _removeError );
			_currForm.on( 'reset', _fullResetNative );
		};

		var _removeError = function() {
			$( this ).removeClass('notValid');
		};

		var _validateNative = function( e ) {
			var nativeForm = $( this );

			e.preventDefault();

			validateThis( nativeForm );
		};

		var _newTooltip = function( elem, pos ) {
			var elem   = elem || 0,
				pos    = pos || 'left',
				posObj = {};

			switch( pos ) {
				case 'right':
					posObj = {
						my: 'left center',
						at: 'right center',
						effect: false
					}
					break;

				case 'left':
				default:
					posObj = {
						my: 'right center',
						at: 'left center',
						effect: false
					}
					break;
			}

			elem.addClass('notValid')
				.qtip({
				prerender: true,
				overwrite: false,
				content: {
					text: function() {
						var text = $( this ).attr('qtip-text');

						return $.trim( text ) === '' ? 'Ошибка заполнения' : text;
					}
				},
				show: {
					event : 'show'
				},
				hide: {
					event: 'keydown clearToolTip'
				},
				position: posObj,
				style: {
					classes: 'qtip-ls_qtip',
					tip: {
						height: 6,
						width: 12
					}
				}
			}).trigger('show');
		};

		var _fullResetNative = function() {
			var thisForm = $( this );

			fullResetForm( thisForm );
		};

		var fullResetForm = function( formToReset ) {
			if( formToReset && formToReset.length ) {
				formToReset.find('.notValid')
								.removeClass('notValid')
								.trigger('clearToolTip');
			}
		};

		var validateThis = function( formToCheck ) {
			var formToCheck = formToCheck || 0,
				formInputs  = formToCheck.find(':input').not(':hidden, :submit, :file, :reset'),
				isValid     = true;

			if( formToCheck ) {
				formToCheck.on( 'keydown', '.notValid', _removeError );

				$.each( formInputs, function( indx, elem ) {
					var inputEl  = $( elem ),
						inputVal = $.trim( inputEl.val() ),
						tipPos   = inputEl.attr('qtip-position');

					if( !inputVal ) {
						_newTooltip( $( elem ), tipPos );
						isValid = false;
					} else {
						inputEl.removeClass('notValid');
					}
				});
			} else {
				isValid = false;
			}

			return isValid;
		};

		return {
			init         : init,
			validateThis : validateThis,
			resetThis    : fullResetForm
		};
	})();

})( jQuery );