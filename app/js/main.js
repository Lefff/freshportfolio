;(function ( $ ) {
	$(function() {

		//Инициалзация всех модулей
		ls_validateForm.init();
		ls_connectAction.init();
		ls_addProject.init();

		//Инициализация сторонних плагинов
		$('input, textarea').placeholder({ customClass: 'my-placeholder' });

	});
})( jQuery );