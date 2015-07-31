var ls_addProject;

;(function( $ ) {

	ls_addProject = (function() {
		var _prjWrapper,
			_prjAddBtn,
			_popUpObj;

		var init = function() {
			_prjWrapper = $('.ls_portfolio');
			_prjAddBtn  = _prjWrapper.find('.ls_portfolio-item-add_new_link');
			_popUpObj   = _prjWrapper.find('.ls_cmp-popup');

			_popUpObj.length && _events();
		};

		var _events = function() {
			_prjAddBtn.on( 'click', _showPopUp );
		};

		var _showPopUp = function( e ) {
			e.preventDefault();

			_popUpObj.bPopup({
				closeClass : 'ls_cmp-popup-close',
				modalColor : '#58697a',
				opacity : .75,
				transition: 'slideDown'
			});
		};


		return {
			init : init
		};
	})();

})( jQuery );