const imagemin = require('gulp-imagemin');
const gulp = require('gulp');
const webpack = require('webpack');
const imageminPngquant = require('imagemin-pngquant');
const imageminZopfli = require('imagemin-zopfli');
const imageminMozjpeg = require('imagemin-mozjpeg'); //need to run 'brew install libpng'
const imageminGiflossy = require('imagemin-giflossy');
const browserSync = require('browser-sync').create();
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const webp = require('imagemin-webp');
const extReplace = require("gulp-ext-replace");

sass.compiler = require('node-sass');

const srcLocation = 'assets/images/orig/*';

const dest = 'assets/images';
const destWebp = 'assets/images/webp';

const reload = browserSync.reload;

function minifyImage() {
  return gulp
    .src(srcLocation)
    .pipe(
      imagemin(
        [
          imagemin.jpegtran({ progressive: true }),
          imagemin.svgo({
            plugins: [{ cleanupIDs: false, removeViewBox: false }]
          }),
          imageminPngquant({
            speed: 1,
            quality: [0.95, 1] //lossy settings
          }),
          imageminMozjpeg({
            quality: 85
          }),
          imageminZopfli({
            more: true
            // iterations: 50 // very slow but more effective
          }),
          imageminGiflossy({
            optimizationLevel: 3,
            //keep-empty: Preserve empty transparent frames
            lossy: 2
          })
        ],
        {
          verbose: true
        }
      )
    )
    .pipe(gulp.dest(dest));
}

function convertWebp() {
  return gulp
    .src(srcLocation)
    .pipe(
      imagemin([
        webp({
          quality: 75
        })
      ])
    )
    .pipe(extReplace('.webp'))
    .pipe(gulp.dest(destWebp));
}

function styles() {
  const plugins = [autoprefixer(), cssnano()];

  return gulp
    .src('./assets/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write())
    .on('error', error => console.log(error.toString()))
    .pipe(gulp.dest('./assets/css/'))
    .pipe(browserSync.stream())
}


gulp.task('default', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('*.html').on('change', reload);
  gulp.watch('./assets/sass/**/*.scss', styles);
  gulp.watch('./assets/js/modules/**/*.js', gulp.parallel('scripts'));
  gulp.watch('./assets/images/orig/*', minifyImage);
  gulp.watch('./assets/images/orig/*', convertWebp);
});

gulp.task('webpackScripts', function(callback) {
  webpack(require('./webpack.config.js'), function(err, stats) {
    if (err) {
      console.log(err.toString());
    }

    console.log(stats.toString());
    callback();
  });
});

gulp.task(
  'scripts',
  gulp.series('webpackScripts', function(cb) {
    browserSync.reload();
    cb();
  })
);

gulp.task('minifyImage', function(done) {
  gulp.series('image', minifyImage);
});

gulp.task('exportWebP', function() {
  gulp.series('convertWebp', convertWebp);
});