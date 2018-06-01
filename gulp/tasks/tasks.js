var gulp = require('gulp');
gulp.task( 'default', [ 'sass', 'browserify', 'svg'] );
gulp.task( 'dev', [ 'browser-sync', 'watch'] );