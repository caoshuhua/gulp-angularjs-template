'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('watch', function () {
  //js 变化时 执行重新加载
  gulp.watch(['./app/**/*.js'], function(event){
      if (isOnlyChange(event)){
          browserSync.reload(event.path);
      }
  });

  gulp.watch(['./app/**/*.html'], function(event){
      if (isOnlyChange(event)){
          gulp.start('reload-tempate-cache-html');
      }
  });

  gulp.watch(['./404.html'], function(event){
      if (isOnlyChange(event)){
          gulp.start('reload-page-404');
      }
  });

  gulp.watch(['./500.html'], function(event){
      if (isOnlyChange(event)){
          gulp.start('reload-page-500');
      }
  });

  gulp.watch(['./index.html'], function(event){
      if (isOnlyChange(event)){
          gulp.start('reload-page-index');
      }
  });

  gulp.watch(['./auth.html'], function(event){
      if (isOnlyChange(event)){
          gulp.start('reload-page-auth');

      }
  });

  gulp.watch(['./sass/**/*.scss'], function(event){
      if (isOnlyChange(event)){
        gulp.start('reload-sass');

      }
  });
});

gulp.task('reload-tempate-cache-html', ['bgo-build-scripts-templateCacheHtml'], function () {
   browserSync.reload();
});

gulp.task('reload-sass', ['bgo-build-styles-debug'], function () {
   browserSync.reload();
});

gulp.task('reload-page-404', ['bgo-build-inject:404'], function () {
   browserSync.reload();
});

gulp.task('reload-page-500', ['bgo-build-inject:500'], function () {
   browserSync.reload();
});

gulp.task('reload-page-auth', ['bgo-build-inject:auth'], function () {
    browserSync.reload();
});

gulp.task('reload-page-index', ['bgo-build-inject'], function () {
   browserSync.reload();
});