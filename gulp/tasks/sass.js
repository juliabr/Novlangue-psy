var gulp = require('gulp');
var sass = require('gulp-sass');
var nano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var csso = require('gulp-csso');
var mmq = require('gulp-merge-media-queries');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');

var config = require('../config').sass;
var minify = require('../config').minify;

var browserSync = require("browser-sync").get('JBr');

gulp.task('sass', function() {

   config.sources.forEach(function(source) {
      gulp.src(source.src)
         .pipe(plumber({
            errorHandler: function(error) {

               console.log(error.message);
               this.emit('end');
            }
         }))
         .pipe(sourcemaps.init({
            loadMaps: true
         }))
         .pipe(sass({
            includePaths: source.deps,
            outputStyle: 'expanded',
            precision: 6,
         }).on('error', sass.logError))
         .pipe(autoprefixer({
            browsers: minify.supported,
            add: true
         }))
         //TODO: bug with @supports @page
         .pipe(mmq())
         .pipe(rename(source.file))
         .pipe(gulp.dest(config.dest))
         .pipe(browserSync.stream())

         .pipe(csso())
         .pipe(rename({ suffix: '.min' }))
         .pipe(gulp.dest(config.dest));

   });

});