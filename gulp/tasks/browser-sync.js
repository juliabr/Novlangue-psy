var gulp = require('gulp');
var browserSync = require('browser-sync').create('JBr');
var config = require('../config').browserSync;

gulp.task('browser-sync', function() {
   browserSync.init(config);
});