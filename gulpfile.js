var gulp            = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	runSequence     = require('run-sequence'),
	browserSync     = require('browser-sync'),
	wiredep         = require('wiredep').stream;

var $      = gulpLoadPlugins(),
	reload = browserSync.reload;



// Очистка директории с временными файлами
gulp.task('clean', function( cb ) {
	return gulp.src('./dist', { read: false })
			   .pipe($.clean());
});



// CSS префиксы
gulp.task('styles', function() {
	return gulp.src('./app/css/**/*.css')
			   .pipe($.autoprefixer({
			   		browsers: ['ie 8', 'ie 9', 'last 5 version']
			   }))
			   .pipe(gulp.dest('./.tmp'))
			   .pipe(reload({ stream : true }));
});



// Добавление bower зависимостей
gulp.task('bowerdep', function() {
	return gulp.src('./app/*.html')
			   .pipe(wiredep())
			   .pipe(gulp.dest('./app'));
});



// Минификация, склеивание
gulp.task('build', function () {
	var assets = $.useref.assets();

	return gulp.src('app/*.html')
			   .pipe(assets)
			   .pipe($.if('*.js', $.uglify()))
			   .pipe($.if('*.css', $.minifyCss({compatibility: '*'})))
			   .pipe(assets.restore())
			   .pipe($.useref())
			   .pipe(gulp.dest('dist'));
});



// Запуск сервера
gulp.task('server', function () {  
	browserSync({
		port: 9000,
		server: {
			baseDir: 'app',
			routes: {
        '/bower': 'bower'
      }
		}
	});
});



//Копирование файлов (иконки, robots.txt и т.д.)
gulp.task('copy', function() {
	return gulp.src('./app/*.*')
				.pipe(gulp.dest('./dist'));
});



//Копирование шрифтов
//TODO: сделать оптимизацию шрифтов
gulp.task('fonts', function() {
	return gulp.src('./app/fonts/**/*')
				.pipe(gulp.dest('./dist/fonts'));
});



//Копирование картинок
//TODO: сделать оптимизацию картинок
gulp.task('imgs', function() {
	return gulp.src('./app/img/**/*')
				.pipe(gulp.dest('./dist/img'));
});



// Отслеживание изменений
gulp.task('servlive', ['server'], function () {
	gulp.watch('app/*.html').on('change', reload);
	gulp.watch('app/css/**/*.css', ['styles']);
});



gulp.task('default', function( callback ) {
	runSequence('clean',
				['fonts', 'imgs', 'styles'],
				'build',
				callback);
});