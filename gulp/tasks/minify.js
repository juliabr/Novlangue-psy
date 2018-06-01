var gulp = require('gulp');
var nano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var sourcemaps = require('gulp-sourcemaps');
var mmq = require('gulp-merge-media-queries');
var rename = require('gulp-rename');

var config = require('../config').minify;

gulp.task('minify', ['sass'], function() {
   gulp.src(config.src)
      .pipe(
         nano({
            sourcemap: false,
            autoprefixer: {
               browsers: config.supported,
               add: true
            },

            discardComments: {
               removeAll: false
            },
         })
      )
      //TODO: bug with @supports @page
      .pipe(mmq())
      .pipe(csso())
      .pipe(rename({ suffix: '.min' }))

      .pipe(gulp.dest(config.dest));

});