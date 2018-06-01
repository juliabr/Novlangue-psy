var gulp = require('gulp');
var realFavicon = require ('gulp-real-favicon');
var fs = require('fs');

var config = require('../config').favicon;

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function(done) {
   realFavicon.generateFavicon({
      masterPicture: config.masterPicture,
      dest: config.dest,
      iconsPath: '/',
      design: {
         ios: {
            masterPicture: config.altPicture,
            pictureAspect: 'noChange',
            backgroundColor: config.bgColor,
            margin: '25%',
            assets: {
               ios6AndPriorIcons: false,
               ios7AndLaterIcons: false,
               precomposedIcons: false,
               declareOnlyDefaultIcon: true
            },
            appName: config.appName
         },
         desktopBrowser: {},
         windows: {
            masterPicture: config.whitePicture,
            pictureAspect: 'noChange',
            backgroundColor: config.bgColor,
            onConflict: 'override',
            assets: {
               windows80Ie10Tile: false,
               windows10Ie11EdgeTiles: {
                  small: false,
                  medium: true,
                  big: false,
                  rectangle: false
               }
            },
            appName: config.appName
         },
         androidChrome: {
            masterPicture: config.altPicture,
            pictureAspect: 'noChange',
            margin: '17%',
            backgroundColor: config.bgColor,
            themeColor: config.bgColor,
            manifest: {
               name: config.appName,
               display: 'standalone',
               orientation: 'notSet',
               onConflict: 'override',
               declared: true
            },
            assets: {
               legacyIcon: false,
               lowResolutionIcons: false
            }
         },
         safariPinnedTab: {
            pictureAspect: 'blackAndWhite',
            threshold: 71.875,
            themeColor: config.bgColor,
         }
      },
      settings: {
         scalingAlgorithm: 'Mitchell',
         errorOnImageTooSmall: false
      },
      markupFile: config.favicon_data_file
   }, function() {
      done();
   });
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', function() {
   return gulp.src([ favicon_markup ])
      .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(config.favicon_data_file)).favicon.html_code))
      .pipe(gulp.dest(config.dest));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function(done) {
   var currentVersion = JSON.parse(fs.readFileSync(config.favicon_data_file)).version;
   realFavicon.checkForUpdates(currentVersion, function(err) {
      if (err) {
         throw err;
      }
   });
});