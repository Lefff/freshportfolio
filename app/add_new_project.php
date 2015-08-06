<?php
	if( !isset( $_POST['prj_data'] ) && empty( $_POST['prj_data'] ) ) return false;

	$prj_data = array();
	parse_str( $_POST['prj_data'], $prj_data );

	$prj_info = array(
		'name'  => $prj_data['ls_prj_name'],
		'url'   => $prj_data['ls_prj_url'],
		'descr' => $prj_data['ls_prj_descr']
	);

	$prj_err = array(
		'name'  => 'Заполните название проекта',
		'url'   => 'Заполните URL проекта',
		'descr' => 'Заполните описание проекта',
	);

	$resp = array(
		'status'      => '',
		'status_text' => '',
		'text'        => ''
	);

	//Проверяем
	foreach ( $prj_info as $key => $prj_val ) {
		if( empty( trim( $prj_val ) ) ) {
			$resp['status']      = 'error';
			$resp['status_text'] = 'Ошибка!';

			$resp['text'] .= empty( $resp['text'] ) ? $prj_err[ $key ] : '<br>' . $prj_err[ $key ];
		}
	}

	if( $resp['status'] != 'error' ) {
		$resp['status']      = 'success';
		$resp['status_text'] = 'Поздравляем!';
		$resp['text']        = 'Проект успешно добавлен';
	}



	//Вставляем рыбу для проверки уведомлений
	if( $prj_info['name'] == 'Bad' ) {

		$resp['status']      = 'error';
		$resp['status_text'] = 'Ошибка!';
		$resp['text']        = 'Тест ошибки';

		foreach ( $prj_err as $key => $prj_err_text ) {
			$resp['text'] .= '<br>' . $prj_err_text;
		}
	}



	header("Content-Type: application/json");
	echo json_encode( $resp );

	exit;
?>