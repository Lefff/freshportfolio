var ls_addProject;

;(function( $ ) {

	ls_addProject = (function() {
		var _prjWrapper,
			_prjAddBtn,
			_popUpObj,
			_prjForm,
			_prjNotif;



		//Инициализация модуля
		var init = function() {
			_prjWrapper = $('.ls_portfolio');
			_prjAddBtn  = _prjWrapper.find('.ls_portfolio-item-add_new_link');
			_popUpObj   = _prjWrapper.find('.ls_cmp-popup');
			_prjForm    = _popUpObj.find('.ls_portfolio-add_prj_form');
			_prjNotif   = _popUpObj.find('.ls_cmp-notification');

			_popUpObj.length && _events();
		};



		//События модуля
		var _events = function() {
			_prjAddBtn.on( 'click', _showPopUp );
			_popUpObj.on( 'click', '.ls_cmp-popup-close, b-modal', _clearFormHelpers );

			_prjForm.on( 'change', ':file', _setFilename );
			_prjForm.on( 'submit', _addNewProject );

			_prjNotif.on( 'click', '.ls_cmp-notification-close', _closeNotif );
		};



		//Работа с модальным окном
		var _showPopUp = function( e ) {
			e.preventDefault();

			_popUpObj.bPopup({
				closeClass : 'ls_cmp-popup-close',
				modalColor : '#58697a',
				opacity    : .75,
				transition : 'slideDown',
				modalClose : false,
				onClose    : _closePopUp
			});
		};

		var _closePopUp = function() {
			_prjNotif.hide();
		};



		//Очищаем от тултипов и подсветки при закрытии
		var _clearFormHelpers = function( e ) {
			ls_validateForm.resetThis( _prjForm );
		};



		//Имя файла в fake-box
		var _setFilename = function() {
			var fileObj  = $( this ),
				fileName = this.value ? this.value.replace(/^.*[\\\/]/, '') : 'Загрузите изображение';

			fileObj.siblings('.ls_form-field-fake-name').text( fileName );
		};



		/**
		 * Уведомления
		 * @param  {sting} blockView "Вид блока (default || error || success)"
		 * @param  {string} title     "Заголовк блока"
		 * @param  {string} text      "Текст блока"
		 * @return {null}
		 */
		var _notification = function( blockView, title, text ) {
			var blockView = blockView || '',
				title     = title || '',
				text      = text || '';


			if( _prjNotif.length ) {
				_prjNotif.removeClass('error success')
						 .addClass( blockView )
						 .find('.ls_cmp-notification-title')
						 .text( title )
						 .end()
						 .find('.ls_cmp-notification-text')
						 .html( text )
						 .end()
						 .slideDown( 300 );
			}
		};

		var _closeNotif = function() {
			$( this ).closest('.ls_cmp-notification').slideUp( 300 );
		};



		//Добавление проекта
		var _addNewProject = function( e ) {
			var addPrjForm  = $( this ),
				addPrjData  = addPrjForm.serialize(),
				ajaxSetting = {
					type       : 'POST',
					url        : 'add_new_project.php',
					dataType   : 'json',
					data       : {
						'prj_data' : addPrjData
					}
				};

			e.preventDefault();

			if( ls_validateForm.validateThis( addPrjForm ) ) {
				$.ajax( ajaxSetting )
				 .done(function( res ) {

				 	if( res['status'] !== '' ) {
				 		_notification( res['status'], res['status_text'], res['text'] );
				 	}
				 })
				 .fail(function( err ) {
				 	_notification('error', 'Упс!', 'Что-то пошло не так.');
				 	console.error( err );
				 });
			}
		};

		return {
			init : init
		};
	})();

})( jQuery );