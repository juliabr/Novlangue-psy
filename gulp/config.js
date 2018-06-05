// Sources of files
var src = './src';
var nodeModules = './node_modules/';

//App name
var appName = 'Psybot';

// Names of files
var fileCSS = 'global.css';
var fileJS = 'bundle.js';

// Destinations of files
var dest = './assets';

// Proxy for BrowserSync
var proxyURL = 'localhost/juliabr/lab/psybot/';

// Option for gulp-cssnano
var browserSupported = ['last 2 versions', 'ie >= 10', 'ff >= 20', 'ios 6', 'android 4'];

module.exports = {

   sass: {
      // Source of CSS files
      sources: [{
            src: [
               src + '/scss/main.scss'
            ],
            file: fileCSS
         }
      ],
      // Source to watch
      srcWatch: src + '/scss/**/*',
      dest: dest + '/css'
   },

   browserify: {
      require : { jquery : 'jquery-browserify' },
      src: [src + '/js/app.js'],
      srcWatch: src + '/js/*.js',
      file: fileJS,
      dest: dest + '/js'
   },

   minify: {
      src: dest + '/css/*.css',
      srcWatch: src + '/scss/**',
      dest: dest + '/css/min',
      supported: browserSupported,
   },

   svg: {
      src: 'img/svg/icons/*.svg',
      srcWatch: 'img/svg/icons/*.svg',
      dest: dest + '/svg',
   },

   browserSync: {
      proxy: proxyURL,
      open: false
   },

   favicon: {
      dest: dest + '/favicons',
      favicon_data_file: dest + '/favicons/faviconData.json',
      favicon_markup: dest + '/favicons/favicon_markup.html',
      masterPicture: src+'/img/favicon.png',
      altPicture: src+'/img/favicon.png',
      whitePicture: src+'/img/favicon.png',
      bgColor: '#7c1c47',
      appName: appName
   }
};