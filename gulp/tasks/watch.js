// WATCH
var gulp = require('gulp');
var config = require('../config');

gulp.task('watch', function() {
   gulp.watch( config.sass.srcWatch, ['sass'] );
   gulp.watch( config.svg.srcWatch, ['svg'] );
   gulp.watch( config.browserify.srcWatch, ['browserify']);
});