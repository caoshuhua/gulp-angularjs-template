'use strict';
/**
 * 框架构建脚本
 * @author xiufu.wang
 * @type {[type]}
 */
var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var version = require('./version');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});
var _ = require('lodash');

gulp.task('bgo-reload', ['bgo-build', 'bgo-build:dev']);
gulp.task('bgo-build', ['bgo-build-inject', 'bgo-build-inject:404', 'bgo-build-inject:500', 'bgo-build-inject:auth', 'bgo-build-fonts']);
gulp.task('bgo-build:dev', ['bgo-build-inject:dev', 'bgo-build-inject:404', 'bgo-build-inject:500', 'bgo-build-inject:auth', 'bgo-build-fonts']);
//clean
gulp.task('bgo-clean', function(){
	return $.del(path.join(conf.paths.tmp, '/'));
})
//styles
gulp.task('bgo-build-styles', ['bgo-build-styles-minify']);
gulp.task('bgo-build-styles-debug', ['bgo-styles-sass', 'bgo-styles-404', 'bgo-styles-auth', 'bgo-styles-500', 'bgo-styles-lib'], function(){
	return gulp.src([
			path.join(conf.paths.tmp, '/serve/styles/lib-bootstrap.css'),
			path.join(conf.paths.tmp, '/serve/styles/lib-bootstrap*.css'),
			path.join(conf.paths.tmp, '/serve/styles/lib-angular*.css'),
			path.join(conf.paths.tmp, '/serve/styles/lib-*.css'),
			path.join(conf.paths.tmp, '/serve/styles/main.css')
		]).pipe($.concat('bgo-dev-'+ version.value +'.css'))
		.pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/styles/')));
});

gulp.task('bgo-styles-sass', function(){
	var sassOptions = {
    	style: 'expanded'
  	};
  	var sassFiles =  gulp.src([
	    './sass/**/_*.scss',
	    '!./sass/theme/conf/**/*.scss',
	    '!./sass/404.scss',
	    '!./sass/auth.scss'
	], {read: false});

  	var injectOptions = {
	    transform: function (filePath) {
	      filePath = filePath.replace('./sass/', '');
	      return '@import "' + filePath + '";';
	    },
	    starttag: '// injector',
	    endtag: '// endinjector',
	    addRootSlash: false
  	};

	return gulp.src([
	    './sass/main.scss'
	]).pipe($.inject(sassFiles, injectOptions))
	    .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
	    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
	    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/styles/')));
});

gulp.task('bgo-styles-404', function(){
	var sassOptions = {
    	style: 'expanded'
  	};

  	return gulp.src(['./sass/404.scss'])
	    .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
	    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
	    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/styles/')));
});

gulp.task('bgo-styles-500', function(){
	var sassOptions = {
    	style: 'expanded'
  	};

  	return gulp.src(['./sass/500.scss'])
	    .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
	    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
	    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/styles/')));
});

gulp.task('bgo-styles-auth', function(){
	var sassOptions = {
    	style: 'expanded'
  	};

  	return gulp.src(['./sass/auth.scss'])
	    .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
	    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
	    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/styles/')));
});

gulp.task('bgo-styles-lib', function(){
	return gulp.src(['./lib/*.css'])
		.pipe($.rename(function(path, fiename){
			path.basename = 'lib-' + path.basename;
		}))
	    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/styles/')));
});

gulp.task('bgo-build-styles-minify', ['bgo-build-styles-debug'], function(){
	return gulp.src([
			path.join(conf.paths.tmp, '/serve/styles/bgo-dev-'+ version.value +'.css')
		]).pipe($.minifyCss({processImport: false }))
		.pipe($.rename('bgo-min-'+ version.value +'.css'))
		.pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/styles/')));
})

//fonts
gulp.task('bgo-build-fonts', function(){
	return gulp.src([
		'./assets/fonts/fontawesome-*.*',
		'./assets/fonts/glyphicons-*.*',
		'./assets/fonts/ionicons.*'
	], {base: './assets/fonts'})
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/fonts/')))
})

//assets
gulp.task('bgo-build-assets', function(){
	return gulp.src([
		'./assets/**/*.*',
		'!./assets/fonts/fontawesome-*.*',
		'!./assets/fonts/glyphicons-*.*',
		'!./assets/fonts/ionicons.*'
	])
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/assets/')))
})

