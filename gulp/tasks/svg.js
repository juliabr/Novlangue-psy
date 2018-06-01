var gulp = require('gulp');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var plumber = require('gulp-plumber');

var config = require('../config').svg;

gulp.task('svg', function() {
   return gulp
      .src(config.src)
      .pipe(plumber({
         errorHandler: function(error) {
            console.log(error.message);
            this.emit('end');
         }
      }))
      .pipe(svgmin())
      .pipe(svgstore())
      .pipe(gulp.dest(config.dest));
});