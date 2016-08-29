'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

var proxyMiddleware = require('http-proxy-middleware');

function browserSyncInit(baseDir, browser, startPath) {
  browser = browser === undefined ? 'default' : browser;
  var routes = null;
  var server = {
    baseDir: baseDir,
    routes: routes
  };
  browserSync.instance = browserSync.init({
    startPath: (startPath || '/'),
    server: server,
    browser: browser,
    ghostMode: false
  });
}

browserSync.use(browserSyncSpa({
  selector: '[ng-app]'// Only needed for angular apps
}));

gulp.task('server', function () {
  browserSyncInit([path.join(conf.paths.tmp, '/serve')]);
});

gulp.task('server:dev', ['watch'],function () {
  browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src], undefined, '/index_dev.html');
});