//scripts
gulp.task('bgo-build-scripts', ['bgo-build-scripts-minify']);
gulp.task('bgo-build-scripts-debug', ['bgo-build-scripts-jshint', 'bgo-build-scripts-lib', 'bgo-build-scripts-templateCacheHtml'], function(){
	return gulp.src([
			path.join(conf.paths.tmp, '/serve/scripts/lib-jquery.js'),
			path.join(conf.paths.tmp, '/serve/scripts/lib-bootstrap.js'),
			path.join(conf.paths.tmp, '/serve/scripts/lib-angular.js'),
			path.join(conf.paths.tmp, '/serve/scripts/lib-am*.js'),
			path.join(conf.paths.tmp, '/serve/scripts/lib-Chart.js'),
			path.join(conf.paths.tmp, '/serve/scripts/lib-chartist*.js'),
			path.join(conf.paths.tmp, '/serve/scripts/lib-rangy-core.js'),
			path.join(conf.paths.tmp, '/serve/scripts/lib-bootstrap*.js'),
			path.join(conf.paths.tmp, '/serve/scripts/lib-i*.js'),
			path.join(conf.paths.tmp, '/serve/scripts/lib-m*.js'),
			path.join(conf.paths.tmp, '/serve/scripts/lib-n*.js'),
			path.join(conf.paths.tmp, '/serve/scripts/lib-d*.js'),
			path.join(conf.paths.tmp, '/serve/scripts/lib-r*.js'),
			path.join(conf.paths.tmp, '/serve/scripts/lib-j*.js'),
			path.join(conf.paths.tmp, '/serve/scripts/lib-b*.js'),
			path.join(conf.paths.tmp, '/serve/scripts/lib-s*.js'),
			path.join(conf.paths.tmp, '/serve/scripts/lib-t*.js'),
			path.join(conf.paths.tmp, '/serve/scripts/lib-w*.js'),
			path.join(conf.paths.tmp, '/serve/scripts/lib-x*.js'),
			path.join(conf.paths.tmp, '/serve/scripts/lib-p*.js'),
			path.join(conf.paths.tmp, '/serve/scripts/lib-l*.js'),
			path.join(conf.paths.tmp, '/serve/scripts/lib-f*.js'),
			path.join(conf.paths.tmp, '/serve/scripts/lib-e*.js'),
			path.join(conf.paths.tmp, '/serve/scripts/lib-ui-bootstrap-tpls.js'),
			path.join(conf.paths.tmp, '/serve/scripts/lib-angular*.js'),
			
			path.join('./app/**/*.module.js'),
			path.join('./app/**/*.js'),
			path.join(conf.paths.tmp, '/serve/scripts/template-cache-html.js')
		]).pipe($.concat('bgo-dev-'+ version.value +'.js'))
		.pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/scripts/')));

});

gulp.task('bgo-build-scripts-jshint', ['bgo-build-scripts-lib'], function(){
	return gulp.src('./app/**/*.js')
		.pipe($.eslint())
    	.pipe($.eslint.format())
    	.pipe($.size())
});

gulp.task('bgo-build-scripts-lib', function(){
	return gulp.src(['./lib/*.js'])
		.pipe($.rename(function(path, fiename){
			path.basename = 'lib-' + path.basename;
		}))
	    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/scripts/')));
});

gulp.task('bgo-build-scripts-minify', ['bgo-build-scripts-debug'], function(){
	return gulp.src(path.join(conf.paths.tmp, '/serve/scripts/bgo-dev-'+ version.value +'.js'))
			.pipe($.uglify({ preserveComments: false, mangle: false}))
			.pipe($.rename('bgo-min-'+ version.value +'.js'))
		    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/scripts/')));
});

//template cache html
gulp.task('bgo-build-scripts-templateCacheHtml', function(){
	return gulp.src('./app/**/*.html')
		.pipe($.minifyHtml({
	      empty: true,
	      spare: true,
	      quotes: true
    	}))
	    .pipe($.angularTemplatecache('template-cache-html.js', {
	      module: 'BlurAdmin',
	      root: 'app'
	    }))
    	.pipe(gulp.dest(conf.paths.tmp + '/serve/scripts/'));
})

