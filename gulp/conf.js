var gutil = require('gulp-util');

exports.paths = {
  assets: '../assets',
  fonts: '../fonts',
  scripts: '../scripts',
  styles: '../styles',
  tmp: '.temp',
  src: './app'
};

exports.errorHandler = function(title) {
  'use strict';

  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};
