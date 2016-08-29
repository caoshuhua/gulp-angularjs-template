var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var version = require('./version');

gulp.task('bgo-release', ['bgo-release-assets', 
	'bgo-release-html', 
	'bgo-release-styles',
	'bgo-release-scripts',
	'bgo-release-fonts'])

gulp.task('bgo-release-assets', function(){
	gulp.src([
		path.join(conf.paths.tmp, '/serve/assets/**/*.*')
	]).pipe(gulp.dest(version.dist + '/assets'))
})

gulp.task('bgo-release-html', function(){
	gulp.src([
		path.join(conf.paths.tmp, '/serve/*.html'),
		'!' + path.join(conf.paths.tmp, '/serve/index_dev.html')
	]).pipe(gulp.dest(version.dist))
})

gulp.task('bgo-release-styles', function(){
	gulp.src([
		path.join(conf.paths.tmp, '/serve/styles/bgo-min-'+ version.value +'.css')
	]).pipe(gulp.dest(version.dist + '/styles'))
})

gulp.task('bgo-release-scripts', function(){
	gulp.src([
		path.join(conf.paths.tmp, '/serve/scripts/bgo-min-'+ version.value +'.js')
	]).pipe(gulp.dest(version.dist + '/scripts'))
})

gulp.task('bgo-release-fonts', function(){
	gulp.src([
		path.join(conf.paths.tmp, '/serve/fonts/**/*.*')
	]).pipe(gulp.dest(version.dist + '/fonts'))
})