//inject
gulp.task('bgo-build-inject', ['bgo-build-styles', 'bgo-build-scripts', 'bgo-build-assets'], function(){
	var injectStyles = gulp.src([
			path.join(conf.paths.tmp, '/serve/styles/bgo-min-'+ version.value +'.css'),
			path.join(conf.paths.tmp, '/serve/assets/**/*.css')
		]);
	var injectOptions = {
		ignorePath: [],
	    addRootSlash: false
	}
	var injectScripts = gulp.src(path.join(conf.paths.tmp, '/serve/scripts/bgo-min-'+ version.value +'.js'));

	return gulp.src('./index.html')
		.pipe($.inject(injectStyles, injectOptions))
		.pipe($.inject(injectScripts, injectOptions))
		.pipe($.replace(/\.temp\/serve\//g, ''))
		.pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/')))
})

gulp.task('bgo-build-inject:404', ['bgo-styles-404'], function(){
	var injectStyles = gulp.src([path.join(conf.paths.tmp, '/serve/styles/404.css')]);
	var injectOptions = {ignorePath: [], addRootSlash: false}
	return gulp.src('./404.html')
		.pipe($.inject(injectStyles, injectOptions))
		.pipe($.replace(/\.temp\/serve\//g, ''))
		.pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/')))
})

gulp.task('bgo-build-inject:500', ['bgo-styles-500'], function(){
	var injectStyles = gulp.src([path.join(conf.paths.tmp, '/serve/styles/500.css')]);
	var injectOptions = {ignorePath: [], addRootSlash: false}
	return gulp.src('./500.html')
		.pipe($.inject(injectStyles, injectOptions))
		.pipe($.replace(/\.temp\/serve\//g, ''))
		.pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/')))
})

gulp.task('bgo-build-inject:auth', ['bgo-styles-auth'], function(){
	var injectStyles = gulp.src([path.join(conf.paths.tmp, '/serve/styles/auth.css')]);
	var injectOptions = {ignorePath: [], addRootSlash: false}
	return gulp.src('./auth.html')
		.pipe($.inject(injectStyles, injectOptions))
		.pipe($.replace(/\.temp\/serve\//g, ''))
		.pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/')))
})

//inject:dev
gulp.task('bgo-build-inject:dev', ['bgo-build-styles', 'bgo-build-scripts', 'bgo-build-assets'], function(){
	var injectStyles = gulp.src([
		path.join(conf.paths.tmp, '/serve/styles/bgo-dev-'+ version.value +'.css'),
		path.join(conf.paths.tmp, '/serve/assets/**/*.css')
	]);
	var injectOptions = {
		ignorePath: [],
	    addRootSlash: false,
	    relative: true
	}
	//var injectScripts = gulp.src(path.join(conf.paths.tmp, '/serve/scripts/bgo-dev-'+ version.value +'.js'));
	var injectScripts = gulp.src([
		path.join(conf.paths.tmp, '/serve/scripts/lib-jquery.js'),
		path.join(conf.paths.tmp, '/serve/scripts/lib-bootstrap.js'),
		path.join(conf.paths.tmp, '/serve/scripts/lib-angular.js'),
		path.join(conf.paths.tmp, '/serve/scripts/lib-am*.js'),
		path.join(conf.paths.tmp, '/serve/scripts/lib-Chart.js'),
		path.join(conf.paths.tmp, '/serve/scripts/lib-chartist*.js'),
		path.join(conf.paths.tmp, '/serve/scripts/lib-rangy-core.js'),
		path.join(conf.paths.tmp, '/serve/scripts/lib-bootstrap*.js'),
		path.join(conf.paths.tmp, '/serve/scripts/lib-i*.js'),
		path.join(conf.paths.tmp, '/serve/scripts/lib-m*.js'),
		path.join(conf.paths.tmp, '/serve/scripts/lib-n*.js'),
		path.join(conf.paths.tmp, '/serve/scripts/lib-d*.js'),
		path.join(conf.paths.tmp, '/serve/scripts/lib-r*.js'),
		path.join(conf.paths.tmp, '/serve/scripts/lib-j*.js'),
		path.join(conf.paths.tmp, '/serve/scripts/lib-b*.js'),
		path.join(conf.paths.tmp, '/serve/scripts/lib-s*.js'),
		path.join(conf.paths.tmp, '/serve/scripts/lib-t*.js'),
		path.join(conf.paths.tmp, '/serve/scripts/lib-w*.js'),
		path.join(conf.paths.tmp, '/serve/scripts/lib-x*.js'),
		path.join(conf.paths.tmp, '/serve/scripts/lib-p*.js'),
		path.join(conf.paths.tmp, '/serve/scripts/lib-l*.js'),
		path.join(conf.paths.tmp, '/serve/scripts/lib-f*.js'),
		path.join(conf.paths.tmp, '/serve/scripts/lib-e*.js'),
		path.join(conf.paths.tmp, '/serve/scripts/lib-ui-bootstrap-tpls.js'),
		path.join(conf.paths.tmp, '/serve/scripts/lib-angular*.js'),
		
		path.join('./app/**/*.module.js'),
		path.join('./app/**/*.js'),
		path.join(conf.paths.tmp, '/serve/scripts/template-cache-html.js')
	]);

	return gulp.src('./index.html')
		.pipe($.inject(injectStyles, injectOptions))
		.pipe($.inject(injectScripts, injectOptions))
		.pipe($.rename('index_dev.html'))
		.pipe($.replace(/\.temp\/serve\//g, ''))
		.pipe($.replace(/<script src=\"app\//g, '<script src="'))
		.pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/')))
})